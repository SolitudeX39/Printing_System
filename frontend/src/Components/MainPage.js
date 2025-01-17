import React, {useState, useRef, useEffect, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useMediaQuery} from 'react-responsive';
import printerIcon from "../Assets/printer.png";
import printerIcon2 from "../Assets/printer 2.png";
import refresh from "../Assets/refresh.png";
import sort from "../Assets/sort.png";
import {motion} from "framer-motion";
import {FiMenu} from "react-icons/fi";
import Swal from 'sweetalert2';
import {PrinterContext} from "./PrinterContext";
import endpoint_config from "../env/endpoint";
import axios from 'axios';

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
    const {printers, setPrinters} = useContext(PrinterContext);
    const [open,
        setOpen] = useState(false);
    const [sortOpen,
        setSortOpen] = useState(false);
    const [selectedSort,
        setSelectedSort] = useState("Sort By");
    const [isAdding,
        setIsAdding] = useState(false);
    const [newPrinter,
        setNewPrinter] = useState({name: "", status: "", location: "", lastServiced: ""});
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const dropdownRef = useRef(null);
    const sortDropdownRef = useRef(null);
    const [error,
        setError] = useState(null);
    const [prt_ip,
        setPrt_ip] = useState('');
    const [inputPrtIp,
        setInputPrtIp] = useState('');

    useEffect(() => {
        const fetchPrinters = async() => {
            try {
                // Adjust the API endpoint URL as needed
                const response = await axios.get(`${endpoint_config.api_url}/api/printer-by-ip`);
                setPrinters(response.data);
            } catch (error) {
                console.error('Error fetching printers:', error);
                setError('Failed to fetch printers.');
            }
        };

        fetchPrinters();
    }, [endpoint_config.api_url, setPrinters]);

    // Handle fetching printer data by IP
    const fetchPrinterByIP = async(prt_ip) => {
        try {
            const response = await axios.get(`${endpoint_config.api_url}/api/printer-by-ip`, {
                params: {
                    prt_ip
                } // Use params for GET request query parameters
            });
            console.log('Printer data:', response.data);
            // Handle the fetched printer data
        } catch (error) {
            console.error('Error fetching printer by IP:', error);
            setError('Failed to fetch printer by IP.');
        }
    };

    // Fetch printer data by IP when prt_ip changes
    useEffect(() => {
        if (prt_ip) {
            fetchPrinterByIP(prt_ip);
        }
    }, [prt_ip]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setSortOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open
            ? 'hidden'
            : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const handleLogout = () => {
        setOpen(false);

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
                    navigate('/'); // Update this path as per your routing setup
                }
            });
    };

    const handleSortOptionClick = (option) => {
        setSelectedSort(option);
        setSortOpen(false);
    };

    const handleAddPrinter = async() => {
        try {
            const response = await axios.post(`${endpoint_config.api_url}/api/add-printer`, newPrinter);
            console.log('New printer added:', response.data);
            setPrinters([
                ...printers,
                response.data
            ]);
            setNewPrinter({name: "", status: "", location: "", lastServiced: "", ip: ""});
            setIsAdding(false);
        } catch (error) {
            console.error('Error adding new printer:', error);
            setError('Failed to add new printer.');
        }
    };

    return (
        <div className="flex flex-col w-full bg-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-4 py-4 bg-neutral-100">
                <div
                    className="flex items-center gap-1.5 text-xl font-bold leading-8 text-zinc-900">
                    <img
                        loading="lazy"
                        src={printerIcon}
                        className="shrink-0 w-6 aspect-square"
                        alt="Logo"/>
                    <div>Printer System</div>
                </div>
                <div className="flex items-center">
                    <motion.div
                        animate={open
                        ? "open"
                        : "closed"}
                        className="relative z-10"
                        ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(prev => !prev)}
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

            {/* Content */}
            <div className="flex flex-col px-6 py-6 space-y-6 sm:px-16 sm:py-12">
                <div className="text-xl font-bold leading-8 text-center">Printer Status Dashboard</div>
                <div className="text-base leading-7 text-center">Department</div>

                {/* Filter Buttons */}
                <div className="flex justify-center">
                    <div
                        className="flex gap-3 sm:gap-5 text-sm leading-5 bg-neutral-300 rounded text-zinc-900">
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
                        style={{
                        width: isDesktop
                            ? "500px"
                            : "100%"
                    }}
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Enter printer details"/>
                </div>

                {/* Refresh and Sort */}
                <div className="flex justify-center">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div
                            className="flex items-center gap-1.5 px-3 py-2.5 text-white bg-cyan-500 rounded-md">
                            <img loading="lazy" src={refresh} className="w-5 h-5" alt="Refresh"/>
                            <span>Refresh</span>
                        </div>
                        <motion.div
                            animate={sortOpen
                            ? "open"
                            : "closed"}
                            className="relative"
                            ref={sortDropdownRef}>
                            <button
                                onClick={() => setSortOpen(prev => !prev)}
                                className="flex items-center gap-1.5 px-3 py-2.5 text-white bg-sky-500 rounded-md">
                                <img loading="lazy" src={sort} className="w-5 h-5" alt="Sort"/>
                                <span>{selectedSort}</span>
                            </button>
                            <motion.ul
                                initial={wrapperVariants.closed}
                                animate={sortOpen
                                ? "open"
                                : "closed"}
                                variants={wrapperVariants}
                                style={{
                                originY: "top",
                                translateX: "-50%"
                            }}
                                className={`flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-40 overflow-hidden ${sortOpen
                                ? ''
                                : 'hidden'}`}>
                                <li
                                    onClick={() => handleSortOptionClick('Name')}
                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-200 cursor-pointer">Name</li>
                                <li
                                    onClick={() => handleSortOptionClick('Status')}
                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-200 cursor-pointer">Status</li>
                                <li
                                    onClick={() => handleSortOptionClick('Location')}
                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-200 cursor-pointer">Location</li>
                                <li
                                    onClick={() => handleSortOptionClick('Last Serviced')}
                                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-200 cursor-pointer">Last Serviced</li>
                            </motion.ul>
                        </motion.div>
                    </div>
                </div>

                {/* Printer Cards */}
                <div className="flex overflow-x-auto py-4 gap-6">
                    {printers.map((printer, index) => (
                        <div
                            key={index}
                            className="flex-none w-80 p-4 border border-gray-300 rounded-lg shadow-md">
                            <div className="flex items-center gap-2">
                                <img src={printer.image || printerIcon2} alt="Printer" className="w-12 h-12"/>
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold">{printer.name}</div>
                                    <div>Status: {printer.status}</div>
                                    <div>Location: {printer.location}</div>
                                    <div>Last Serviced: {printer.lastServiced}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Printer Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                        {isAdding
                            ? "Cancel"
                            : "Add New Printer"}
                    </button>
                </div>

                {isAdding && (
                    <div className="flex flex-col items-center space-y-4">
                        <input
                            type="text"
                            value={newPrinter.name}
                            onChange={(e) => setNewPrinter({
                            ...newPrinter,
                            name: e.target.value
                        })}
                            placeholder="Printer Name"
                            className="p-2 border border-gray-300 rounded"/>
                        <input
                            type="text"
                            value={newPrinter.status}
                            onChange={(e) => setNewPrinter({
                            ...newPrinter,
                            status: e.target.value
                        })}
                            placeholder="Status"
                            className="p-2 border border-gray-300 rounded"/>
                        <input
                            type="text"
                            value={newPrinter.location}
                            onChange={(e) => setNewPrinter({
                            ...newPrinter,
                            location: e.target.value
                        })}
                            placeholder="Location"
                            className="p-2 border border-gray-300 rounded"/>
                        <input
                            type="text"
                            value={newPrinter.lastServiced}
                            onChange={(e) => setNewPrinter({
                            ...newPrinter,
                            lastServiced: e.target.value
                        })}
                            placeholder="Last Serviced"
                            className="p-2 border border-gray-300 rounded"/>
                        <input
                            type="text"
                            value={inputPrtIp}
                            onChange={(e) => setInputPrtIp(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            placeholder="Enter Printer IP"/>
                        <button
                            onClick={() => fetchPrinterByIP(inputPrtIp)}
                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                            Fetch Printer
                        </button>
                        <button
                            onClick={handleAddPrinter}
                            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors">
                            Add Printer
                        </button>
                    </div>
                )}
                {error && (
                    <div className="text-red-500">{error}</div>
                )}
            </div>
        </div>
    );
}

export default MainPage;
