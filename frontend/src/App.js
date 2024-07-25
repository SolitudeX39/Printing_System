import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import MainPage from './Components/MainPage';
import Printers from './Components/Printers';
import Settings from './Components/Settings';
import ResponsiveLogin from './Components/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={< ResponsiveLogin />}/>
                <Route path="/mainpage" element={< MainPage />}/>
                <Route path="/printers" element={< Printers />}/>
                <Route path="/settings" element={< Settings />}/>
            </Routes>
        </Router>
    );
};

export default App;
