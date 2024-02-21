import React from 'react'
import { useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {AiFillCaretDown} from "react-icons/ai"
function NestedView({hendaleOnchengeSection}) {
    const { course } = useSelector((state) => state.course);
    console.log("course inside nested view",course)
    return (
        <div
            className="rounded-lg bg-richblack-700 p-6 px-8"
            id="nestedViewContainer"
        >
            {
                course?.courseContent?.map((section) => {
                    return <details key={section._id} open>
                        {/* Section Dropdown Content */}
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={() =>
                                        hendaleOnchengeSection(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit className="text-xl text-richblack-300" />
                                </button>
                                {/* <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleleSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                </button> */}
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>
                        <div className="px-6 pb-4">
                            {/* Render All Sub Sections Within a Section */}
                            {/* {section.subSection.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                >
                                    <div className="flex items-center gap-x-3 py-2 ">
                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                        <p className="font-semibold text-richblack-50">
                                            {data.title}
                                        </p>
                                    </div>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-x-3"
                                    >
                                        <button
                                            onClick={() =>
                                                setEditSubSection({ ...data, sectionId: section._id })
                                            }
                                        >
                                            <MdEdit className="text-xl text-richblack-300" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Sub-Section?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {/* Add New Lecture to Section */}
                            {/* <button
                                onClick={() => setAddSubsection(section._id)}
                                className="mt-3 flex items-center gap-x-1 text-yellow-50"
                            >
                                <FaPlus className="text-lg" />
                                <p>Add Lecture</p>
                            </button> */} 
                        </div>
                    </details>
                })
            }
        </div>
    )
}

export default NestedView