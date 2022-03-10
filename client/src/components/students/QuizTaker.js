import { useParams } from "react-router-dom";
import { useContext } from "react";
import { QuizzesContext } from "../../context/Quizzes";
import { UserContext } from "../../context/User";

import Questions from "./Questions";

function QuizTaker({ setTakingQuiz, takingQuiz }) {
    const quizzes = useContext(QuizzesContext).quizzes;
    const userContext = useContext(UserContext);
    const { name } = useParams();

    console.log(quizzes);

    const quiz = quizzes.find(quiz => quiz.name === name);

    function handleSubmitScore(results, score) {
        fetch("/grades", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: userContext.user.id, quiz_id: quiz.id, results: results, score: score})
          })
          .then(resp => resp.json())
          .then(grade => {
            console.log(userContext)
            const updatedGrades = [...userContext.user.grades, grade];
            userContext.setValue({...userContext.user, grades: updatedGrades});
          }) 
    }
    

    if(!quiz) {
        return (
          <div className="flex justify-center items-center mt-20 bg-th-primary w-full h-full">
            <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
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