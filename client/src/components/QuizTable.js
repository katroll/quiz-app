import { Navigate, useNavigate } from "react-router-dom"


function QuizTable({ quizzes }) {
    const navigate = useNavigate();

    return (

            <div className="">
                <div className="flex flex-col mt-8 max-h-[80vh]">
                    <div className="py-2 my-2  overflow-x-auto overflow-y-scroll sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-light-gray shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Test
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Date Created
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Times Taken
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {quizzes.map((quiz, index) => {
                                        return (
                                            <tr key={quiz.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <button 
                                                        className="text-sm leading-5 text-gray"
                                                        value={index}
                                                        onClick={() => navigate(`/test/${quiz.name}`)}>
                                                            {quiz.name}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <div className="text-sm leading-5 text-gray"></div>
                                                            {quiz.created_at.slice(0,10)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <div className="text-sm leading-5 text-gray">{quiz.grades.length}</div>
                                                </td>
                                            </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
   
    )

}

export default QuizTable;