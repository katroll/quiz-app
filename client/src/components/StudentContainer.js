import { useState, useContext } from "react";
import "../index.css"
import StudentTable from "./StudentTable";
import UserCard from "./UserCard";
import { StudentsContext } from "../App";
import { QuizzesContext } from "../App";


function StudentContainer() {
    const students = useContext(StudentsContext);
    const quizzes = useContext(QuizzesContext);

    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});


    return (
        <div>
            {popUp ? (
                <div className="absolute w-full h-full bg-gray/[.7] z-20 flex items-center pl-48">
                    <UserCard user={selectedUser} setPopUp={setPopUp} />
                </div>
            ) : null }

            <div className="pt-5 flex justify-center w-full">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-4xl text-dark-gray mb-5">Students</p>
                    <StudentTable users={students} setPopUp={setPopUp} setSelectedUser={setSelectedUser} quizzes={quizzes} />
                </div>
            </div>
        </div>
    )
        
}

export default StudentContainer;