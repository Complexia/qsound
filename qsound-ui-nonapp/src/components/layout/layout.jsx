"use client";

import Head from 'next/head'


import Navbar from '@/components/navbar/navbar'
import Sidebar from '@/components/sidebar/sidebar'
import { useEffect, useState } from 'react'



const Layout = (props) => {

    const [accessToken, setAccessToken] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
          let accessTokenValue = localStorage.getItem("accessToken");
          
          if (accessTokenValue !== 'undefined' && accessTokenValue !== null) {
            setAccessToken(JSON.parse(accessTokenValue))
          }
        }

        setFullScreen(window.innerHeight >= document.documentElement.scrollHeight);
      }, [])

      
    return (
        <>
            <Head>
                <title>Qsound</title>
                <meta name="description" content="Qsound" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={`flex flex-row ${fullScreen ? 'h-screen' : 'h-full'}`}>

            
              <div>
                <Sidebar />
              </div>

            

            <div className='flex-grow'>
                <div className='pb-3'>
                <Navbar />
                </div>

                <div className='bg-gray-800 bg-opacity-30 max-w-7xl py-8 px-4 sm:px-6 lg:px-8 rounded-lg pr-10'>
                    {props.children}
                </div>
                
            </div>

            </div> 
        </>
    )
}

export default Layout;