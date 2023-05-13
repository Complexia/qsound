import React from "react";
import Link from "next/link";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMusic,
  faStar,
  faBriefcase,
  faPlusCircle,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  const navItems = [
    { name: "Home", href: "/mymusic", icon: faHome },
    { name: "Your songs", href: "/analytics", icon: faMusic },
    { name: "Top Artists", href: "/analytics", icon: faStar },
    { name: "Portfolio", href: "/portfolio", icon: faBriefcase },
    { name: "Create Album", href: "/analytics", icon: faPlusCircle },
    { name: "Analytics", href: "/analytics", icon: faChartBar },
  ];

  const [showIntegrations, setShowIntegrations] = useState(false);

  const toggleIntegrations = () => {
    setShowIntegrations(!showIntegrations);
  };

  return (
    <div className=" h-full pt-1 px-5 bg-gradient-to-b from-purple-800 to-black transition-all duration-300 z-10">
      <div className="p-4">
        <Link href="/">
          <span className="cursor-pointer text-white font-bold text-2xl">
            QSOUND
          </span>
        </Link>
      </div>
      <ul className="h-full mt-3">
        {navItems.map((item, index) => (
          <>
            {index == 0 && (
              <h1 className="font-bold px-4 py-4 text-lg">General</h1>
            )}
            {index == 3 && (
              <h1 className="font-bold px-4 py-4 text-lg">Artist</h1>
            )}
            <li
              key={index}
              className="mb-2 hover:bg-purple-800 cursor-pointer rounded-lg"
            >
              <Link href={item.href}>
                <div className="flex ">
                  <FontAwesomeIcon
                    icon={item.icon}
                    width={20}
                    className="ml-2"
                  />
                  <span className="block px-4 py-2 text-sm font-semibold text-white ">
                    {item.name}
                  </span>
                </div>
              </Link>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
