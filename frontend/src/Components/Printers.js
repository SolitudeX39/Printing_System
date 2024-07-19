import * as React from "react";
import {Link} from "react-router-dom";
import printer from "../Assets/printer.png";
import settingsIcon from "../Assets/setting.png";

function Printers() {
    // State to manage which printer's overlay is active
    const [activePrinter,
        setActivePrinter] = React.useState(null);

    // Function to handle clicking on the settings icon
    const handleSettingsClick = (printerNumber) => {
        setActivePrinter(printerNumber);
    };

    // Function to close the overlay
    const handleCloseOverlay = () => {
        setActivePrinter(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 py-4 bg-neutral-100">
                <div
                    className="flex items-center gap-1.5 text-xl font-bold leading-8 text-zinc-900">
                    <img
                        loading="lazy"
                        src={printer}
                        className="shrink-0 self-start aspect-square w-6"
                        alt="Logo"/>
                    <div>Printer System</div>
                </div>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="px-4 py-2 text-sm leading-6 whitespace-nowrap rounded-2xl bg-zinc-300">
                        Home
                    </Link>
                    <Link
                        to="/printers"
                        className="px-4 py-2 text-sm leading-6 whitespace-nowrap rounded-2xl bg-zinc-300">
                        Printers
                    </Link>
                    <Link
                        to="/settings"
                        className="px-4 py-2 text-sm leading-6 whitespace-nowrap rounded-2xl bg-zinc-300">
                        Settings
                    </Link>
                    {/* Add other pages as needed */}
                </div>
            </nav>

            {/* Printer components */}
            <div className="flex flex-col items-center mt-7 space-y-4 flex-1 px-4 sm:px-8">
                {/* Printer 1 */}
                <div className="relative bg-gray-200 w-full max-w-lg rounded-lg shadow-lg">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-zinc-900">Printer 1</div>
                            <button
                                onClick={() => handleSettingsClick(1)}
                                className="text-gray-500 hover:text-gray-900 focus:outline-none">
                                <img loading="lazy" src={settingsIcon} className="h-6 w-6" alt="Settings"/>
                            </button>
                        </div>
                        <div className="mt-3 text-base">Status: Online</div>
                        <div className="mt-2.5 text-sm">Location: Office 1</div>
                        <div className="mt-1.5 text-xs">IP: 192.168.1.1</div>
                        <div className="mt-4 text-sm font-bold">Ink Level: 62%</div>
                    </div>
                </div>

                {/* Printer 2 */}
                <div className="relative bg-gray-200 w-full max-w-lg rounded-lg shadow-lg">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-zinc-900">Printer 2</div>
                            <button
                                onClick={() => handleSettingsClick(2)}
                                className="text-gray-500 hover:text-gray-900 focus:outline-none">
                                <img loading="lazy" src={settingsIcon} className="h-6 w-6" alt="Settings"/>
                            </button>
                        </div>
                        <div className="mt-3 text-base">Status: Offline</div>
                        <div className="mt-2.5 text-sm">Location: Office 2</div>
                        <div className="mt-1.5 text-xs">IP: 192.168.1.2</div>
                        <div className="mt-4 text-sm font-bold">Ink Level: 50%</div>
                    </div>
                </div>

                {/* Printer 3 */}
                <div className="relative bg-gray-200 w-full max-w-lg rounded-lg shadow-lg">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-bold text-zinc-900">Printer 3</div>
                            <button
                                onClick={() => handleSettingsClick(3)}
                                className="text-gray-500 hover:text-gray-900 focus:outline-none">
                                <img loading="lazy" src={settingsIcon} className="h-6 w-6" alt="Settings"/>
                            </button>
                        </div>
                        <div className="mt-3 text-base">Status: Maintenance</div>
                        <div className="mt-2.5 text-sm">Location: Office 3</div>
                        <div className="mt-1.5 text-xs">IP: 192.168.1.3</div>
                        <div className="mt-4 text-sm font-bold">Ink Level: 23%</div>
                    </div>
                </div>

                {/* Overlay for Settings */}
                {activePrinter && (
                    <div
                        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
                        onClick={handleCloseOverlay}>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="text-xl font-bold text-zinc-900">
                                Printer {activePrinter}
                                Settings
                            </div>
                            {/* Additional settings or details can be added here */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Printers;
