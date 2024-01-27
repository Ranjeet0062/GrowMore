import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import HighlightText from '../componet/HighlightText'
import CTAButton from "../componet/CTAButton"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../componet/CodeBlocks"
import Comparewithother from "../assets/Images/Compare_with_others.png"
import Knowyourprogrss from "../assets/Images/Know_your_progress.png"

import Experience from "../smallcomponets/Experience"
import Timelineimage from "../assets/Images/TimelineImage.png"
function Home() {
    return (
        <div className='mb-10'>
            {/*Section1  */}
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

                <Link to={"/signup"}>
                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200transition-all duration-200 hover:scale-95 w-fit '>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-20 group-hover:bg-richblack-900'>
                            <p className=' text-red-800'>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>

                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='mx-3 my-12 shadow-blue-200'>
                    <video
                        muted
                        loop
                        autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                    <CodeBlocks
                        position={"md:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* Code Section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={"coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                <div className='flex flex-col  items-center gap-3 mb-7'>
                    <h1 className=' font-extrabold text-center md:text-start text-5xl'>Unlock the <HighlightText text={"Power of Code"} /></h1>
                    <span className=' font-bold opacity-75 text-xl'>Learn to Build Anything You Can Imagine</span>
                    <div className='flex gap-5 mt-4'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Expore full catelog
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                            Learn more
                        </CTAButton>
                    </div>
                </div>
            </div>
            {/* section 2 */}
            <div className='section2 text-white'>
                <div className='container relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center  justify-between '>
                    <div className=' h-9'></div>
                    <div className='get  flex flex-col md:flex md:flex-row gap-4' >
                        <div>
                            <h1 className='font-extrabold text-3xl text-center md:text-start opacity-60'><span >Get the Skills you need for a</span> <HighlightText text={"Job that is in demand"} /></h1>

                        </div>
                        <div className=' md:w-[45%] flex flex-col items-center md:block'>
                            <h1>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</h1>
                            <div className=' w-32 mt-2'>
                                <CTAButton active={true} linkto={"/signup"}>
                                    Learn more
                                </CTAButton>
                            </div>
                        </div>
                    </div>
                    <div className='experience flex flex-col-reverse md:flex md:flex-row justify-between items-center w-[100%] mt-7'>
                        <Experience />
                        <div className='w-[50%] '>
                            <div className=' w-[85%] relative flex flex-col items-center justify-center  '>
                                <img src={Timelineimage} alt="" />
                                <div className=' w-[70%] md:h-20 bg-caribbeangreen-500 absolute -bottom-4 flex flex-col md:flex-row md:gap-3 justify-center items-center p-2 '>
                                    <div className='flex justify-center items-center gap-3 text-white'>
                                        <p className=' md:font-bold md:text-4xl text-white'>10</p>
                                        <p className='flex flex-col'>
                                            <span>Year of </span>
                                            <span>Exprience</span>
                                        </p>
                                    </div>
                                    <div className=' md:h-[60px] md:w-[2px] bg-white'></div>
                                    <div className='flex  justify-start items-center gap-3 text-white'>
                                        <p className=' md:font-bold md:text-4xl text-white'>250</p>
                                        <p className='flex flex-col'>
                                            <span>Type of</span>
                                            <span>Courses</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='h-[125px]'></div>
                    <div className='posteer flex flex-col justify-between items-center w-[100%] gap-5 '>
                        <h1 className='font-extrabold text-3xl text-center md:text-start opacity-60'>Your Swiss Knife for <HighlightText text={" learning any language"} /></h1>

                        <div className='text-center text-richblack-600 mx-auto text-xl font-medium w-[70%]'>
                            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                        </div>
                        <div className=' flex flex-row-reverse'>
                            <img src={Comparewithother} alt="" />
                            <img src={Knowyourprogrss} alt="" />
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton >
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home