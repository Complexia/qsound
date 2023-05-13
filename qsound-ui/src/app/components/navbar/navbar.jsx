import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {

  const [address, setAddress] = useState(null);
  useEffect(() => {
    const addressValue = localStorage.getItem('address');
    if (addressValue !== 'undefined' && addressValue !== null) {
      setAddress(JSON.parse(addressValue))
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('address');
    setAddress(null);
  }

  return (
    
    <nav className= "bg-gradient-to-b from-purple-800 to-black transition-all duration-300 z-10 py-5 ">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">   
            <h1 className="text-white font-bold text-lg">Qsound</h1>
          </Link>
        </div>
        <div className="flex items-center">
            

            <Link href={{
              pathname: '/pass',          
            }}> 
                <button className="mr-4 text-white hover:text-purple-800">purchase pass</button>
            </Link>

            <Link href={{
              pathname: '/mymusic',          
            }}> 
                <button className="mr-4 text-white hover:text-purple-800">my music</button>
            </Link>
          <button>Settings</button>
          {!address ? (
                <div>connect</div>
              
            ) : (
                <div>disconnect</div>

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;