const Course = require("../model/course.mosel")
const Category = require("../model/category.model")
const Section = require("../model/section")
const SubSection = require("../model/subsection.model")
const User = require("../model/user.model")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const CourseProgress = require("../model/courseprogress.model")
// const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.createCourse = async (req, res) => {
    try {
      // Get user ID from request object
      const userId = req.user.id
  
      // Get all required fields from request body
      let {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        // tag: _tag,
        category,
        status,
        // instructions: _instructions,
      } = req.body
      // Get thumbnail image from request files
      const thumbnail = req.files.thumbnailImage
  
      // Convert the tag and instructions from stringified Array to Array
    //   const tag = JSON.parse(_tag)
    //   const instructions = JSON.parse(_instructions)
  
      console.log("tag",  req.body)
    //   console.log("instructions", instructions)
  
      // Check if any of the required fields are missing
      if (
        !courseName 
        // !courseDescription ||
        // !whatYouWillLearn ||
        // !price ||
        // !thumbnail ||
        // !category 
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
      console.log("hgffdgfhjkl;kj",thumbnailImage)
      // Create a new course with the given details
      const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: instructorDetails._id,
        whatYouWillLearn: whatYouWillLearn,
        price,
        // tag,
        category: categoryDetails._id,
        thumbnail: thumbnailImage.secure_url,
        status: status,
        // instructions,
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