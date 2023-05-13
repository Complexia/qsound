
import React from 'react';
import Link from 'next/link';

import { useState } from 'react';

const Sidebar = () => {
  const navItems = [
    { name: 'my mysic', href: '/mymusic' },
    { name: 'analytics', href: '/analytics' },
  ];

  const [showIntegrations, setShowIntegrations] = useState(false);

  const toggleIntegrations = () => {
    setShowIntegrations(!showIntegrations);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-1/6 bg-gradient-to-b from-purple-800 to-black transition-all duration-300 z-10">
      <div className="p-4">
        <Link href="/">
          <span className="cursor-pointer text-white font-bold text-2xl">QSOUND</span>
        </Link>
      </div>
      <ul className="h-full">
        {navItems.map((item, index) => (
          <li key={index} className="mb-2">
            <Link href={item.href}>
              <span className="block px-4 py-2 text-white hover:bg-purple-800 cursor-pointer">
                {item.name}
              </span>
            </Link>
                  
          </li>
        ))}
        
        
      </ul>
      
    </div>
  );
};

export default Sidebar;
