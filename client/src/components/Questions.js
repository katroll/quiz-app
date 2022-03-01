import { useState } from "react";
import QuizViewer from "./QuizViewer";

function Questions( { questions, onSubmitScore }) {
    let [questionNumber, setQuestionNumber] = useState(0);
    let [score, setScore] = useState(0);
    const [results, setResults] = useState([]);
    const [correctIndex, setCorrentIndex] = useState([]);
    const [complete, setComplete] = useState(false);

    function handleNextClick() {

        if(questionNumber < questions.length - 1) {
            setQuestionNumber(questionNumber += 1);
        }
        else {
            setComplete(true);
            console.log(results);
            calculateScore();
        }
    }

    function calculateScore() {
        let correct = 0;
        results.forEach((answer, index) => {
            if(answer === correctIndex[index]) {
                correct++;
            }
            return;
        })
        
        setScore(correct);
        onSubmitScore(results, correct);
    }

    function handlePreviousClick() {
        if(questionNumber > 0) {
            setQuestionNumber(questionNumber -= 1);
        }
    }

    function handleChecked(e, index) {
        e.target.checked = true;

        const correctAnswer = [...correctIndex];
        correctAnswer[questionNumber] = questions[questionNumber].answer;
        setCorrentIndex(correctAnswer);
        
        const newAnswer = [...results];
        newAnswer[questionNumber] = index;
        setResults(newAnswer);
    }

   

    return (
        <div className="p-10 w-3/4">
            
            {complete ? (
                <div>
                     <p>You got {score} out of {questionNumber + 1} correct!</p>
                     <p className="text-2xl font-bold">{(score / (questionNumber + 1) * 100 )} %</p>
                     <QuizViewer />
                </div>
               
            ) : (
                <div className="bg-th-card-bg shadow-md p-10 pb-3 rounded border border-yellow flex flex-col items-center">
                     {questions[questionNumber].imageUrl ? (
                                    <img
                                        src={questions[questionNumber].imageUrl}
                                        alt="question pic"
                                        className="w-1/3 mb-8 mt-2 rounded">
                                    </img>
                    ) : null }

                    <div className="flex flex-col justify-start">
                        <div className="mb-1 flex flex-col">
                            <p className="font-semibold">{questionNumber + 1}. {questions[questionNumber].question}</p>
                            <p className="font-semibold my-3">{questions[questionNumber].bengali}</p>
                        </div>
                        
                        {questions[questionNumber].choices.map((choice, index) => {
                            return (
                                <div key={choice} className="mb-1">
                                    <input type="radio" id={choice} name={questions[questionNumber].id}  onChange={(e) => handleChecked(e, index)}></input>
                                    <label className="pl-1">{choice}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full flex justify-center items-center">

                        <button 
                            type="button" 
                            className="mt-5 w-1/3 text-th-light-text bg-th-button rounded-l border-r hover:bg-th-secondary font-medium text-sm px-5 py-2.5 text-center mb-4"
                            onClick={handlePreviousClick}>
                                ← Previous
                        </button>
                        <button 
                            type="button" 
                            className="mt-5 w-1/3 text-th-light-text bg-th-button rounded-r hover:bg-th-secondary font-medium text-sm px-5 py-2.5 text-center mb-4"
                            onClick={handleNextClick}>
                                {questionNumber < questions.length - 1 ? "Next →" : "Submit Quiz"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
  
}

export default Questions;