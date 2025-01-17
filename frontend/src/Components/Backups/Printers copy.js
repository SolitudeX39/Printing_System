import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import printer from "../Assets/printer.png";
import settingsIcon from "../Assets/setting.png";
import Swal from 'sweetalert2';
import {motion} from "framer-motion";
import {FiMenu} from "react-icons/fi";

function Printers() {
    const [activePrinter,
        setActivePrinter] = React.useState(null);
    const [open,
        setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null); // Ref for dropdown menu
    const navigate = useNavigate(); // Hook to navigate programmatically

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("Clicked outside:", event.target); // Debugging statement
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Clean up the effect
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleSettingsClick = (printerNumber) => {
        setActivePrinter(printerNumber);
        showSettingsAlert(printerNumber);
    };

    const handleCloseOverlay = () => {
        setActivePrinter(null);
    };

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

    const showSettingsAlert = (printerNumber) => {
        Swal.fire({
            title: `Printer ${printerNumber} Settings`,
            html: `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <input id="status-input" class="swal2-input" placeholder="Status" style="width: 100%; margin-bottom: 10px;">
                    <input id="location-input" class="swal2-input" placeholder="Location" style="width: 100%; margin-bottom: 10px;">
                    <input id="ip-input" class="swal2-input" placeholder="IP Address" style="width: 100%; margin-bottom: 10px;">
                    <input id="ink-input" class="swal2-input" placeholder="Ink Level" style="width: 100%; margin-bottom: 10px;">
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            customClass: {
                container: 'swal2-container',
                popup: 'swal2-popup',
                input: 'swal2-input',
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel'
            },
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                const title = document.querySelector('.swal2-title');
                popup.style.maxHeight = '80vh'; // Ensure the modal height adjusts to the viewport
                popup.style.overflow = 'auto'; // Allow internal scrolling if necessary
                title.style.fontSize = '1.5rem'; // Increase font size for better visibility
                title.style.margin = '10px 0'; // Adjust margins for better spacing
            },
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

    // Add this CSS to ensure modal consistency and responsiveness
    const styles = `
        .swal2-popup {
            width: 90%;
            max-width: 400px;
            box-sizing: border-box;
            height: auto;
            max-height: 80vh;
            overflow: auto;
            display: flex;
            flex-direction: column;
        }
        .swal2-html-container {
            overflow: hidden; /* Prevent internal scrolling */
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .swal2-input {
            width: calc(100% - 2rem); /* Adjust width for padding */
            margin-bottom: 10px;
        }
        .swal2-title {
            font-size: 1.5rem; /* Increase font size for better visibility */
            margin: 10px 0; /* Adjust margins for better spacing */
            text-align: center; /* Center align the title */
        }
        .swal2-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 10px; /* Add space above buttons */
            padding: 0 1rem; /* Ensure padding is applied correctly */
        }
        .swal2-confirm, .swal2-cancel {
            min-width: 100px; /* Ensure buttons have enough width */
        }
        body {
            overflow: hidden; /* Prevent scrolling on the body */
        }
        @media only screen and (max-width: 600px) {
            .swal2-popup {
                width: calc(100% - 2rem); /* Adjust width for smaller screens */
                max-height: 90vh; /* Allow for more height on smaller screens */
            }
        }
    `;

    // Append the styles to the document head
    React.useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document
            .head
            .appendChild(styleSheet);

        // Clean up the style element
        return () => {
            document
                .head
                .removeChild(styleSheet);
        };
    }, []);

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
                    <motion.div animate={open
                        ? "open"
                        : "closed"} className="relative z-10" ref={dropdownRef} // Attach the ref to the dropdown menu
                    >
                        <button
                            onClick={() => setOpen((pv) => !pv)}
                            className="flex items-center justify-center p-2 rounded-md text-zinc-900 bg-zinc-300 hover:bg-zinc-400 transition-colors">
                            <FiMenu className="text-xl"/>
                        </button>

                        <motion.ul
                            initial={wrapperVariants.closed}
                            animate={open
                            ? "open"
                            : "closed"}
                            variants={wrapperVariants}
                            style={{
                            originY: "top",
                            translateX: "-50%"
                        }}
                            className={`flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-20 ${open
                            ? ''
                            : 'hidden'}`}>
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/mainpage" className="w-full">🏠 Home</Link>
                            </li>
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/printers" className="w-full">🖨️ Printers</Link>
                            </li>
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/settings" className="w-full">⚙️ Settings</Link>
                            </li>
                            <li
                                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer"
                                onClick={handleLogout}>
                                <span className="w-full">🚪 Logout</span>
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
