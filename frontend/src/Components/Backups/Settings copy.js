import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';

function MyComponent() {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const [selectedSetting,
        setSelectedSetting] = useState(null);

    // Handle button click
    const handleButtonClick = (title, text) => {
        setSelectedSetting({title, text});
    };

    return (
        <div
            className="relative flex min-h-screen bg-gradient-to-br from-blue-600 to-blue-200">
            {isDesktop
                ? (
                    <div className="flex flex-row w-full">
                        {/* Sidebar */}
                        <div className="w-1/4 bg-white text-gray-900 rounded-lg p-4">
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
                        {/* Details Panel */}
                        <div className="w-3/4 bg-white text-gray-900 rounded-lg p-8">
                            {selectedSetting
                                ? (
                                    <div>
                                        <h1 className="text-2xl font-bold mb-4">{selectedSetting.title}</h1>
                                        <p>{selectedSetting.text}</p>
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                            onClick={() => setSelectedSetting(null)}>
                                            Back
                                        </button>
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
                                onClick={() => setSelectedSetting(null)}>
                                &larr; Back
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
                                        <h1 className="text-2xl font-bold mb-4">{selectedSetting.title}</h1>
                                        <p>{selectedSetting.text}</p>
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                            onClick={() => setSelectedSetting(null)}>
                                            Back
                                        </button>
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
