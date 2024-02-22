const Course = require("../model/course.mosel")
const Category = require("../model/category.model")
const Section = require("../model/section")
const SubSection = require("../model/subsection.model")
const User = require("../model/user.model")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const CourseProgress = require("../model/courseprogress.model")
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    console.log("tag", req.body)
    let {
      courseName,
      courseDescription,
      whatyouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body
    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    //   console.log("instructions", instructions)

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatyouWillLearn ||
      !price ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    })

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log("hgffdgfhjkl;kj", thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatyouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions,
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    console.log("newCourse", newCourse)
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}
exports.getAllCourses = async (req, res) => {

  try {
    console.log("inside getAllCourses");
    const allCourses = await Course.find(
      // { status: "Published" },
      {}
    )
      .populate("instructor")
      .exec()

    return res.status(200).json({
      success: true,
      data: allCourses,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}
exports.getCourseDetails = async (req, res) => {
  try {
    console.log("ooooooooooooooo",req.body);
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userid = req.user.id;
    console.log("inside getAllCourses");
    const courseDetails = await Course.findById(
      // { status: "Published" },
      courseId
    )
      .populate("instructor")
      .exec()
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userid,
    })
    let totalDurationInSeconds = 0
    courseDetails.courseContent?.forEach((content) => {
      content.subSection?.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? (courseProgressCount?.completedVideos)
          : ([]),
      },
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something went wrong while getFullCourseDetail and error is ${error}`
    })
  }
}
exports.editeCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body;
    console.log("inside editecourse")
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Course is not founde"
      })
    }
    if (req.files) {
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.ene.FOLDER_NAME)
      course.thumbnailImage = thumbnailImage
    }
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }
    await course.save();
    console.log("before updatecourse dbcall")
    const updatecourse = await Course.findById(courseId)
      .populate({
        path: "Instructore",
        populate: {
          path: "additionalDetails"
        },
        options: { strictPopulate: false }
      })
      .populate("category").populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        },
        options: { strictPopulate: false }
      })
      .exec();
    console.log("after dbcall")
    return res.status(200).json({
      success: true,
      message: 'corse edite successfully',
      data: updatecourse
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `something wert wrong while editing course and error is${error}`
    })
  }
}
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })
    console.log("fjhklddhkdfklffklfjfk", instructorCourses)
    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}