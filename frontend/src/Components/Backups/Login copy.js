import React from 'react';
import {useNavigate} from 'react-router-dom';
import userIcon from "../Assets/user.png";
import passwordIcon from "../Assets/padlock.png";

function ResponsiveLogin() {
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    const handleNavigateToMainPage = () => {
        // Perform any necessary login logic
        navigate('/mainpage');
    };

    return (
        <div
            className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-200 p-4">
            <div
                className="w-full max-w-[480px] md:max-w-[392px] bg-white md:bg-transparent rounded-xl md:rounded-none p-8 md:p-4 mx-auto border border-gray-300 md:border-transparent">
                <div
                    className="text-center text-4xl font-bold leading-8 text-zinc-900 mt-2 md:mt-10">
                    Login
                </div>
                <div className="flex flex-col mt-8 md:mt-6 text-sm leading-5">
                    <div className="font-bold text-gray-700 mb-2 md:mb-0">Email</div>
                    <div
                        className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg border border-cyan-500 text-zinc-900">
                        <img loading="lazy" src={userIcon} className="w-4 h-4" alt="Username Icon"/>
                        <input
                            type="text"
                            className="flex-auto outline-none bg-transparent text-sm leading-5"
                            placeholder="Email/Username"/>
                    </div>
                    <div className="font-bold text-gray-700 mb-2 mt-4 md:mt-0">Password</div>
                    <div
                        className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg border border-cyan-500 text-zinc-900">
                        <img loading="lazy" src={passwordIcon} className="w-4 h-4" alt="Password Icon"/>
                        <input
                            type="password"
                            className="flex-auto outline-none bg-transparent text-sm leading-5"
                            placeholder="Password"/>
                    </div>
                    <div
                        className="mt-2 text-right text-sm leading-5 text-cyan-500 font-bold md:text-right">
                        Forgot Password?
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="w-full bg-cyan-500 text-white py-3 rounded-lg text-sm font-bold"
                        onClick={handleNavigateToMainPage}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResponsiveLogin;
