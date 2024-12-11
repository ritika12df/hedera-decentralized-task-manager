import React, { useState } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Goals.css'; // Ensure you have styles for the Goals component

const Goals = () => {
    const [userAccountId, setUserAccountId] = useState('');
    const [goalTitle, setGoalTitle] = useState('');
    const [goalList, setGoalList] = useState([]);
    const [isUserAccountSet, setIsUserAccountSet] = useState(false);

    // Handle setting the user account ID
    const handleSetAccountId = () => {
        if (!userAccountId) {
            alert("Please provide a valid account ID.");
            return;
        }
        setIsUserAccountSet(true);
    };

    // Handle adding a new goal
    const handleAddGoal = async () => {
        if (!goalTitle || !userAccountId) {
            alert("Goal title and user account ID are required.");
            return;
        }

        const goalData = { title: goalTitle, userAccountId };

        try {
            const response = await axios.post('https://decentralized-task-manager-1.onrender.com/goals', goalData);
            const createdGoal = response.data.goal;

            setGoalList([...goalList, createdGoal]);
            setGoalTitle(''); // Clear the input field
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    // Handle deleting a goal
    const handleDeleteGoal = async (goalId) => {
        try {
            await axios.delete(`https://decentralized-task-manager-1.onrender.com/goals/${goalId}`);
            setGoalList(goalList.filter((goal) => goal.id !== goalId)); // Remove the deleted goal from the list
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };

    // Handle editing a goal
    const handleEditGoal = async (goalId, newTitle) => {
        try {
            const response = await axios.put(`https://decentralized-task-manager-1.onrender.com/goals/${goalId}`, { title: newTitle });
            const updatedGoal = response.data.goal;
            setGoalList(goalList.map((goal) => (goal.id === goalId ? updatedGoal : goal)));
        } catch (error) {
            console.error("Error editing goal:", error);
        }
    };

    return (
        <div className="goals">
            <h2>Goals</h2>
            {!isUserAccountSet ? (
                <div className="account-form">
                    <input
                        type="text"
                        value={userAccountId}
                        onChange={(e) => setUserAccountId(e.target.value)}
                        placeholder="Enter your hedera account ID"
                    />
                    <button onClick={handleSetAccountId}>Set Account ID</button>
                </div>
            ) : (
                <div className="form">
                    <input
                        type="text"
                        value={goalTitle}
                        onChange={(e) => setGoalTitle(e.target.value)}
                        placeholder="Enter your goal"
                    />
                    <button onClick={handleAddGoal}>Add Goal</button>
                </div>
            )}

            <TransitionGroup className="goal-list">
                {goalList.map((goal) => (
                    <CSSTransition
                        key={goal.id}
                        timeout={500}
                        classNames="goal-item"
                    >
                        <li className="goal-item">
                            <span>{goal.title}</span>
                            <button onClick={() => handleEditGoal(goal.id, prompt("Edit goal title:", goal.title))}>Edit</button>
                            <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default Goals;
