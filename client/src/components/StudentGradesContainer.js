import StudentGrades from "./StudentGrades";

function StudentGradesContainer({ user }) {

    return (
        <div className="pt-5 flex justify-center w-content">
            <div className="flex flex-col items-center">
                <p className="font-bold text-2xl text-dark-gray">My Test Scores</p>
                <StudentGrades user={user} />
            </div>
        </div>
    )
}

export default StudentGradesContainer;

