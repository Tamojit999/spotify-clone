import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Split from "react-split";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import AudioPlayer from './components/AudioPlayer';
import PlaybackControls from './components/PlaybackControls';
const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (

    <div className='h-screen bg-black text-white flex flex-col'>


      {!isMobile ? (
        <Split direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2" gutterSize={8}
          sizes={[20, 60, 20]}      // default widths (percent)
          minSize={[10, 40, 0]}     // matches your constraints
          maxSize={[30, 9999, 25]} >

          {/* LEFT SIDEBAR */}
          <div className="h-full">
            <LeftSidebar />
          </div>

          {/* MAIN OUTLET CONTENT */}
          <div className="h-full overflow-auto">
            <Outlet />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="h-full">
            <RightSidebar />
          </div>
        </Split>) : (
        // MOBILE — show only main content
        <div className="h-full overflow-auto">
              <Outlet />
            </div>
            
            
            
            

      )
      
      }
      <PlaybackControls />

      




    </div>

  )
}

export default MainLayout