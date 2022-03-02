
function StudentTable({ users, setPopUp, setSelectedUser, quizzes  }) {


    function onUserClick(e) {
        setPopUp(true);
        setSelectedUser(users[e.target.value]);
    }


    return (
            <div className="mt-2 overflow-x-scroll overflow-y-scroll">
                <div className="flex flex-col max-h-[70vh] max-w-[75vw]">
                    <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-th-border shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-gray tracking-wider border-th-border bg-th-table-header-bg w-40">
                                            <div className="w-40">Name</div>
                                        </th>
                                        {quizzes.map(quiz => {
                                            return (
                                                <th key={quiz.id} className="px-6 py-3 text-xs font-medium w-48 leading-4 tracking-wider text-left text-gray uppercase border-b border-th-border bg-th-table-header-bg">
                                                   <div className="w-36"> {quiz.name}</div>
                                                </th>
                                            )
                                        })}
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-th-border bg-th-table-header-bg">
                                            Quizzes Taken
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-th-card-bg">
                                    {users.map((user, index) => {
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-6 pb-3 whitespace-no-wrap border-b border-th-border">
                                                    <button 
                                                        className="text-sm leading-5 text-gray bg-th-card-bg"
                                                        value={index}
                                                        onClick={onUserClick}>
                                                            {user.first_name} {user.last_name}
                                                    </button>
                                                </td>
                                                {quizzes.map(quiz => {
                                                    return (
                                                        <td key={quiz.id} className="px-6 py-4 whitespace-no-wrap border-b border-th-border">
                                                            <div className="text-sm leading-5 text-gray">{user.grades.find(grade => grade.quiz_data.quiz.id === quiz.id) ? `${user.grades.find(grade => grade.quiz_data.quiz.id === quiz.id).score}/${quiz.questions.length}` : "-" }</div>
                                                        </td>
                                                    )
                                                })}

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-th-border">
                                                    <div className="text-sm leading-5 text-gray">{user.grades.length}</div>
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

export default StudentTable;