import React from "react";
import Link from "next/link";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SismoConnectTesting from "../SismoConnectTesting";
import { useSelector } from "react-redux";

import {
  faHome,
  faMusic,
  faStar,
  faBriefcase,
  faPlusCircle,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const Sidebar = () => {
  const navItems = [
    { name: "Home", href: "/", icon: faHome },
    { name: "Your songs", href: "/songs", icon: faMusic },
    { name: "Portfolio", href: "/portfolio", icon: faBriefcase },
    { name: "Create Song", href: "/create", icon: faPlusCircle },
    { name: "Analytics", href: "/analytics", icon: faChartBar },
  ];

  
  
  

  const { isPremium } = useSelector(
    (state) => state.metamask
  );

  return (
    <div className=" h-full pt-1 px-5 bg-gradient-to-b from-purple-800 to-black transition-all duration-300 z-10">
      <div className="p-4">
        <Link href="/" className="flex">
          {isPremium && (
            <Image
              src={
                "https://media.istockphoto.com/id/1266423143/vector/premium-premium-in-royal-style-on-gold-background-luxury-template-design-vector-stock.jpg?s=612x612&w=0&k=20&c=j2q53cnoGhjf7dPatZCvolSrwjMIAofl2kC0PW7fFig="
              }
              alt="Image"
              height={20}
              width={20}
              className=" rounded-lg my-auto mr-1"
            />
          )}
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
            {index == 2 && (
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
        <SismoConnectTesting />
      </ul>
    </div>
  );
};

export default Sidebar;
