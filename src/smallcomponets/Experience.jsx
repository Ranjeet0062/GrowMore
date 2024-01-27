import React from 'react'
import Logo1 from "../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../assets/TimeLineLogo/Logo4.svg"
function Experience() {
    const content=[
        {
            Logo: Logo1,
            heading: "Leadership",
            Description:"Fully committed to the success company",
        },
        {
            Logo: Logo2,
            heading: "Leadership",
            Description:"Fully committed to the success company",
        },
        {
            Logo: Logo3,
            heading: "Leadership",
            Description:"Fully committed to the success company",
        },
        {
            Logo: Logo4,
            heading: "Leadership",
            Description:"Fully committed to the success company",
        },
    ]
    return (
        <div className=' mt-6 md:mt-0 w-[50%]'>
          {
            content.map((element,index)=>{
                return <div className='flex gap-2 items-center justify-start mt-3' key={index}>
                <div className=' h-[50px] w-[50px] flex items-center justify-center]'>
                    <img src={element.Logo} alt="" />
                </div>
                <div>
                    <p className=' font-semibold'>{element.heading}</p>
                    <p>{element.Description}</p>
                </div>
            </div>
            })
          }  
        </div>
    )
}

export default Experience