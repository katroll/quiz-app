import { useState } from "react";

function Questions( { questions, onSubmitScore }) {
    let [questionNumber, setQuestionNumber] = useState(0);
    let [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [complete, setComplete] = useState(false);

    function handleNextClick() {
        if(isCorrect) {
            setScore(score += 1);
        }

        if(questionNumber < questions.length - 1) {
            setQuestionNumber(questionNumber += 1);
        }
        else {
            setComplete(true);
            onSubmitScore(score);
        }
    }

    function handleChecked(e, index) {
        e.target.checked = true;
        console.log(questions[questionNumber].answer);
        setIsCorrect(questions[questionNumber].answer === index);
        if(questions[questionNumber].answer === index) {
            
        }
    }

    console.log("score: ", score);

    return (
        <div className="p-10">
            
            {complete ? (
                <div>
                     <p>You got {score} out of {questionNumber + 1} correct!</p>
                     <p className="text-2xl font-bold">{(score / (questionNumber + 1) * 100 )} %</p>
                </div>
               
            ) : (
                <>
                    <div className="mb-5">
                        <p className="font-semibold">{questionNumber + 1}. {questions[questionNumber].question}</p>
                    </div>
                
                    {questions[questionNumber].choices.map((choice, index) => {
                        return (
                            <div key={choice} className="mb-1">
                                <input type="radio" id={choice} name={questions[questionNumber].id}  onChange={(e) => handleChecked(e, index)}></input>
                                <label className="pl-1">{choice}</label>
                            </div>
                        )
                    })}
                    <button 
                        type="button" 
                        className="justify-end mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleNextClick}>
                            {questionNumber < questions.length - 1 ? "Next Question" : "Submit Quiz"}
                    </button>
                </>
            )}
        </div>
    )
  
}

export default Questions;