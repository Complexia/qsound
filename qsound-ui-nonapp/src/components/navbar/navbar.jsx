
import ConnectButton from '@/components/metamask/connectButton/connectButton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {

  return (
    
    <nav className= "bg-gradient-to-b from-purple-800 to-black  transition-all duration-300 z-10 py-5 ">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">   
            <h1 className="text-white font-bold text-lg">Qsound</h1>
          </Link>
        </div>
        <div className="flex items-center">
           
           <div className='px-4'>
              <Link href="/">   
                <h1 className="text-white font-bold text-lg">Purchase Pass</h1>
              </Link> 
           </div>
          
          
          <ConnectButton />
            
            

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
