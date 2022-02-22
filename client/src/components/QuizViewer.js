import { useParams } from "react-router-dom";


function QuizViewer({ quizzes }) {
    const { quiz_name } = useParams();
    console.log(quiz_name)
    const quiz = quizzes.find(quiz => quiz.name.replace(/\s+/g, '') === quiz_name.replace(/\s+/g, ''));
    console.log(quiz)

    return (
        <div className="flex flex-col pt-10 items-start min-h-screen w-full pl-72">
            <h1 className="text-2xl text-stone-800 font-bold">{quiz.name}</h1>
            <ul className="flex flex-col justify-start mt-5 w-full">
                {quiz.questions.map((question, index) => {
                    return (
                        <li key={question.question} className="mb-3">
                            <div className="flex flex-row">
                                <p className="font-bold mr-3 text-stone-800">{`${index + 1}.`}</p>
                                <span className="texxt-stone-800">{`${question.question}`}</span>
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
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default QuizViewer;