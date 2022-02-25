import { useEffect, useState } from "react";

function AdminHome() {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("/grades")
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate.slice(0, 5));
        });
    }, [])

    return (
        <div className="pt-10 pl-12 flex flex-col justify-start">
            <div className="flex flex-col justify-start">
            <h1 className="text-4xl text-slate-800 font-bold">This Weeks Activity</h1>
            <div className="flex">
                <div className="text-slate-800 text-lg mt-5 pt-2 p-x-20">Recently Taken Quizzes</div>
                <div className="flex flex-col mt-5 ml-5 border-l pl-5">
                    {grades.map(grade => {
                        return (
                            <div key={grade.id} className="flex py-2 bg-yellow my-1 px-2 rounded">
                                <div className="mx-2 py-1">{grade.user.first_name} {grade.user.last_name}</div>
                                <div className="bg-mid-blue rounded px-3 py-1 mx-1">{grade.quiz.name}</div>
                                <div className="bg-mid-blue rounded px-3 py-1 mx-1">{grade.score}/{grade.results.length}</div>
                                <div className="bg-mid-blue rounded px-3 py-1 mx-1">{grade.updated_at.slice(0,10)} at {grade.updated_at.slice(11, 19)}</div>

                            </div>
                        )
                    })}
                </div>
            </div>

            </div>
         
           
        </div>
    )

}

export default AdminHome;