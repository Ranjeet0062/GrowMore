import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from "../../IconBtn";
// import { createRating } from '../../../services/operations/courseDetailsAPI';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async (data) => {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rating/api/createRating`,
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            { withCredentials: true }
        ).then((res) => {
            console.log("created rating", res.data)
        }).catch((error) => {
            console.log("error accure in creating rating  and error is", error)
        })
        setReviewModal(false);
    }

    return (
        <div className='w-[20%] p-3'>
            <div>
                {/* Modal header */}
                <div className='flex  justify-between mt-4'>
                    <p>Add Review</p>
                    <IconBtn
                        onclick={() => setReviewModal(false)}
                        text="Cancel"
                    />
                </div>

                {/* Modal Body */}
                <div>

                    <div>
                        <img
                            src={user?.image}
                            alt='user Image'
                            className='aspect-square  w-[50px] rounded-full object-cover'
                        />
                        <div>
                            <p>{user?.firstName} {user?.lastName}</p>
                            <p>Posting Publicly</p>
                        </div>
                    </div>


                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='mt-6 flex flex-col items-center'>

                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <div>
                            <label htmlFor='courseExperience'>
                                Add Your Experience*
                            </label>
                            <textarea
                                id='courseExperience'
                                placeholder='Add Your Experience here'
                                {...register("courseExperience", { required: true })}
                                className='form-style min-h-[130px] w-full'
                            />
                            {
                                errors.courseExperience && (
                                    <span>
                                        Please add your experience
                                    </span>
                                )
                            }
                        </div>
                        {/* Cancel and Save button */}
                        <div className='flex gap-4 mt-4'>
                            <IconBtn
                                onclick={() => setReviewModal(false)}
                                text="Cancel"
                            />
                            <IconBtn
                                text="save"
                            />
                        </div>


                    </form>

                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal
