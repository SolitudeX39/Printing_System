import React from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate instead of useHistory
import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/padlock.png";

function DesktopLogin() {
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleNavigateToMainPage = () => {
        // Perform any necessary login logic Navigate to the printers page
        navigate('/mainpage');
    };

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-200 p-4">
            <div className="flex flex-col w-full max-w-[392px] bg-blue">
                <div className="text-4xl font-bold leading-8 text-center text-zinc-900 mt-10">
                    Login
                </div>
                <div className="flex flex-col mt-6 space-y-6">
                    <div
                        className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded border border-cyan-500 text-zinc-900">
                        <img loading="lazy" src={userIcon} className="w-4 h-4" alt="Username Icon"/>
                        <input
                            type="text"
                            className="flex-auto outline-none bg-transparent text-sm leading-5"
                            placeholder="Email/Username"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div
                            className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded border border-cyan-500 text-zinc-900">
                            <img loading="lazy" src={passwordIcon} className="w-4 h-4" alt="Password Icon"/>
                            <input
                                type="password"
                                className="flex-auto outline-none bg-transparent text-sm leading-5"
                                placeholder="Password"/>
                        </div>
                        <div className="text-right">
                            <div className="text-blue-700 font-bold text-sm mt-2">Forgot Password?</div>
                        </div>
                    </div>
                    <button className="bg-cyan-500 text-white py-3 rounded text-sm font-bold" onClick={handleNavigateToMainPage} // Navigate on button click
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DesktopLogin;
