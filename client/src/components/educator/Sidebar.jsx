import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Courses", path: "/educator/my-courses", icon: assets.my_course_icon },
    {
      name: "Student Entrolled",
      path: "/educator/student-enrolled",
      icon: assets.person_tick_icon,
    },
  ];

  return (
    isEducator && (
      <div
        className="
          md:w-64 w-16 min-h-screen py-2 flex flex-col
          border-r border-gray-200 bg-white
          dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100
          backdrop-blur-md
        "
      >
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              [
                "flex items-center md:flex-row flex-col md:justify-start justify-center gap-3",
                "py-3.5 md:px-10 border-r-[3px] transition-colors duration-150",
                isActive
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-400 dark:text-indigo-200"
                  : "border-transparent hover:bg-gray-100/90 hover:border-gray-200 dark:hover:bg-slate-800/80 dark:hover:border-slate-700",
              ].join(" ")
            }
          >
            <img
              src={item.icon}
              alt="icon"
              className="w-6 h-6 opacity-90 dark:opacity-100"
            />
            <p className="md:block hidden text-center text-sm md:text-base">
              {item.name}
            </p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
