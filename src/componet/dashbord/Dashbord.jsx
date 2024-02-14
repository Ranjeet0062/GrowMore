import React from 'react'
import Sidebar from "../Sidebar"
import { useSelector } from 'react-redux'
import { SidebarLink } from "../../utils/SidebarLink"
import { Outlet } from 'react-router-dom'
function Dashbord() {
    const { user } = useSelector((state) => state.profile);
    console.log("user inside dashbord", user)
    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashbord