import {createContext, useContext, useEffect, useReducer} from "react";
import Error from "../components/Error";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: 10,
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'

            }
        case 'error':
            return {
                ...state,
                status: 'error'
            }
        case 'start':
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
            }
        case 'newAnswer':
            const currentQuestion = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === currentQuestion.correctOption
                    ? state.points + currentQuestion.points
                    : state.points,

            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,

            }
        case'finished':
            return {
                ...state,
                status: 'finished',
                highScore: state.points > state.highScore
                    ? state.points
                    : state.highScore
            }
        case'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
                highScore: state.highScore
            }
        case'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0
                    ? 'finished'
                    : state.status
            }

        default:
            throw new Error('Unknown action');
    }
}

function QuizContextProvider({children}) {

    const [{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining
    }, dispatch] = useReducer(reducer, initialState);


    const numQuestions = questions.length;
    const maxPossiblePoints = Array.from(questions.map(el => el.points)).reduce((acc, cur) => acc + cur, 0);
    const question = questions[index]

    useEffect(function () {
        async function fetchQuiz() {
            try {
                const res = await fetch(`http://localhost:8000/questions`);
                const data = await res.json();
                dispatch({type: 'dataReceived', payload: data})
            } catch (e) {
                dispatch({type: 'error'})
            }

        }

        fetchQuiz()
    }, [])


    return (
        <QuizContext.Provider value={{
            questions,
            question,
            status,
            index,
            answer,
            points,
            highScore,
            secondsRemaining,
            numQuestions,
            maxPossiblePoints,
            dispatch
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuizContext() {
    if (useContext(QuizContext) === undefined) throw new Error('AuthContext created out side of contextProvider');
    return (useContext(QuizContext))
}

export {QuizContextProvider, useQuizContext}