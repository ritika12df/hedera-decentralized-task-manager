## Decentralized Task Manager with Hedera Blockchain

This project is a decentralized task manager that integrates the Hedera blockchain to reward users with tokens upon completing tasks. It allows users to create tasks, set goals, play binaural beats for enhanced focus, and earn RS tokens as rewards for their progress.

## Features

- Token Creation: Create and manage RS tokens on the Hedera testnet.

- Task Management: Add, edit, and delete tasks while tracking their status.

- Goal Setting: Set and manage personal goals with a Hedera account ID.

- Binaural Beats: Listen to binaural beats for focus, relaxation, creativity, or deep sleep, while tracking listening time and earning rewards.

- Rewards System: Earn RS tokens for task completion, goal achievement, and listening to binaural beats.

 ## Prerequisites

Before running this project locally , make sure you have the following:

- Node.js installed

- Hedera Testnet account for creating and managing tokens

  ## Setup
  
1. Install dependencies
   
Clone this repository and navigate to the frontend directory. This command is required for backend as well . Then, install the necessary dependencies:

```bash
npm install
```

2. Set up environment variables
   
   
Create a .env file in backend directory and add the following variables:


- HEDERA_ACCOUNT_ID = Your Hedera Account ID

- HEDERA_PRIVATE_KEY = Your Hedera Private Key

- HEDERA_TESTNET=true


These values are required to interact with the Hedera network.


3. Start the backend
   
The backend is built using JavaScript and the Hedera SDK to interact with the Hedera blockchain. To start the backend, use:
```bash
node server.js
```

4. Start the frontend
   
To run the React application, use:
```bash
npm start
```
This will start the frontend on http://localhost:3000.

## Key Components
1. Backend (Hedera Integration)
   
- Token Creation: The backend allows the creation of RS tokens on the Hedera testnet. These tokens are used as rewards for task completion and goal achievement.

- Task Management: The backend handles the creation, editing, and deletion of tasks.

- Topic Management: Users can submit tasks via Hedera topics, making tasks decentralized.

- Reward System: The backend manages the token transfer when a task is completed or a goal is achieved.

2. Frontend (React Application)

- TaskManager: Users can add tasks, set their status (Pending, In Progress, Completed), and track progress.

- Goals: Users can add and delete personal goals, keeping track of their achievements.

- Binaural Beats: The frontend allows users to select and listen to binaural beats, tracking the listening time for rewards.

- Theming: Users can toggle between light and dark modes.

## Technologies Used

- Frontend: React.js

- Backend: Node.js, Hedera SDK

- Blockchain: Hedera Testnet

- Binaural Beats: Custom audio files for focus, relaxation, sleep, and creativity

- CSS: For styling and theming the frontend

## Usage


# Creating Tasks

Enter a task title and your Hedera account ID.

Select the status of the task (Pending, In Progress, Completed).

Add the task to your task list.

# Earning Tokens

When a task is marked as "Completed", RS tokens are awarded.

Listening to binaural beats for focused periods also rewards tokens.

# Setting Goals

Users can set and manage personal goals, with rewards for achievement.

# Listening to Binaural Beats

Play one of the four available binaural beats for enhanced focus or relaxation. Track the listening time for rewards.

## Future Enhancements

Integrating more complex goal tracking systems

Allowing users to exchange RS tokens with other users

Implementing advanced task categorization and prioritization
