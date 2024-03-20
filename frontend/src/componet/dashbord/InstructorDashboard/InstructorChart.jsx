import React, { useState } from 'react'

import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {

    const [currChart, setCurrChart] = useState("students");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                data: courses?.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                data: courses?.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses?.length),
            }
        ]
    }


    //create options
    const options = {

    };


    return (
        <div className='w-[50%]'>
            <p className='text-xl'>Visualise</p>
            <div className='flex gap-x-5 mt-3'>
                <button
                    onClick={() => setCurrChart("students")}
                    className={currChart === "students"?'bg-richblack-500 pl-5 pr-5 pb-3 pt-3 rounded-xl font-bold':""}
                >
                    Student
                </button>

                <button
                    onClick={() => setCurrChart("income")}
                    className={currChart !== "students"?'bg-richblack-500 pl-5 pr-5 pb-3 pt-3 rounded-xl font-bold':""}
                >
                    Income
                </button>
            </div>
            <div className='w-full'>
                <Pie
                    data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorChart
