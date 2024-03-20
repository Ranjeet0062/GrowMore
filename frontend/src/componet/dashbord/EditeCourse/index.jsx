import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setCourse, setEditCourse } from "../../../redux/slices/course.slice"
import RenderSteps from "../AddCourse/RenderSteps"
import axios from "axios"

export default function EditCourse() {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    console.log(courseId);
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        setLoading(true)
        axios.post(`${import.meta.env.VITE_BASE_URL}/course/api/getCourseDetails`,

            { courseId },
            { withCredential: true }

        ).then((res) => {
            dispatch(setEditCourse(true))
            dispatch(setCourse(res?.data?.data.courseDetails))
        }).catch((error) => {
            console.log("error accure while fatchiing course details", error)
        })
        setLoading(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>
            <div className="mx-auto max-w-[600px]">
                {course ? (
                    <RenderSteps />
                ) : (
                    <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                        Course not found
                    </p>
                )}
            </div>
        </div>
    )
}