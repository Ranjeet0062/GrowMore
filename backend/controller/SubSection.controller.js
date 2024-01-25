const Section=require("../model/section");
const SubSection=require("../model/subsection.model");
const {uploadImageToCloudinary}=require("../utils/imageUploader")
require("dotenv").config()
exports.createSubSection=async(req,res)=>{
    try{
        const {sectionId,title,description}=req.body;
        const video=req.files.videourl;
        if (!sectionId || !title || !description || !video) {
            return res
              .status(404)
              .json({ success: false, message: "All Fields are Required" })
          }
          const videouploaded=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
          const subsection=await SubSection.create({
            title,
            description,
            timeDuration:`${videouploaded.duration}`,
            videoUrl:`${videouploaded.secure_url}`
          })
          const updatedsection=await Section.findByIdAndUpdate(sectionId,
            { $push: { subSection: subsection._id } },
            { new: true }
          ).populate("subSection")
          return res.status(200).json(
            {
                success:true,
                message:`subsection created successfully `,
                subsection,
                updatedsection
            }
          )
         
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`something went wrong while creating a subsection and error is ${error}`
        })
    }
  }
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
      await subSection.save()
      const updatedSection = await Section.findById(sectionId).populate("subSection")
      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }