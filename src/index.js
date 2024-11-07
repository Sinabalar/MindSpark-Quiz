import React from "react";
import reactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {QuizContextProvider} from "./context/QuizContext";


const root = reactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <QuizContextProvider>
            <App/>
        </QuizContextProvider>
    </React.StrictMode>
)
