import React from "react";
import {Link} from "react-router-dom";
import printer from "../Assets/printer.png";
import refresh from "../Assets/refresh.png";
import sort from "../Assets/sort.png";

function MainPage() {
    return (
        <div className="flex flex-col w-full bg-white">
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
                        className="px-4 py-2 text-sm leading-6 whitespace-nowrap rounded-2xl bg-zinc-300">Home</Link>
                    <Link
                        to="/printers"
                        className="px-4 py-2 text-sm leading-6 whitespace-nowrap rounded-2xl bg-zinc-300">Printers</Link>
                </div>
            </nav>

            {/* Content */}
            <div className="flex flex-col px-6 py-6 space-y-6 sm:px-16 sm:py-12">
                <div className="text-xl font-bold leading-8 text-center">Printer Status Dashboard</div>
                <div className="text-base leading-7 text-center">Department</div>

                {/* Filter Buttons */}
                <div className="flex justify-center">
                    <div
                        className="flex justify-center gap-3 sm:gap-5 text-sm leading-5 bg-neutral-300 rounded text-zinc-900">
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">Critical</button>
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">Warning</button>
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">All</button>
                        <button className="px-3 py-2.5 rounded focus:outline-none focus:bg-gray-200">Favorite</button>
                    </div>
                </div>

                {/* Input Box */}
                <div className="flex justify-center">
                    <input type="text" style={{
                        width: "500px"
                    }} // Adjust the width value as needed
                        className="py-3 bg-white rounded border border-solid border-neutral-300 text-zinc-900 px-3" placeholder="Input text"/>
                </div>

                {/* Refresh and Sort */}
                <div className="flex justify-center">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div
                            className="flex items-center gap-1.5 px-3 py-2.5 text-white whitespace-nowrap bg-cyan-500 rounded-md">
                            <img
                                loading="lazy"
                                src={refresh}
                                className="shrink-0 w-4 aspect-square"
                                alt=""/>
                            <button className="my-auto">Refresh</button>
                        </div>
                        <div
                            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded border border-solid bg-black bg-opacity-0 border-neutral-300 text-zinc-900">
                            <img loading="lazy" src={sort} className="shrink-0 w-4 aspect-square" alt=""/>
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
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3 p-3 bg-white rounded">
                            <div className="text-sm font-bold leading-5 text-zinc-900">Printer A</div>
                            <div>Status: Operational</div>
                            <div>Location: 2nd Floor</div>
                            <div className="flex justify-center">
                                <div
                                    className="px-2 py-1 text-cyan-500 bg-white rounded border border-cyan-500 border-solid">
                                    Last Serviced: 2023-09-15
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-3 bg-white rounded">
                            <div className="text-sm font-bold leading-5 text-zinc-900">Printer B</div>
                            <div>Status: Out of Ink</div>
                            <div>Location: 1st Floor</div>
                            <div className="flex justify-center">
                                <div
                                    className="px-2 py-1 text-cyan-500 bg-white rounded border border-cyan-500 border-solid">
                                    Last Serviced: 2023-08-30
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
