const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { submitTaskAndReward, createToken} = require('./hedheraService');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Allow cookies or Authorization headers
}));

app.use(bodyParser.json());

const goals = []; // This is an in-memory goal storage (can be replaced with a database)

// Route to create a token (one-time setup)
app.post('/create-token', async (req, res) => {
    try {
        const tokenId = await createToken();
        res.status(200).json({ message: "Token created", tokenId });
    } catch (error) {
        console.error("Error creating token:", error);
        res.status(500).json({ message: "Failed to create token" });
    }
});

// Route to submit a task and reward user
app.post('/tasks', async (req, res) => {
    const { taskTitle, userAccountId, status } = req.body;

    try {
        const taskData = { title: taskTitle, status };
        let rewardAmount = 0;

        if (status === 'Completed') {
            const response = await submitTaskAndReward(taskData, userAccountId);
            rewardAmount = response.rewardAmount;
        }

        // Save the task (this can be enhanced to store in a database or in-memory storage)
        console.log(`Task: ${taskTitle} added with status: ${status}`);

        res.json({
            message: "Task created successfully",
            rewardAmount,
            taskData,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to add a goal
app.post('/goals', (req, res) => {
    const { title, userAccountId } = req.body;

    if (!title || !userAccountId) {
        return res.status(400).json({ message: "Goal title and user account ID are required." });
    }

    const newGoal = { title, userAccountId, id: goals.length + 1 };
    goals.push(newGoal);

    res.status(201).json({ message: "Goal created successfully", goal: newGoal });
});

// Route to edit a goal (PUT)
app.put('/goals/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const goalIndex = goals.findIndex(goal => goal.id === parseInt(id));

    if (goalIndex === -1) {
        return res.status(404).json({ message: "Goal not found." });
    }

    if (!title) {
        return res.status(400).json({ message: "Goal title is required." });
    }

    goals[goalIndex].title = title;

    res.status(200).json({ message: "Goal updated successfully", goal: goals[goalIndex] });
});

// Route to delete a goal (DELETE)
app.delete('/goals/:id', (req, res) => {
    const { id } = req.params;

    const goalIndex = goals.findIndex(goal => goal.id === parseInt(id));

    if (goalIndex === -1) {
        return res.status(404).json({ message: "Goal not found." });
    }

    goals.splice(goalIndex, 1); // Remove the goal from the list

    res.status(200).json({ message: "Goal deleted successfully" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
