import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"
function TagInput({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues
}) {
    const { editCourse, course } = useSelector((state) => state.course);
    const [tag, settag] = useState([])
    useEffect(() => {
        if (editCourse) {
            settag(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])
    useEffect(() => {
        setValue(name, tag)

    }, [tag])
    const handleDeleteChip=(index)=>{
        const newtag = tag.filter((tagItem, tagIndex) => index !== tagIndex);
        settag(newtag)
    }
    const handleKeyDown=(e)=>{
        if(e.key==="Enter"||e.key===","){
            e.preventDefault()
            const newtag=e.target.value.trim();
            if(newtag&&!tag.includes(newtag)){
                const addtag=[...tag,newtag]
               
                settag(addtag)
                e.target.value=""
            }
        }
    }
    return (
        <div>
            <label htmlFor={name} className="text-sm text-richblack-5">
                {label}
            </label>
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    tag.map((tagitem, index) => {
                        return <div key={index}
                            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                        >
                            {tagitem}
                            <button type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => handleDeleteChip(index)}
                            >
                                <MdClose className="text-sm" />
                            </button>
                        </div>

                    })
                }
                <input
                    id={name}
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="form-style w-full"
                />
            </div>
            {/* Render an error message if the input is required and not filled */}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default TagInput