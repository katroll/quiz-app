import { useState } from "react";
import { useParams } from "react-router-dom";

import Questions from "./Questions";

function QuizTaker({ quizzes, handleSubmitQuiz }) {
    const { quiz_name } = useParams();
    const [takingQuiz, setTakingQuiz] = useState(false);

    const quiz = quizzes.find(quiz => quiz.name === quiz_name);

    console.log(quiz);
    console.log("taking a quiz")

    function handleSubmitScore(score) {
        handleSubmitQuiz(quiz.id, score);
    }


    return (
        <div className="flex flex-col pt-10 items-center min-h-screen w-full pl-72">
            <h1 className="text-2xl text-sky-600 font-bold">{quiz.name}</h1>
            {takingQuiz ? (
                    <Questions questions={quiz.questions} onSubmitScore={handleSubmitScore}/> 
            ) : (
                <button 
                    type="button" 
                    className="mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => setTakingQuiz(true)}>
                        Begin Quiz
                </button>
            )}
        </div>
    )
}

export default QuizTaker;