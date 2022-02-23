import { useParams } from "react-router-dom";
import { useContext } from "react";
import { QuizzesContext } from "../App";

import Questions from "./Questions";

function QuizTaker({ handleSubmitQuiz, setTakingQuiz, takingQuiz }) {
    const quizzes = useContext(QuizzesContext);
    const { name } = useParams();

    const quiz = quizzes.find(quiz => quiz.name === name);

    console.log(quiz);
    console.log("taking a quiz")

    function handleSubmitScore(results, score) {
        handleSubmitQuiz(quiz.id, results, score);
    }


    return (
        <div className="pl-0 flex flex-col pt-10 min-h-screen w-screen items-center pl-72">
            <h1 className="text-2xl text-slate-800 font-bold">{quiz.name}</h1>
            {takingQuiz ? (
                <div className="flex flex-col w-screen items-center">
                    
                    <Questions questions={quiz.questions} onSubmitScore={handleSubmitScore}/> 
                    <button 
                        type="button" 
                        className="w-1/3 mt-1 mb-5 text-white bg-slate-500 rounded hover:bg-slate-600 text-sm px-1 py-1 text-center"
                        onClick={() => setTakingQuiz(false)}>
                            Exit Test 
                    </button>
                </div>
                    

            ) : (
                <button 
                    type="button" 
                    className="justify-end mt-5 mb-5 text-white bg-slate-500 rounded hover:bg-slate-600 text-sm px-5 py-2.5 text-center"
                    onClick={() => setTakingQuiz(true)}>
                        Begin Test
                </button>
            )}
        </div>
    )
}

export default QuizTaker;