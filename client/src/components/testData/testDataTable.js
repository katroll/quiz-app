import { useEffect, useState } from "react";


function TestDataTable() {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("/grades")
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate);
        });
    }, [])

    console.log("grades: ", grades);

    return (
        <div className="mt-2 overflow-x-scroll overflow-y-scroll">
                <div className="flex flex-col max-h-[80vh] max-w-[75vw]">
                    <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-light-gray shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-gray border-light-gray bg-white">
                                            Student Name
                                        </th>
                                        <th className="px-6 py-3 border-b text-gray border-light-gray bg-white">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 border-b text-gray border-light-gray bg-white">
                                            Student ID
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Test Name
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                           Results Array
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                           Score
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                           Date
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-light-gray bg-white">
                                            Computer used
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {grades.map((grade, index) => {
                                        return (
                                            <tr key={grade.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
                                                    {grade.user.first_name} {grade.user.last_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
                                                    {grade.user.username}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
                                                    {grade.user.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
                                                    {grade.quiz.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <div className="text-sm leading-5 text-gray">{grade.results}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <div className="text-sm leading-5 text-gray">{grade.score}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                    <div className="text-sm leading-5 text-gray">{grade.updated_at}</div>
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

export default TestDataTable;