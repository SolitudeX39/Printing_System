import React, {useState, useContext, useRef, useEffect} from "react";
import Swal from 'sweetalert2';
import {Link, useNavigate} from "react-router-dom";
import printer from "../Assets/printer.png";
import {motion} from "framer-motion";
import {FiMenu} from "react-icons/fi";
import {PrinterContext} from "./PrinterContext"; // Import context

function Printers() {
    const {printers, setPrinters} = useContext(PrinterContext);
    const [isEditing,
        setIsEditing] = useState(null);
    const [updatedPrinter,
        setUpdatedPrinter] = useState(null);
    const [open,
        setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleEditClick = (index) => {
        setIsEditing(index);
        setUpdatedPrinter({
            ...printers[index]
        });
    };

    const handleSaveClick = () => {
        const updatedPrinters = printers.map((printer, index) => index === isEditing
            ? updatedPrinter
            : printer);
        setPrinters(updatedPrinters);
        setIsEditing(null);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUpdatedPrinter({
            ...updatedPrinter,
            [name]: value
        });
    };

    const handleDeleteClick = (index) => {
        Swal
            .fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const filteredPrinters = printers.filter((_, i) => i !== index);
                    setPrinters(filteredPrinters);
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                }
            });
    };

    const handleLogout = () => {
        Swal
            .fire({
            title: 'Are you sure you want to logout?',
            text: "You will be redirected to the login page.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    navigate('/'); // Update this path as per your routing setup
                }
            });
    };

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
                        className="relative z-10"
                        ref={dropdownRef}>
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

            <div className="flex flex-col p-6 space-y-6 bg-white">
                <div className="text-xl font-bold leading-8 text-center">Printers</div>
                <div className="flex flex-col space-y-4">
                    {printers.map((printer, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-md">
                            <div className="flex items-center gap-2">
                                <img src={printer.image || printer} alt="Printer" className="w-12 h-12"/>
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold">{printer.name}</div>
                                    <div>Status: {printer.status}</div>
                                    <div>Location: {printer.location}</div>
                                    <div>Last Serviced: {printer.lastServiced}</div>
                                </div>
                            </div>
                            {isEditing === index
                                ? (
                                    <div className="flex flex-col mt-4 gap-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={updatedPrinter.name}
                                            onChange={handleChange}
                                            placeholder="Name"
                                            className="px-3 py-2 border border-gray-300 rounded-md"/>
                                        <input
                                            type="text"
                                            name="status"
                                            value={updatedPrinter.status}
                                            onChange={handleChange}
                                            placeholder="Status"
                                            className="px-3 py-2 border border-gray-300 rounded-md"/>
                                        <input
                                            type="text"
                                            name="location"
                                            value={updatedPrinter.location}
                                            onChange={handleChange}
                                            placeholder="Location"
                                            className="px-3 py-2 border border-gray-300 rounded-md"/>
                                        <input
                                            type="date"
                                            name="lastServiced"
                                            value={updatedPrinter.lastServiced}
                                            onChange={handleChange}
                                            className="px-3 py-2 border border-gray-300 rounded-md"/>
                                        <button
                                            onClick={handleSaveClick}
                                            className="px-4 py-2.5 text-white bg-green-500 rounded-md">
                                            Save
                                        </button>
                                    </div>
                                )
                                : (
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleEditClick(index)}
                                            className="px-4 py-2.5 text-white bg-blue-500 rounded-md">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(index)}
                                            className="px-4 py-2.5 text-white bg-red-500 rounded-md">
                                            Delete
                                        </button>
                                    </div>
                                )}
                        </div>
                    ))}
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
