

function StudentGrades({ user }) {

    return (
        <div className="mt-2 m-10">
                <div className="flex flex-col mt-8 max-h-[40vh]">
                    <div className="py-2 -my-2 overflow-x-auto overflow-y-scroll sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Test
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Score
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {user.grades.map((grade) => {
                                        return (
                                            <tr key={grade.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <button 
                                                        className="text-sm leading-5 text-gray-500"
                                                        onClick={null}>
                                                            {grade.quiz.name}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                    {`${grade.score}/${grade.results.length}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                    {grade.updated_at.slice(0,10)}
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

export default StudentGrades;