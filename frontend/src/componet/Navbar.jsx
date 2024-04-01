import React, { useEffect, useState } from 'react'
import logoFullLight from "../assets/Logo/Logo-Full-Light.png"
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MdMenu } from 'react-icons/md'; // Import the hamburger icon
import ProfileDropdown from "./ProfileDropdown"
import { useDispatch } from "react-redux"
import { setshowSidebar } from '../redux/slices/profile.slice';
import { FaWindowClose } from "react-icons/fa";
function Navbar() {
    const locaation = useLocation();
    // const loading = false
    const { showSidebar } = useSelector((state) => state.profile)
    const [subLinks, setsubLink] = useState([])
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
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
    const { token, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 650);
            // Adjust breakpoint as needed
        };
        // Add event listener to detect window resize
        window.addEventListener('resize', handleResize);
        // Initial check for mobile state on component mount
        handleResize();
        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // const subLinks = ["mernstack", "webdev", "python"]
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BASE_URL}/category/api/showAllCategories`).then((res) => {
            setsubLink(res.data.data)
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])
    return (
        !isMobile ?
            (<div className='w-[100%] h-[60px] text-white border-b-2 flex items-center justify-center '>
                <nav className='flex justify-around items-center w-[100%]'>
                    <div>
                        <Link to="/" className=''>
                            <img src={logoFullLight} alt="logo" className='w-[145px]' />
                        </Link>
                    </div>
                    <div className='navigaton '>
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
                        {token !== null ? (
                            <div key="dashboard"><ProfileDropdown /></div>
                        ) : (
                            <div key="login-signup" className='flex gap-3'>
                                <Link to="/login">
                                    <button key="login" className=' pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button key="signup" className='pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Signup</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>) :
            (<div className='w-[100%] h-[60px] text-white border-b-2 flex items-center justify-between '>
                <div className='flex gap-3'>
                    {token && <div className='w-[30px]'>
                        <button onClick={() => { dispatch(setshowSidebar(showSidebar)); console.log("inside navbar", showSidebar) }} className='text-white '>
                            {showSidebar ? (<FaWindowClose />) : (<MdMenu size={24} />)}
                        </button>
                    </div>}
                    <Link to="/" className=''>
                        <img src={logoFullLight} alt="logo" className='w-[145px]' />
                    </Link>
                </div>
                <div className='flex items-center'>
                    {token && <button onClick={toggleMenu} className='text-white -translate-x-6'>
                        <MdMenu size={24} />
                    </button>}
                    {token && isMenuOpen && (
                        <div className='mobile-menu bg-black text-white p-5  absolute z-10 -translate-x-28 translate-y-[120px] w-[300px] transition-all duration-200	'>
                            <div className='navigaton '>
                                <ul className='flex flex-col gap-3 font-semibold'>
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
                                                            <Link to={navitem.path} onClick={() => setIsMenuOpen(false)} className={locaation.pathname === navitem.path ? " text-yellow-5" : "text-white"}>
                                                                {navitem.title}
                                                            </Link>
                                                        )
                                                }
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            {token !== null ? (
                                <div key="dashboard">
                                    <ProfileDropdown setIsMenuOpen={setIsMenuOpen} />
                                </div>
                            ) : (
                                <div key="login-signup" className='flex gap-3' >
                                    <Link to="/login">
                                        <button key="login" className=' pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Login</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button key="signup" className='pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Signup</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                    {!token && <div key="login-signup" className='flex gap-3' >
                        <Link to="/login">
                            <button key="login" className=' pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button key="signup" className='pr-3 pl-3 pt-2 pb-2 border border-white rounded-md '>Signup</button>
                        </Link>
                    </div>
                    }

                </div>
            </div>)
    )
}

export default Navbar