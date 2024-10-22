# MindSpark Quiz App

This is a React application that presents a quiz to users. The application fetches quiz questions from a server and
manages state using the `useReducer` hook for better performance and maintainability.

## Features

- Fetches quiz questions from a local server
- Manages state using `useReducer`
- Timer for each question
- Track points and high scores
- Allows quiz restart

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
2. Clone the repository:
   ```bash
   npm install
   # or
   yarn install
3. Start the API server:
   ```bash
   npm run server
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start

### Usage

- Open your browser and navigate to http://localhost:3000 to view the app.

- The app will fetch quiz questions from the local server and display them.

- The API can be accessed at http://localhost:8000/questions.
