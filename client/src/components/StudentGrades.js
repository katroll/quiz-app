

function StudentGrades({ user }) {

    return (
        <div className="mt-2 m-10">
                <div className="flex flex-col mt-8 max-h-[80vh]">
                    <div className="py-2 -my-2 overflow-x-auto overflow-y-scroll sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-light-gray shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Test
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Score
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {user.grades.reverse().map((grade) => {
                                        return (
                                            <tr key={grade.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <button 
                                                        className="text-sm leading-5 text-gray"
                                                        onClick={null}>
                                                            {grade.quiz.name}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
                                                    {`${grade.score}/${grade.results.length}`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
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