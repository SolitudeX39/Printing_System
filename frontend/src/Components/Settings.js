import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';

function MyComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const [selectedSetting,
        setSelectedSetting] = useState(null);
    const [previousPage,
        setPreviousPage] = useState(null);

    useEffect(() => {
        // Store the previous page before setting new one
        if (location.state && location.state.from) {
            setPreviousPage(location.state.from);
        }
    }, [location]);

    // Handle button click
    const handleButtonClick = (title, text) => {
        setSelectedSetting({title, text});
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
    };

    return (
        <div
            className="relative flex min-h-screen bg-gradient-to-br from-blue-600 to-blue-200">
            {isDesktop
                ? (
                    <div className="flex flex-row w-full">
                        {/* Sidebar */}
                        <div className="w-64 bg-gray-900 text-gray-200 p-4 flex flex-col">
                            <button
                                className="absolute top-4 left-4 text-blue-500 hover:underline text-sm font-bold"
                                onClick={handleBackButtonClick}>
                                &larr; Back
                            </button>
                            <div className="text-center text-xl font-bold mt-12 mb-6">
                                Settings
                            </div>
                            <div className="flex flex-col space-y-2 w-full font-bold">
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Printer', 'Details about the Printer')}>
                                    Printer
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Office Status', 'Details about the Office status')}>
                                    Office Status
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('General Settings', 'Details about General settings')}>
                                    General Settings
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Privacy Settings', 'Details about Privacy settings')}>
                                    Privacy Settings
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Notification Settings', 'Details about Notification settings')}>
                                    Notification Settings
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Appearance Settings', 'Details about Appearance settings')}>
                                    Appearance Settings
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Help & Support', 'Details about Help & Support')}>
                                    Help & Support
                                </button>
                                <button
                                    className="py-2 text-left text-sm"
                                    onClick={() => handleButtonClick('Sign Out', 'Details about Sign out')}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                        {/* Details Panel */}
                        <div className="flex-1 bg-white text-gray-900 p-8 relative">
                            {selectedSetting
                                ? (
                                    <div>
                                        {isDesktop
                                            ? null
                                            : (
                                                <button
                                                    className="absolute top-4 left-4 text-blue-500 hover:underline text-xl font-bold"
                                                    onClick={handleDetailBackButtonClick}>
                                                    &lt;
                                                </button>
                                            )}
                                        <h1 className="text-2xl font-bold mb-4 mt-8">{selectedSetting.title}</h1>
                                        <p>{selectedSetting.text}</p>
                                    </div>
                                )
                                : (
                                    <div className="text-center">
                                        <h1 className="text-2xl font-bold">Select a setting from the sidebar</h1>
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
                            <button
                                className="absolute top-4 left-4 text-blue-500 hover:underline text-sm"
                                onClick={handleBackButtonClick}>
                                &larr; Back to previous page
                            </button>
                            <div className="flex flex-col items-center mt-12">
                                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Printer', 'Details about the Printer')}>
                                    Printer
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Office Status', 'Details about the Office status')}>
                                    Office Status
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('General Settings', 'Details about General settings')}>
                                    General Settings
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Privacy Settings', 'Details about Privacy settings')}>
                                    Privacy Settings
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Notification Settings', 'Details about Notification settings')}>
                                    Notification Settings
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Appearance Settings', 'Details about Appearance settings')}>
                                    Appearance Settings
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Help & Support', 'Details about Help & Support')}>
                                    Help & Support
                                </button>
                                <button
                                    className="block px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm mb-2"
                                    onClick={() => handleButtonClick('Sign Out', 'Details about Sign out')}>
                                    Sign Out
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
                                            &lt;
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
