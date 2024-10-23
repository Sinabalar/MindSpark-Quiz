import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextBtn from "./NextBtn";
import Progress from "./Progress"
import FinishedScreen from "./FinishedScreen";
import RestartBtn from "./RestartBtn";
import Footer from "./Footer";
import Timer from "./Timer";


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

export default function App() {
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
    const maxPossiblePoints = Array.from(questions.map(el => el.points)).reduce((acc, cur) => acc + cur, 0)

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
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            answer={answer}
                            pointsSum={maxPossiblePoints}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <NextBtn
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            >Next
                            </NextBtn>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <>
                        <FinishedScreen
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            highScore={highScore}
                        />
                        <RestartBtn dispatch={dispatch}/>
                    </>
                )}
            </Main>
        </div>

    )
}
