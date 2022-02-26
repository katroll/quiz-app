import { useParams } from "react-router-dom";

import { useContext } from "react"
import { QuizzesContext } from "../App";


function QuizViewer({ }) {
    const quizzes = useContext(QuizzesContext)
    const { name } = useParams();
    const quiz = quizzes.find(quiz => quiz.name.replace(/\s+/g, '') === name.replace(/\s+/g, ''));

    return (
        <div className="flex flex-col pt-10 items-center min-h-screen w-full pl-12 pr-10">
            <h1 className="text-4xl text-dark-blue font-bold">{quiz.name}</h1>
            <ul className="flex flex-col justify-start mt-5 w-full">
                {quiz.questions.map(question => {
                    return (
                        <li key={question.question} className="mb-3">
                            <div className="flex flex-col w-full p-2 bg-light-blue items-center border rounded border-yellow">
                                {question.imageUrl ? (
                                    <img
                                        src={question.imageUrl}
                                        alt="question pic"
                                        className="w-1/3 mb-8 mt-2 rounded">
                                    </img>
                                ) : null }
                                <div className="flex flex-col justify-start pb-2 pt-2">
                                    <div className="flex flex-row">
                                        <p className="font-bold mr-3 text-stone-800">{`${question.number}.`}</p>
                                        <div className="felx flex-col mb-2">
                                            <p className="text-stone-800">{question.question}</p>
                                            <p className="text-stone-800 mt-2 ">{question.bengali}</p>
                                        </div>  
                                    </div>
                                
                                    <div className="flex flex-col pl-10">
                                        {question.choices.map((choice, index) => {
                                            return (
                                                <div key={choice} className="">
                                                    <input type="radio" id={choice} name={question.question} checked={question.answer === index ? true : false} readOnly></input>
                                                    <label className="pl-1 text-stone-800">{choice}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default QuizViewer;