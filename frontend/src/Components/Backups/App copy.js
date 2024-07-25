import React from 'react';
import {useMediaQuery} from 'react-responsive';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import MobileLogin from './Components/MobileLogin';
import DesktopLogin from './Components/DesktopLogin';
import MainPage from './Components/MainPage';
import Printers from './Components/Printers'; // Import Printers component

function App() {
    const isMobile = useMediaQuery({maxWidth: 767});

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    {isMobile
                        ? <MobileRoutes/>
                        : <DesktopRoutes/>}
                </header>
            </div>
        </Router>
    );
}

const MobileRoutes = () => (
    <Routes>
        <Route path="/" element={< MobileLogin />}/>
        <Route path="/mainpage" element={< MainPage />}/>
        <Route path="/printers" element={< Printers />}/> {/* Add Printers route */}
    </Routes>
);

const DesktopRoutes = () => (
    <Routes>
        <Route path="/" element={< DesktopLogin />}/>
        <Route path="/mainpage" element={< MainPage />}/>
        <Route path="/printers" element={< Printers />}/> {/* Add Printers route */}
    </Routes>
);

export default App;
