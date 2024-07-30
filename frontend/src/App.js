import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainPage from './Components/MainPage';
import Printers from './Components/Printers';
import Settings from './Components/Settings';
import ResponsiveLogin from './Components/Login';
import { PrinterProvider } from './Components/PrinterContext'; // Adjust path as needed
import ErrorBoundary from './Components/ErrorBoundary.js'; // Adjust path as needed

const App = () => {
    return (
        <PrinterProvider>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<ResponsiveLogin />} />
                        <Route path="/mainpage" element={<MainPage />} />
                        <Route path="/printers" element={<Printers />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Router>
            </ErrorBoundary>
        </PrinterProvider>
    );
};

export default App;
