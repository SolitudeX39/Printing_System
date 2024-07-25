import * as React from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

function MyComponent() {
    const navigate = useNavigate();

    // Function to show Swal alert for each button
    const showAlert = (title, text) => {
        Swal.fire({title: title, text: text, icon: 'info', confirmButtonText: 'OK'});
    };

    return (
        <div
            className="relative flex flex-col px-4 py-6 mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-lg leading-7 bg-white text-gray-900 rounded-lg">
            {/* Back Button */}
            <button
                className="absolute top-4 left-4 text-blue-500 hover:underline text-sm md:text-base z-10"
                onClick={() => navigate(-1)}>
                &larr; Back
            </button>

            {/* Title */}
            <div className="flex justify-center mt-12">
                <span className="text-xl font-bold">Printer System</span>
            </div>

            {/* Content */}
            <div className="mt-8 space-y-4">
                <button
                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base"
                    onClick={() => showAlert('Printer', 'Details about the Printer')}>
                    Printer
                </button>
                <button
                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base"
                    onClick={() => showAlert('Office Status', 'Details about the Office status')}>
                    Office status
                </button>
                <div className="space-y-3 mt-6">
                    <button
                        className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base"
                        onClick={() => showAlert('General Settings', 'Details about General settings')}>
                        General settings
                    </button>
                    <button
                        className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base"
                        onClick={() => showAlert('Privacy Settings', 'Details about Privacy settings')}>
                        Privacy settings
                    </button>
                    <button
                        className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base"
                        onClick={() => showAlert('Notification Settings', 'Details about Notification settings')}>
                        Notification settings
                    </button>
                    <button
                        className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base"
                        onClick={() => showAlert('Appearance Settings', 'Details about Appearance settings')}>
                        Appearance settings
                    </button>
                </div>
                <button
                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base mt-6"
                    onClick={() => showAlert('Help & Support', 'Details about Help & Support')}>
                    Help & Support
                </button>
                <button
                    className="px-4 py-3 bg-gray-100 rounded-lg w-full text-left text-sm md:text-base mt-3"
                    onClick={() => showAlert('Sign Out', 'Details about Sign out')}>
                    Sign out
                </button>
            </div>
        </div>
    );
}

export default MyComponent;
