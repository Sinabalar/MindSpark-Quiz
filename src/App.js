import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";

const initialState = {
    questions: [],
    status: ''
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
                status:'error'
            }
        default:
            throw new Error('Unknown action');
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);

    useEffect(function () {
        async function fetchQuiz() {
            try {
                const res = await fetch(`http://localhost:8000/questions`);
                const data = await res.json();
                dispatch({type: 'dataReceived', payload: data})
            } catch (e) {
                dispatch({type:'error'})
            }

        }

        fetchQuiz()
    }, [])

    return (
        <div className={'app'}>
            <Header/>
            <Main>
                <p>1/15</p>
                <p>Questions</p>
            </Main>
        </div>

    )
}


