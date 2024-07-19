import * as React from "react";
import {Link} from "react-router-dom";
import printer from "../Assets/printer.png";
import settingsIcon from "../Assets/setting.png";
import Swal from 'sweetalert2';
import {motion} from "framer-motion";
import {FiMenu} from "react-icons/fi"; // Make sure this import is correct

function Printers() {
    const [activePrinter,
        setActivePrinter] = React.useState(null);
    const [open,
        setOpen] = React.useState(false);

    const handleSettingsClick = (printerNumber) => {
        setActivePrinter(printerNumber);
        showSettingsAlert(printerNumber);
    };

    const handleCloseOverlay = () => {
        setActivePrinter(null);
    };

    const showSettingsAlert = (printerNumber) => {
        Swal.fire({
            title: `Printer ${printerNumber} Settings`,
            html: `
                <input id="status-input" class="swal2-input" placeholder="Status">
                <input id="location-input" class="swal2-input" placeholder="Location">
                <input id="ip-input" class="swal2-input" placeholder="IP Address">
                <input id="ink-input" class="swal2-input" placeholder="Ink Level">
            `,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const status = document
                    .getElementById('status-input')
                    .value;
                const location = document
                    .getElementById('location-input')
                    .value;
                const ip = document
                    .getElementById('ip-input')
                    .value;
                const ink = document
                    .getElementById('ink-input')
                    .value;
                // Handle saving the changes here (e.g., update state or make API calls)
                console.log('Status:', status);
                console.log('Location:', location);
                console.log('IP Address:', ip);
                console.log('Ink Level:', ink);
            }
        }).then((result) => {
            if (result.isConfirmed) {
                handleCloseOverlay(); // Close overlay if confirmed
            }
        });
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
                <div className="flex items-center">
                    <motion.div
                        animate={open
                        ? "open"
                        : "closed"}
                        className="relative z-10">
                        <button
                            onClick={() => setOpen((pv) => !pv)}
                            className="flex items-center justify-center p-2 rounded-md text-zinc-900 bg-zinc-300 hover:bg-zinc-400 transition-colors">
                            <FiMenu className="text-xl"/>
                        </button>

                        <motion.ul
                            initial={wrapperVariants.closed}
                            variants={wrapperVariants}
                            style={{
                            originY: "top",
                            translateX: "-50%"
                        }}
                            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-20">
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/" className="w-full">Home</Link>
                            </li>
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/printers" className="w-full">Printers</Link>
                            </li>
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/settings" className="w-full">Settings</Link>
                            </li>
                        </motion.ul>
                    </motion.div>
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
            </div>
        </div>
    );
}

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1
        }
    }
};

export default Printers;
