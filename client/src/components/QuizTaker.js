import { useParams } from "react-router-dom";

import Questions from "./Questions";

function QuizTaker({ quizzes, handleSubmitQuiz, setTakingQuiz, takingQuiz }) {
    const { quiz_name } = useParams();
    

    const quiz = quizzes.find(quiz => quiz.name === quiz_name);

    console.log(quiz);
    console.log("taking a quiz")

    function handleSubmitScore(results, score) {
        handleSubmitQuiz(quiz.id, results, score);
    }


    return (
        <div className="flex flex-col pt-10 min-h-screen w-2/3 items-center pl-72">
            <h1 className="text-2xl text-slate-800 font-bold">{quiz.name}</h1>
            {takingQuiz ? (
                <div className="flex flex-col">
                    
                    <Questions questions={quiz.questions} onSubmitScore={handleSubmitScore}/> 
                    <button 
                        type="button" 
                        className="justify-end mt-1 mb-5 text-white bg-slate-500 rounded hover:bg-slate-600 text-sm px-1 py-1 text-center"
                        onClick={() => setTakingQuiz(false)}>
                            Exit Quiz
                    </button>
                </div>
                    

            ) : (
                <button 
                    type="button" 
                    className="justify-end mt-5 mb-5 text-white bg-slate-500 rounded hover:bg-slate-600 text-sm px-5 py-2.5 text-center"
                    onClick={() => setTakingQuiz(true)}>
                        Begin Quiz
                </button>
            )}
        </div>
    )
}

export default QuizTaker;