import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
function SidebarLinkItem({ link }) {
    const Icon = Icons[link.icon]
    const locaation=useLocation()
    return (
        <NavLink to={link.path}  className={`relative px-8 py-2 text-sm font-medium ${
            link.path===locaation.pathname
              ? "bg-yellow-800 text-yellow-50"
              : "bg-opacity-0 text-richblack-300"
          } transition-all duration-200`}>
            <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${link.path===locaation.pathname ? "opacity-100" : "opacity-0"
                    }`}
            ></span>
            <div className="flex items-center gap-x-2">
                {/* Icon Goes Here */}
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLinkItem