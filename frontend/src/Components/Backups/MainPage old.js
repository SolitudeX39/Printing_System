import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import printer from "../Assets/printer.png";
import refresh from "../Assets/refresh.png";
import sort from "../Assets/sort.png";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import Swal from 'sweetalert2';

// Define animation variants
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

function MainPage() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleLogout = () => {
        setOpen(false);

        Swal.fire({
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
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/'); // Update this path as per your routing setup
            }
        });
    };

    return (
        <div className="flex flex-col w-full bg-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 py-4 bg-neutral-100">
                <div className="flex items-center gap-1.5 text-xl font-bold leading-8 text-zinc-900">
                    <img loading="lazy" src={printer} className="shrink-0 w-6 aspect-square" alt="Logo" />
                    <div>Printer System</div>
                </div>
                <div className="flex items-center">
                    <motion.div
                        animate={open ? "open" : "closed"}
                        className="relative z-10"
                        ref={dropdownRef}
                    >
                        <button
                            onClick={() => setOpen((prev) => !prev)}
                            className="flex items-center justify-center p-2 rounded-md text-zinc-900 bg-zinc-300 hover:bg-zinc-400 transition-colors"
                        >
                            <FiMenu className="text-xl" />
                        </button>
                        <motion.ul
                            initial={wrapperVariants.closed}
                            animate={open ? "open" : "closed"}
                            variants={wrapperVariants}
                            style={{ originY: "top", translateX: "-50%" }}
                            className={`flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-20 ${open ? '' : 'hidden'}`}
                        >
                            <li className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/mainpage" className="w-full">🏠 Home</Link>
                            </li>
                            <li className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/printers" className="w-full">🖨️ Printers</Link>
                            </li>
                            <li className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer">
                                <Link to="/settings" className="w-full">⚙️ Settings</Link>
                            </li>
                            <li className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-zinc-100 text-slate-700 hover:text-zinc-900 transition-colors cursor-pointer" onClick={handleLogout}>
                                <span className="w-full">🚪 Logout</span>
                            </li>
                        </motion.ul>
                    </motion.div>
                </div>
            </nav>

            {/* Content */}
            <div className="flex flex-col px-6 py-6 space-y-6 sm:px-16 sm:py-12">
                <div className="text-xl font-bold leading-8 text-center">Printer Status Dashboard</div>
                <div className="text-base leading-7 text-center">Department</div>

                {/* Filter Buttons */}
                <div className="flex justify-center">
                    <div className="flex gap-3 sm:gap-5 text-sm leading-5 bg-neutral-300 rounded text-zinc-900">
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">Critical</button>
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">Warning</button>
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">All</button>
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">Favorite</button>
                    </div>
                </div>

                {/* Input Box */}
                <div className="flex justify-center">
                    <input
                        type="text"
                        style={{ width: isDesktop ? "500px" : "100%" }}
                        className="py-3 bg-white rounded border border-solid border-neutral-300 text-zinc-900 px-3"
                        placeholder="Input text"
                    />
                </div>

                {/* Refresh and Sort */}
                <div className="flex justify-center">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="flex items-center gap-1.5 px-3 py-2.5 text-white bg-cyan-500 rounded-md">
                            <img loading="lazy" src={refresh} className="shrink-0 w-4 aspect-square" alt="Refresh" />
                            <button className="my-auto">Refresh</button>
                        </div>
                        <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded border border-solid bg-black bg-opacity-0 border-neutral-300 text-zinc-900">
                            <img loading="lazy" src={sort} className="shrink-0 w-4 aspect-square" alt="Sort" />
                            <select className="flex-auto outline-none bg-transparent text-sm leading-5">
                                <option value="option1">Sort By Option 1</option>
                                <option value="option2">Sort By Option 2</option>
                                <option value="option3">Sort By Option 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Printer Status */}
                <div className="flex flex-col gap-6 text-center">
                    <div className="text-sm font-bold leading-5 text-zinc-900">Department: [Department Name]</div>
                    <div className="text-sm leading-5">Last Refresh: [Date and Time]</div>

                    {/* Container for Horizontal Scrolling */}
                    <div className="overflow-x-auto">
                        <div className="flex flex-nowrap items-center justify-start space-x-4">
                            {/* Printer Card 1 */}
                            <div className="flex-shrink-0 w-80 p-4 bg-gray-200 rounded-lg shadow-md">
                                <div className="text-sm font-bold leading-5 text-zinc-900">Printer 1</div>
                                <div>Status: Operational</div>
                                <div>Location: 2nd Floor</div>
                                <div className="flex justify-center mt-2">
                                    <div className="px-2 py-1 text-cyan-500 bg-white rounded border border-cyan-500 border-solid">
                                        Last Serviced: 2023-09-15
                                    </div>
                                </div>
                            </div>

                            {/* Printer Card 2 */}
                            <div className="flex-shrink-0 w-80 p-4 bg-gray-200 rounded-lg shadow-md">
                                <div className="text-sm font-bold leading-5 text-zinc-900">Printer 2</div>
                                <div>Status: Out of Ink</div>
                                <div>Location: 1st Floor</div>
                                <div className="flex justify-center mt-2">
                                    <div className="px-2 py-1 text-cyan-500 bg-white rounded border border-cyan-500 border-solid">
                                        Last Serviced: 2023-08-30
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
