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
import {useQuizContext} from "../context/QuizContext";




export default function App() {
    const{status,questions}=useQuizContext()

    return (
        <div className={'app'}>
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen/>}
                {status === 'active' && (
                    <>
                        <Progress/>
                        <Question/>
                        <Footer>
                            <NextBtn
                            >Next
                            </NextBtn>
                            <Timer/>
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <>
                        <FinishedScreen/>
                        <RestartBtn/>
                    </>
                )}
            </Main>
        </div>

    )
}
