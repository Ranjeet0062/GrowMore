import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../redux/slices/viewCourseSlice';
import VideoDetailsSidebar from '../componet/dashbord/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../componet/dashbord/ViewCourse/CourseReviewModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/course/api/getFullCourseDetails`,
          { courseId },
          { withCredentials: true })
          .then((res) => {
            console.log("..........,,,,,,,,",res)
            const courseData=res.data.data;
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
              lectures += sec.subSection.length
            })  
            dispatch(setTotalNoOfLectures(lectures));
          }).catch((error)=>{
            toast.error("failed to fatching course");
            console.log("error acure in viewcourse page",error)
          })
              
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <>
        <div  className='flex text-white w-full'>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div className='w-[65%] '>
                <Outlet />
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCourse
