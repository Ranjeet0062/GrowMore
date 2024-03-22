import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';
import axios from 'axios'
const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/api/instructorDashboard`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data.courses)
                    setInstructorData(res.data.courses);
                }).catch((error) => {
                    console.log("something went to wrong in mycourse...", error)
                })
            await axios.get(`${import.meta.env.VITE_BASE_URL}/course/api/getInstructorCourses`, { withCredentials: true })
                .then((res) => {
                    setCourses(res.data.data);
                }).catch((error) => {
                    console.log("something went to wrong in mycourse...", error)
                })
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className='text-white'>
            <div className='text-3xl mb-3'>
                <h1 className='font-bold mb-3'>Hi {user?.firstName}</h1>
                <p>Let's start something new</p>
            </div>

            {loading ? (<div className='spinner'>Loading....</div>)
                : courses.length > 0
                    ? (<div>
                        <div className='w-full flex '>
                            <div className='w-full flex flex-col md:flex-row justify-between'>
                                <InstructorChart courses={instructorData} />
                                <div className='w-[400px] flex flex-col gap-3 bg-richblack-500 p-5 rounded-2xl h-[400px] mt-[20px]'>
                                    <p className='text-2xl font-bold'>Statistics</p>
                                    <div className='text-xl '>
                                        <p className='text-xl '>Total Courses</p>
                                        <p className='font-bold'>{courses.length}</p>
                                    </div>

                                    <div className='text-xl '>
                                        <p>Total Students</p>
                                        <p className='font-bold'>{totalStudents}</p>
                                    </div>

                                    <div className='text-xl '>
                                        <p>Total Income</p>
                                        <p className='font-bold'>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    )
                    : (<div>
                        <p>You have not created any courses yet</p>
                        <Link to={"/dashboard/addCourse"}>
                            Create a Course
                        </Link>
                    </div>)}
        </div>
    )
}

export default Instructor
