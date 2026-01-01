import React from 'react'
import { useSignIn } from '@clerk/clerk-react'
import { Button } from './button';
const SignInOAuthButton = () => {
 
    const {isLoaded, signIn} = useSignIn();
    if(!isLoaded) {
        return null;
    }
    function signInWithGoogle(){
        if(!signIn) return; //signIn comes from Clerk.If it doesn't exist (not initialized yet), the function stops — prevents runtime errors.
        signIn.authenticateWithRedirect({ /* This tells Clerk:
“Start OAuth login and redirect the user to Google”*/
            strategy: 'oauth_google', //specifies Google as the OAuth provider.
            redirectUrl:"/soo-callback", // URL to redirect after sign-in
            redirectUrlComplete: "/auth-callback"// URL after sign-in completion
        });
    }

    return <Button onClick={signInWithGoogle} variant={'secondary'} className='w-full text-white border-zinc-200 h-1'>Continue With Google</Button>
  
}

export default SignInOAuthButton


// isLoaded : is a boolean value that indicates whether the sign-in object is fully loaded and ready for use. This is important because certain operations, like initiating an authentication flow, should only be performed when the sign-in object is available.

// signIn: The signIn object provides methods and properties to manage the sign-in process. One of its key methods is authenticateWithRedirect, which initiates an OAuth authentication flow by redirecting the user to the chosen provider's login page.


// signInWithGoogle function: This function is triggered when the user clicks the "Continue With Google" button. It checks if the signIn object is available, and if so, it calls authenticateWithRedirect with specific parameters to start the OAuth flow with Google.