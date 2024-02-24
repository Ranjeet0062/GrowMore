const Course = require("../model/course.mosel");
const CourseProgress = require("../model/courseprogress.model");
const Profile = require("../model/profile.model");
const User = require("../model/user.model");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
exports.updateProfile = async (req, res) => {
	try {
		console.log("data...", req.body);
		const { firstName, lastName, dateOfBirth = null, about = null, contactNumber, gender = null } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true }).populate("additionalDetails").exec();
		const profile = await Profile.findByIdAndUpdate(userDetails.additionalDetails, {
			dateOfBirth: dateOfBirth,
			about: about,
			contactNumber: contactNumber,
			gender: gender
		}, { new: true })
		const user = await User.findById(id,).populate("additionalDetails").exec();

		// Update the profile fields

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			data: user
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
exports.getAllUserDetails = async (req, res) => {
	try {
		console.log("user of req", req.user)
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.populate("courses")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
exports.updateDisplayPicture = async (req, res) => {
	try {
		const displayPicture = req.files.displayPicture
		const userId = req.user.id
		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log(image)
		const updatedProfile = await User.findByIdAndUpdate(
			userId,
			{ image: image.secure_url },
			{ new: true }
		).populate("additionalDetails")
		console.log("updatedProfile", updatedProfile)
		return res.status(200).json({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};
exports.getEnrolledCourses = async (req, res) => {
	try {
		const userId = req.user.id
		let userDetails = await User.findOne({
			_id: userId,
		}).populate({
			path: "courses",
			populate: [
				{
					path: "courseContent",
					populate: {
						path: "subSection",
					},
				},
				{
					path: "instructor",
					select:"-courses"
				},
			],
			select: "-courses.studentsEnrolled",

		})
			.exec()

		userDetails = userDetails.toObject()
		var SubsectionLength = 0
		for (var i = 0; i < userDetails.courses.length; i++) {
			let totalDurationInSeconds = 0
			SubsectionLength = 0
			for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
				totalDurationInSeconds += userDetails.courses[i].courseContent[
					j
				].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
				userDetails.courses[i].totalDuration = convertSecondsToDuration(
					totalDurationInSeconds
				)
				SubsectionLength +=
					userDetails.courses[i].courseContent[j].subSection.length
			}
			let courseProgressCount = await CourseProgress.findOne({
				courseID: userDetails.courses[i]._id,
				userId: userId,
			})
			courseProgressCount = courseProgressCount?.completedVideos.length
			if (SubsectionLength === 0) {
				userDetails.courses[i].progressPercentage = 100
			} else {
				// To make it up to 2 decimal point
				const multiplier = Math.pow(10, 2)
				userDetails.courses[i].progressPercentage =
					Math.round(
						(courseProgressCount / SubsectionLength) * 100 * multiplier
					) / multiplier
			}
		}

		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could not find user with id: ${userDetails}`,
			})
		}
		return res.status(200).json({
			success: true,
			data: userDetails.courses,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
exports.instructorDashboard = async (req, res) => {
	try {
		const courseDetails = await Course.find({ instructor: req.user.id });

		const courseData = courseDetails.map((course) => {
			const totalStudentsEnrolled = course.studentsEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({ courses: courseData });

	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}