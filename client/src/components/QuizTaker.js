import { useParams } from "react-router-dom";
import { useContext } from "react";
import { QuizzesContext } from "../App";

import Questions from "./Questions";

function QuizTaker({ handleSubmitQuiz, setTakingQuiz, takingQuiz }) {
    const quizzes = useContext(QuizzesContext);
    const { name } = useParams();

    const quiz = quizzes.find(quiz => quiz.name === name);

    function handleSubmitScore(results, score) {
        handleSubmitQuiz(quiz.id, results, score);
    }


    return (
        <div className="flex flex-col w-full pt-10 items-center">
            <h1 className="text-4xl text-th-title-text font-bold">{quiz.name}</h1>
            {takingQuiz ? (
                <div className="flex flex-col w-screen items-center">
                    
                    <Questions questions={quiz.questions} onSubmitScore={handleSubmitScore}/> 
                    <button 
                        type="button" 
                        className="w-1/3 mt-1 mb-5 py-2 text-th-light-text bg-th-button rounded hover:bg-th-secondary text-md px-1 text-center"
                        onClick={() => setTakingQuiz(false)}>
                            Exit Test 
                    </button>
                </div>
                    

            ) : (
                <div className="flex flex-col mt-10">
                    <p>This test has {quiz.questions.length} questions. When you are ready to begin click the button below.</p>
                    <button 
                        type="button" 
                        className="justify-end mt-5 mb-5 text-th-light-text bg-th-button rounded hover:bg-th-secondary text-md font-semibold px-5 py-2.5 text-center"
                        onClick={() => setTakingQuiz(true)}>
                            Begin Test
                    </button>
                </div>
                
            )}
        </div>
    )
}

export default QuizTaker;