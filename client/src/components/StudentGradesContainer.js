import StudentGrades from "./StudentGrades";

function StudentGradesContainer({ user }) {

    return (
        <div className=" pl-72 pt-5 flex justify-center h-screen w-content">
            <div className="flex flex-col items-center">
                <p className="font-bold text-2xl text-gray-800">My Test Scores</p>
                <StudentGrades user={user} />
            </div>
        </div>
    )
}

export default StudentGradesContainer;

