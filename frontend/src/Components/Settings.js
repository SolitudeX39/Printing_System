import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import Swal from 'sweetalert2';
import printer from "../Assets/printer.png";
import statusIcon from "../Assets/status.png";
import generalSettings from "../Assets/general settings.png";
import privacyIcon from "../Assets/privacy.png";
import notificationIcon from "../Assets/notification.png";
import appearanceSettingsIcon from "../Assets/appearance.png";
import supportIcon from "../Assets/support.png";
import logoutIcon from "../Assets/logout.png";
import leftArrow from "../Assets/leftArrow.png";
import rightArrow from "../Assets/rightArrow.png";

function MyComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const [selectedSetting,
        setSelectedSetting] = useState(null);
    const [previousPage,
        setPreviousPage] = useState(null);
    const [activeButton,
        setActiveButton] = useState(null); // State to keep track of the active button

    useEffect(() => {
        // Store the previous page before setting new one
        if (location.state && location.state.from) {
            setPreviousPage(location.state.from);
        }
    }, [location]);

    // Handle button click
    const handleButtonClick = (title, text) => {
        setSelectedSetting({title, text});
        setActiveButton(title); // Set the active button
    };

    // Navigate back to the previous page
    const handleBackButtonClick = () => {
        if (previousPage) {
            navigate(previousPage);
        } else {
            navigate(-1); // Fallback if no previous page is recorded
        }
    };

    // Navigate back to the settings menu
    const handleDetailBackButtonClick = () => {
        setSelectedSetting(null);
        setActiveButton(null); // Reset the active button
    };

    // Get button classes based on active state
    const buttonClasses = (title) => `
        py-2 text-left text-sm ${activeButton === title
        ? 'bg-white text-blue-500 font-bold'
        : 'text-gray-200'} 
        ${activeButton === title
            ? 'font-bold'
            : 'font-normal'}
    `;

    //Handle Logout
    const handleLogout = () => {
        Swal
            .fire({
            title: 'Are you sure you want to logout?',
            text: "You will be redirected to the login page.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
            customClass: {
                container: 'swal2-container',
                popup: 'swal2-popup',
                button: 'swal2-button'
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    // Proceed with logout logic (e.g., clear session, redirect to login page)
                    navigate('/'); // Update this path as per your routing setup
                }
            });
    };

    return (
        <div
            className="relative flex min-h-screen bg-gradient-to-br from-blue-600 to-blue-200">
            {isDesktop
                ? (
                    <div className="flex flex-row w-full">
                        {/* Sidebar */}
                        <div className="w-64 bg-gray-900 text-gray-200 p-4 flex flex-col">
                            {/* Back to previous page button */}
                            <button
                                className="absolute top-4 left-4 text-blue-500 hover:underline text-sm font-bold"
                                onClick={handleBackButtonClick}>
                                Back to previous page
                            </button>
                            <div className="text-center text-xl font-bold mt-12 mb-6">Settings</div>
                            <div className="flex flex-col space-y-2 w-full font-bold">
                                <button
                                    className={buttonClasses('Printer')}
                                    onClick={() => handleButtonClick('Printer', 'Details about the Printer')}>
                                    Printer
                                </button>
                                <button
                                    className={buttonClasses('Office Status')}
                                    onClick={() => handleButtonClick('Office Status', 'Details about the Office status')}>
                                    Office Status
                                </button>
                                <button
                                    className={buttonClasses('General Settings')}
                                    onClick={() => handleButtonClick('General Settings', 'Details about General settings')}>
                                    General
                                </button>
                                <button
                                    className={buttonClasses('Privacy & Security Settings')}
                                    onClick={() => handleButtonClick('Privacy & Security Settings', 'Details about Privacy & Security Settings')}>
                                    Privacy & Security
                                </button>
                                <button
                                    className={buttonClasses('Notification Settings')}
                                    onClick={() => handleButtonClick('Notification Settings', 'Details about Notification settings')}>
                                    Notification
                                </button>
                                <button
                                    className={buttonClasses('Appearance Settings')}
                                    onClick={() => handleButtonClick('Appearance Settings', 'Details about Appearance settings')}>
                                    Appearance
                                </button>
                                <button
                                    className={buttonClasses('Help & Support')}
                                    onClick={() => handleButtonClick('Help & Support', 'Details about Help & Support')}>
                                    Help & Support
                                </button>
                                <button className={buttonClasses('Logout')} onClick={handleLogout}>
                                    <span className="w-full text-red-500">Logout</span>
                                </button>
                            </div>
                        </div>
                        {/* Details Panel */}
                        <div className="flex-1 bg-white text-gray-900 p-8 relative">
                            {selectedSetting
                                ? (
                                    <div>
                                        {!isDesktop && (
                                            <button
                                                className="absolute top-4 left-4 text-blue-500 hover:underline text-xl font-bold"
                                                onClick={handleDetailBackButtonClick}>
                                                <img src={rightArrow} alt="Left Arrow" className="w-4 h-4"/>
                                            </button>
                                        )}
                                        <h1 className="text-2xl font-bold mb-4 mt-8">{selectedSetting.title}</h1>
                                        <p>{selectedSetting.text}</p>
                                    </div>
                                )
                                : (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <svg
                                            className="w-16 h-16 text-gray-400 mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 4v16m8-8H4"/>
                                        </svg>
                                        <h1 className="text-2xl font-bold mb-2">No Setting Selected</h1>
                                        <p className="text-gray-600 mb-4">Please select a setting from the sidebar to view details.</p>
                                        <p className="text-sm text-gray-500">Click on a setting to manage its configuration.</p>
                                    </div>
                                )}
                        </div>

                    </div>
                )
                : (
                    <div className="relative w-full">
                        {/* Mobile Button Menu */}
                        <div
                            className={`fixed inset-0 bg-white p-4 transition-transform transform ${selectedSetting
                            ? '-translate-x-full'
                            : 'translate-x-0'} z-10`}>
                            {/* Back to previous page button for mobile */}
                            <button
                                className="absolute top-4 left-4 text-blue-500 hover:underline text-sm"
                                onClick={handleBackButtonClick}>
                                <img src={leftArrow} alt="Left Arrow" className="w-4 h-4"/>
                            </button>
                            <div className="flex flex-col items-center mt-12 font-bold">
                                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('Printer', 'Details about the Printer')}>
                                    <div className="flex items-center space-x-4">
                                        <img src={printer} alt="Printer Icon" className="w-6 h-6"/>
                                        <span>Printer</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-10 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('Office Status', 'Details about the Office status')}>
                                    <div className="flex items-center space-x-4">
                                        <img src={statusIcon} alt="Office Status Icon" className="w-6 h-6"/>
                                        <span>Office Status</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('General Settings', 'Details about General settings')}>
                                    <div className="flex items-center space-x-4">
                                        <img src={generalSettings} alt="General Settings Icon" className="w-6 h-6"/>
                                        <span>General</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('Privacy & Security Settings', 'Details about Privacy & Security Settings')}>
                                    <div className="flex items-center space-x-4">
                                        <img src={privacyIcon} alt="Privacy Settings Icon" className="w-6 h-6"/>
                                        <span>Privacy & Security</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('Notification Settings', 'Details about Notification settings')}>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={notificationIcon}
                                            alt="Notification Settings Icon"
                                            className="w-6 h-6"/>
                                        <span>Notification</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-10 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('Appearance Settings', 'Details about Appearance settings')}>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={appearanceSettingsIcon}
                                            alt="Appearance Settings Icon"
                                            className="w-6 h-6"/>
                                        <span>Appearance</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2 flex items-center space-x-4 justify-between"
                                    onClick={() => handleButtonClick('Help & Support', 'Details about Help & Support')}>
                                    <div className="flex items-center space-x-4">
                                        <img src={supportIcon} alt="Help & Support Icon" className="w-6 h-6"/>
                                        <span>Help & Support</span>
                                    </div>
                                    <img src={rightArrow} alt="Right Arrow" className="w-4 h-4"/>
                                </button>
                                <button
                                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2 flex items-center space-x-4 justify-between text-red-500"
                                    onClick={handleLogout}>
                                    <div className="flex items-center space-x-4">
                                        <img src={logoutIcon} alt="Logout Icon" className="w-6 h-6"/>
                                        <span>Logout</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/* Mobile Details Panel */}
                        <div
                            className={`fixed inset-0 bg-white p-4 transition-transform transform ${selectedSetting
                            ? 'translate-x-0'
                            : 'translate-x-full'} z-20`}>
                            {selectedSetting
                                ? (
                                    <div>
                                        <button
                                            className="absolute top-4 left-4 text-blue-500 hover:underline text-xl font-bold"
                                            onClick={handleDetailBackButtonClick}>
                                            <img src={leftArrow} alt="Left Arrow" className="w-4 h-4"/>
                                        </button>
                                        <h1 className="text-2xl font-bold mb-4 mt-8">{selectedSetting.title}</h1>
                                        <p>{selectedSetting.text}</p>
                                    </div>
                                )
                                : (
                                    <div className="text-center">
                                        <h1 className="text-2xl font-bold">Select a setting from the menu</h1>
                                    </div>
                                )}
                        </div>
                    </div>
                )}
        </div>
    );
}

export default MyComponent;
