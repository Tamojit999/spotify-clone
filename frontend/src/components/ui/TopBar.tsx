import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import SignInOAuthButton from './SignInOAuthButton';
import { Button } from './button';

const TopBar = () => {
  const isAdmin = false;
  return (
    <>
      <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md  z-10">
        <div className="flex gap-2 items-center">
          Spotify
        </div>
        <div className="flex gap-4 items-center">
          {isAdmin && (<Link to="/admin"> <LayoutDashboardIcon className='size-4 mr-2'/>Admin Dashboard</Link>)

          }

          <SignedIn> {/*SignedIn from clerk*/ }
            <SignOutButton/> {/*SignOutButton from clerk*/ }
          </SignedIn> 

          <SignedOut> {/*SignedOut from clerk*/ }
           < SignInOAuthButton />
          </SignedOut>
        </div>
      </div>
    </>
  )
}

export default TopBar