import React, { useEffect, useState } from 'react'
import logoFullLight from "../assets/Logo/Logo-Full-Light.png"
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
function Navbar() {
    const locaation = useLocation();
    const { token,loading } = useSelector((state) => state.auth);
    // const loading = false
    const [subLinks,setsubLink]=useState([])
    const navlink = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "Catelog",
            path: "/catelog",
        },
        {
            title: "Abaout Us",
            path: "/about",
        },
        {
            title: "Contact Us",
            path: "/contact",
        }

    ]
    // const subLinks = ["mernstack", "webdev", "python"]
    useEffect(()=>{
        axios.get("http://localhost:3000/category/api/showAllCategories").then((res)=>{
            setsubLink(res.data.data)
        }).catch((error)=>{
            console.log("error",error)
        })
    },[])
    return (
        <div className='w-[100%] h-[60px] text-white border-b-2 flex items-center justify-center '>
            <nav className='flex justify-around items-center w-[100%]'>
                <div>
                    <Link to="/" className=''>
                        <img src={logoFullLight} alt="logo" className='w-[145px]' />
                    </Link>
                </div>
                <div className=' navigaton'>
                    <ul className='flex gap-3 font-semibold'>
                        {
                            navlink.map((navitem, index) => {
                                return <li key={index}>
                                    {
                                        navitem.title === "Catelog" ?
                                            (
                                                <div className=' relative group'>
                                                    {navitem.title}
                                                    <div className="hidden absolute left-[50%] top-[50%] z-[1000] group-hover:flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                        {loading ? (
                                                            <p className="text-center">Loading...</p>
                                                        ) : subLinks?.length ? (
                                                            <>
                                                                {subLinks?.map((subLink, i) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(" ")
                                                                            .join("-")
                                                                            .toLowerCase()}`}
                                                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 text-black"
                                                                        key={i}
                                                                    >
                                                                        <p>{subLink.name}</p>
                                                                    </Link>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            <p className="text-center">No Courses Found</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ) :
                                            (
                                                <Link to={navitem.path} className={locaation.pathname === navitem.path ? " text-yellow-5" : "text-white"}>
                                                    {navitem.title}
                                                </Link>
                                            )
                                    }
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className='profileorbutton'>
                    {token ? (
                        <div key="dashboard">Dashboard</div>
                    ) : (
                        <div key="login-signup" className='flex gap-3'>
                            <Link to="/login">
                                <button key="login" className=' pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Login</button>
                            </Link>
                            <Link to="signup">
                                <button key="signup" className='pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Signup</button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar