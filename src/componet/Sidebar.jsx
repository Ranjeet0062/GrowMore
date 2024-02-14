import React from 'react'
import { useSelector } from 'react-redux'
import {SidebarLink} from "../utils/SidebarLink"
import SidebarLinkItem from './SidebarLinkItem';
function Sidebar() {
    const {user}=useSelector((state)=>state.profile);
    console.log("user inside dashbord",SidebarLink)
    console.log("user inside dashbord",user)

    return (
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
            <div className="flex flex-col">
                {
                    SidebarLink.map((link)=>{
                        return link.type && user?.accountType !== link.type?(null):(
                                   <SidebarLinkItem link={link}/>
                        )  
                    })
                }
            </div>
        </div>
    )
  
}

export default Sidebar