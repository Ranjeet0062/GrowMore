import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TbCoinRupee } from "react-icons/tb"
import { MdNavigateNext } from "react-icons/md"
import IconBtn from "../../../IconBtn"
import TagInput from './TagInput';
import UploadThumnail from "../UploadThumnail"
import { setStep, setCourse } from "../../../../redux/slices/course.slice"
import { COURSE_STATUS } from "../../../../utils/constant"
function CourseInformationForm() {
  const dispatch = useDispatch()
  const [category, setcategory] = useState([]);
  const [loading, setloading] = useState(false);
  const { course, editCourse } = useSelector((state) => state.course)
  useEffect(() => {
    const showallcategory = async () => {
      try {
        setloading(true);
        const toastId = toast.loading("Loading...")
        await axios.get(`${import.meta.env.VITE_BASE_URL}/category/api/showAllCategories`,
          { withCredentials: true }
        ).then((res) => {
          setcategory(res.data.data)
        }).catch((error) => {
          console.log("error acure in showallcategory", error);
          toast.error("faild to show category")
        })
        setloading(false);
        toast.dismiss(toastId)

      } catch (error) {
        console.log(error)
      }
    }
    showallcategory()
  }, [])
  const { register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    if (editCourse) {
      console.log("data jyhgf", course)
      console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
  }, [])
  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setloading(true)
        const toastId = toast.loading("Loading..")
        await axios.put(`${import.meta.env.VITE_BASE_URL}/course/api/editeCourseDetails`, formData, {
          headers: {
            contentLength: '560',
            contentType: 'application/json; charset=utf-8'
          }.toJSON(), withCredentials: true
        }).then((rea) => {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }).catch((error) => {
          console.log("error acure in updating course", error);
          toast.error("failed to update course!try agin")
        })
        setloading(false)
        toast.dismiss(toastId)
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setloading(true)
    const toastId = toast.loading("Loading...")
    await axios.post(`${import.meta.env.VITE_BASE_URL}/course/api/createcourse`, formData, { withCredentials: true })
      .then((res) => {
        dispatch(setStep(2))
        console.log("creating course fjsdjfdfjf",res.data.data);
        dispatch(setCourse(res.data.data))
      }).catch((error) => {
        console.log("error acure in creating a course", error);
        toast.error("failed to create a coourse!try agian")
      })
    setloading(false)
    toast.dismiss(toastId);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      <div className='flex flex-col space-y-2'>
        <label htmlFor='courseTitle' className="text-sm text-richblack-5">Course Title<sup className='text-pink-600'>*</sup></label>
        <input id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is required
            </span>
          )
        }
      </div>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='courseDescription' className="text-sm text-richblack-5">Course Short Description<sup className='text-pink-600'>*</sup></label>
        <textarea id="courseDescription"
          placeholder="Enter Course Description"
          {...register("courseDescription", { required: true })}
          className="form-style w-full h-[120px] resize-x-none"
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )
        }
      </div>
      <div className='flex flex-col space-y-2 relative'>
        <label htmlFor='coursePrice' className="text-sm text-richblack-5">Course Price<sup className='text-pink-600'>*</sup></label>
        <input type='number' id="coursePrice"
          placeholder="Enter Course price"
          {...register("coursePrice", { required: true })}
          className="form-style w-full pl-12 "
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course coursePrice is required
            </span>
          )
        }
        <TbCoinRupee className="absolute bottom-[13px] left-[10px] text-xl text-white font-bold" />
      </div>
      <div>
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full">
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            category?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}

        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>)}
      </div>
      <TagInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <UploadThumnail name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      <div className='flex flex-col space-y-2'>
        <label htmlFor='courseBenefits' className="text-sm text-richblack-5">Benefits of the course<sup className='text-pink-600'>*</sup></label>
        <textarea id="courseBenefits"
          placeholder="Enter Course Benefits"
          {...register("courseBenefits", { required: true })}
          className="form-style w-full h-[120px] resize-x-none"
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Cours eBenefits is required
            </span>
          )
        }
      </div>
      <TagInput
        label="Tags"
        name="Intruction"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}

export default CourseInformationForm