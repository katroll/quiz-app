import { useParams } from "react-router-dom";


function QuizViewer({ quizzes }) {
    const { quiz_name } = useParams();

    const quiz = quizzes.find(quiz => quiz.name === quiz_name);

    return (
        <div className="flex flex-col pt-10 items-center min-h-screen w-full pl-72">
            <h1 className="text-2xl text-sky-600 font-bold">{quiz.name}</h1>
            <ul className="flex flex-col justify-start w-full">
                {quiz.questions.map((question, index) => {
                    return (
                        <li key={question.question} className="mb-3">
                            <div className="flex flex-row">
                                <p className="font-bold mr-3">{`${index + 1}.`}</p>
                                <span>{`${question.question}`}</span>
                            </div>
                            <div className="flex flex-col pl-10">
                                {question.choices.map((choice, index) => {
                                    return (
                                        <div key={choice} className="">
                                            <input type="radio" id={choice} name={question.question} checked={question.answer === index ? true : false} readOnly></input>
                                            <label className="pl-1">{choice}</label>
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