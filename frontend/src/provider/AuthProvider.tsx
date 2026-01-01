import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Loader } from 'lucide-react';

//when the user sign in using  clerk the token is generated  and to retrive the token mwe use getToken function from clerk 

//useAuth is a hook(function) provided by Clerk that gives access to authentication-related methods and properties, such as getToken and userId.


const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const {getToken} = useAuth(); // getToken function to retrieve the token
    const [loading,setLoading] = useState(true); //useState is a function that allow you to add state to functional components in react 
    useEffect(()=>{
        const initAuth=async()=>{
            try{
                const token = await getToken();
                updateApiToken(token);

            }catch(err)
            {
              updateApiToken(null);
                console.log("Error in AuthProvider:",err);
            }
            finally{
                setLoading(false);
            }
        }
        initAuth();

    },[getToken])

    if(loading){
        return <div className='h-screen w-full flex items-center justify-center '>
          
          <Loader className='size-8 text-emerald-500 animate-spin'/>


        </div>
    }
    return <div>{children}</div> // children are the components that will be wrapped by AuthProvider :- <AuthProvider><App/></AuthProvider> ==> App is the child component
 
}

export default AuthProvider


function updateApiToken(token: string | null) {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;// provide authentication to the user
    } else {
      delete axiosInstance.defaults.headers.common['Authorization']; // remove authentication if no token
    }
}

///// the flow of the the code above
/*
AuthProvider is a react component that trigger when the user sign in using clerk
it is written before the app component in the main.tsx file
1. when the user sign in the AuthProvider component is rendered
2. useEffect hook is triggered which calls the initAuth function
3. initAuth function calls getToken function from clerk to retrieve the token
4. if the token is retrieved successfully it calls updateApiToken function to set the token in axios instance headers
5. if there is an error it calls updateApiToken with null to remove any existing token from axios instance headers
6. finally it sets loading to false to indicate that the authentication process is complete
7. if loading is true it shows a loader otherwise it renders the child components 
  // Set or remove the Authorization header in axios instance based on the token
*/
