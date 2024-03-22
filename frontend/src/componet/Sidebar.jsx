import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {SidebarLink,settinglink} from "../utils/SidebarLink"
import SidebarLinkItem from './SidebarLinkItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {VscSettingsGear }from "react-icons/vsc"
import {LuLogOut } from "react-icons/lu"
import {logout} from "../services/opration/authApi"
import { useState,useEffect} from 'react'
function Sidebar() {
    const {user}=useSelector((state)=>state.profile);
    const [isMobile, setIsMobile] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const locaation=useLocation()
    const hendelsubmit=()=>{
        navigate("/")
        dispatch(logout())
    }
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 500); 
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
      return (
        isMobile ? (
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 -translate-x-60 absolute">
                <div className="flex flex-col">
                    {
                        SidebarLink.map((link) => {
                            return link.type && user?.accountType !== link.type ? (null) : (
                                <SidebarLinkItem link={link} />
                            )
                        })
                    }
                </div>
                <div className='w-[85%] mx-auto bg-richblack-500 h-[2px] mt-4'></div>
                <NavLink to={settinglink.path} className={`relative px-8 py-2 text-sm font-medium ${settinglink.path === location.pathname
                    ? "bg-yellow-800 text-yellow-50"
                    : "bg-opacity-0 text-richblack-300"
                    } transition-all duration-200`}>
                    <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${settinglink.path === location.pathname ? "opacity-100" : "opacity-0"
                            }`}
                    ></span>
                    <div className="flex items-center gap-x-2">
                        {/* Icon Goes Here */}
                        <VscSettingsGear className="text-lg" />
                        <span>{settinglink.name}</span>
                    </div>
                </NavLink>
                <button
                    className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 flex text-richblack-300 gap-x-2 items-center`}
                    onClick={hendelsubmit}
                >
                    <LuLogOut />
                    <span>Logout</span>
                </button>
            </div>
        ) : (
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                <div className="flex flex-col">
                    {
                        SidebarLink.map((link) => {
                            return link.type && user?.accountType !== link.type ? (null) : (
                                <SidebarLinkItem link={link} />
                            )
                        })
                    }
                </div>
                <div className='w-[85%] mx-auto bg-richblack-500 h-[2px] mt-4'></div>
                <NavLink to={settinglink.path} className={`relative px-8 py-2 text-sm font-medium ${settinglink.path === location.pathname
                    ? "bg-yellow-800 text-yellow-50"
                    : "bg-opacity-0 text-richblack-300"
                    } transition-all duration-200`}>
                    <span
                        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${settinglink.path === location.pathname ? "opacity-100" : "opacity-0"
                            }`}
                    ></span>
                    <div className="flex items-center gap-x-2">
                        {/* Icon Goes Here */}
                        <VscSettingsGear className="text-lg" />
                        <span>{settinglink.name}</span>
                    </div>
                </NavLink>
                <button
                    className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 flex text-richblack-300 gap-x-2 items-center`}
                    onClick={hendelsubmit}
                >
                    <LuLogOut />
                    <span>Logout</span>
                </button>
               
            </div>
        )
    );
    
    
  
}

export default Sidebar