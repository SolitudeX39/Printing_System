// App.js

import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import QRCodeGenerator from './Components/QRGen';

const CallPanel = lazy(() => import ('./Components/Call_Panel'));
const QueueScreen = lazy(() => import ('./Components/Queue_Screen'));
// const QRGen = lazy(() => import ('./Components/QRGen'));
// Preload Online_Queue since it's essential for mobile functionality
const OnlineQueue = lazy(() => import ('./Components/Online_Queue'));

// Preload Online_Queue component
const preloadOnlineQueue = () => import ('./Components/Online_Queue').then(module => module);

function App() {
    // Preload Online_Queue when App component mounts
    React.useEffect(() => {
        preloadOnlineQueue();
    }, []);

    return (
        <Router>
            <Suspense fallback={< div > Loading ...</div>}>
                <Routes>
                    <Route path="/qvs_lc1" element={< CallPanel />}/>
                    <Route path="/qvs_lc1/queuescreen" element={< QueueScreen />}/>
                    {/* <Route path="/qvs_lc1/online" element={< OnlineQueue />}/> */}
                    {/* <Route path="/qvs_lc1/qr" element={< QRCodeGenerator />}/> */}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
