import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
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
                status: 'active'
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
        default:
            throw new Error('Unknown action');
    }
}

export default function App() {
    const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length

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
        <div className={'app'}>
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
                {status === 'active' && (
                    <Question
                        question={questions[index]}
                        dispatch={dispatch}
                        answer={answer}
                        points={points}
                    />
                )}
            </Main>
        </div>

    )
}


