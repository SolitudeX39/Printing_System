import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const PrinterContext = createContext();

// Create Context Provider
export const PrinterProvider = ({ children }) => {
    const [printers, setPrinters] = useState([]);

    useEffect(() => {
        // Load printers from localStorage when the component mounts
        const savedPrinters = JSON.parse(localStorage.getItem('printers')) || [];
        setPrinters(savedPrinters);
    }, []);

    useEffect(() => {
        // Save printers to localStorage whenever it changes
        localStorage.setItem('printers', JSON.stringify(printers));
    }, [printers]);

    return (
        <PrinterContext.Provider value={{ printers, setPrinters }}>
            {children}
        </PrinterContext.Provider>
    );
};
