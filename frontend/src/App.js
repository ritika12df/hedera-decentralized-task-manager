import React, { useState } from 'react';
import TaskManager from './components/TaskManager';
import BinauralPage from './components/BinauralPage';
import Goals from './components/Goals'; // Import Goals component
import './App.css';

const App = () => {
    const [currentPage, setCurrentPage] = useState('taskManager');

    const renderPage = () => {
        switch (currentPage) {
            case 'taskManager':
                return <TaskManager />;
            case 'binaural':
                return <BinauralPage />;
            case 'goals':
                return <Goals setCurrentPage={setCurrentPage} />; // Pass setCurrentPage as a prop here
            default:
                return <TaskManager />;
        }
    };

    return (
        <div>
            <h1>Decentralized Task Manager</h1>
            <nav>
                <button onClick={() => setCurrentPage('taskManager')}>Task Manager</button>
                <button onClick={() => setCurrentPage('binaural')}>Binaural Beats</button>
                <button onClick={() => setCurrentPage('goals')}>Goals</button> {/* Button to navigate to Goals */}
            </nav>
            {renderPage()}
        </div>
    );
};

export default App;
