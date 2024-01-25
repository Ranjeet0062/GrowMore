const CourseProgress = require("../model/courseprogress.model");
const SubSection = require("../model/section");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, SubSectionId } = req.body;
    const userid = req.user.id;
    
    const subsection = await SubSection.findById(SubSectionId);
    
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: `Invalid subsectionId`
      });
    }

    const courseProgres = await CourseProgress.findOne({ courseId, userId: userid });

    if (courseProgres) {
      if (courseProgres.completedVideos.includes(SubSectionId)) {
        return res.status(200).json({
          success: false,
          message: "Already added in completed videos"
        });
      }

      courseProgres.completedVideos.push(SubSectionId);
      await courseProgres.save();
    } else {
      await CourseProgress.create({
        courseId,
        userId: userid,
        completedVideos: [SubSectionId]  // Set the array directly
      });

      return res.status(200).json({
        success: true,
        message: "Marked as done"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Something went wrong while updating course progress, and the error is ${error}`
    });
  }
};
