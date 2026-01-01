import { Route,Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AuthCallbackPage from "./pages/Auth-Callback/AuthCallbackPage";
import { Button } from "./components/ui/button";  



function App() {
  return (
    <>

    <Routes> 
      <Route path="/" element={<HomePage/>}/>  
       <Route path="/auth-callback" element={<AuthCallbackPage/>}/>

    </Routes>
  
   


    </>
    
  );
}

export default App