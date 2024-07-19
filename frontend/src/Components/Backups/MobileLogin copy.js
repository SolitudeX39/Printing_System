import React from 'react';
import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/padlock.png";
import {useNavigate} from 'react-router-dom'; // Import useNavigate instead of useHistory

function MobileLogin() {

    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleNavigateToMainPage = () => {
        // Perform any necessary login logic Navigate to the printers page
        navigate('/mainpage');
    };

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-200 p-4">
            <div
                className="w-full max-w-[480px] bg-white rounded-xl shadow-xl p-8 mx-auto border border-gray-300">
                <div className="text-center text-4xl font-bold leading-8 text-zinc-900 mt-2">
                    Login
                </div>
                <div className="flex flex-col mt-8 text-sm leading-5">
                    <div className="font-bold text-gray-700 mb-2">Email</div>
                    <div
                        className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg border border-cyan-500 text-zinc-900">
                        <img loading="lazy" src={userIcon} className="w-4 h-4" alt="Username Icon"/>
                        <input
                            type="text"
                            className="flex-auto outline-none bg-transparent text-sm leading-5"
                            placeholder="Username/Password"/>
                    </div>
                </div>
                <div className="flex flex-col mt-6 text-sm leading-5">
                    <div className="font-bold text-gray-700 mb-2">Password</div>
                    <div
                        className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg border border-cyan-500 text-zinc-900">
                        <img loading="lazy" src={passwordIcon} className="w-4 h-4" alt="Password Icon"/>
                        <input
                            type="password"
                            className="flex-auto outline-none bg-transparent text-sm leading-5"
                            placeholder="Password"/>
                    </div>
                    <div className="mt-2 text-right text-sm leading-5 text-cyan-500 font-bold">
                        Forgot password?
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="w-full bg-cyan-500 text-white py-3 rounded-lg text-sm font-bold"
                        onClick={handleNavigateToMainPage}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MobileLogin;
