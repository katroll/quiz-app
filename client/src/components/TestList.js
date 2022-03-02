import { useParams } from "react-router-dom"
import { useContext } from "react"
import { QuizzesContext } from "../App"
import QuizTable from "./QuizTable"


function TestList() {
    const allQuizzes = useContext(QuizzesContext)
    const { category } = useParams();

    const filteredQuizzes = allQuizzes.filter(quiz => quiz.category === category)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="pt-10 pl-12">
            <h1 className="text-2xl text-dark-gray font-bold">{capitalizeFirstLetter(category)} Tests</h1>

            <QuizTable quizzes={filteredQuizzes} />

        </div>
    )
}

export default TestList;