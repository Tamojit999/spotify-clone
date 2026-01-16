import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AuthCallbackPage from "./pages/Auth-Callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/ChatPage/ChatPage";
import AlbumPage from "./pages/Album/AlbumPage";
import AudioPlayer from  "./layout/components/AudioPlayer";


function App() {
	return (
		<>
		 <AudioPlayer />
			<Routes>
				<Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
				
				<Route element={<MainLayout/>}>
				<Route path='/' element={<HomePage />} />
				<Route path='/chat' element={<ChatPage />} />
				<Route path='/albums/:albumId' element={<AlbumPage />} />
				</Route>
					
			</Routes>
		
		</>
	);
}

export default App;