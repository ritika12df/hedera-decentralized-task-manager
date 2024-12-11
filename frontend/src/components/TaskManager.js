import React, { useState } from 'react';
import axios from 'axios';
import './TaskManager.css'; // Import the updated CSS

const TaskManager = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [status, setStatus] = useState('Pending');
    const [userAccountId, setUserAccountId] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [rewardTokens, setRewardTokens] = useState(0);
    const [theme, setTheme] = useState('light');
   
    
    const handleAddTask = async () => {
        if (!taskTitle || !userAccountId) {
            alert("Task title and user account ID are required.");
            return;
        }

        const taskData = { title: taskTitle, status, userAccountId };

        try {
            const response = await axios.post('https://decentralized-task-manager-1.onrender.com/tasks', taskData);

            // Log the response to check the structure
            console.log("Response from backend:", response.data);

            const { rewardAmount, taskData: createdTask } = response.data;

            // Ensure `createdTask` maps correctly to backend response fields
            const newTask = {
                title: createdTask?.title || taskData.title, // Use backend field or fallback to input
                status: createdTask?.status || taskData.status, // Use backend field or fallback to input
            };

            setTaskList([...taskList, newTask]);

            // Only update reward tokens for "Completed" status
            if (status === 'Completed') {
                setRewardTokens(rewardTokens + (rewardAmount || 0));
            }

            // Clear input fields
            setTaskTitle('');
            setUserAccountId('');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    return (
        <div className={`task-manager ${theme}`}>
            <h2>Task Manager</h2>
            <button className="theme-toggle" onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            <div className="form">
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <input
                    type="text"
                    value={userAccountId}
                    onChange={(e) => setUserAccountId(e.target.value)}
                    placeholder="Enter your Hedera account ID"
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <h3>Rewards Earned: {rewardTokens} RS Tokens</h3>
            <ul className="task-list">
                {taskList.map((task, index) => (
                    <li key={index}>
                        {task.title} - <span className={task.status.toLowerCase()}>{task.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default TaskManager;
