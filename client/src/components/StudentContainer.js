import { useState } from "react";
import "../index.css"
import StudentTable from "./StudentTable";
import UserCard from "./UserCard";


function StudentContainer({ students, admins, quizzes }) {
    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});


    return (
        <div>
            {popUp ? (
                <div className="absolute w-full h-full ml-60 bg-gray-500/[.7] z-20 flex items-center pl-48">
                    <UserCard user={selectedUser} setPopUp={setPopUp} />
                </div>
            ) : null }

            <div className=" pl-72 pt-5 flex justify-center h-screen w-content">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl text-gray-800">Students</p>
                    <StudentTable users={students} setPopUp={setPopUp} setSelectedUser={setSelectedUser} quizzes={quizzes} />
                </div>
            </div>
        </div>
    )
        
}

export default StudentContainer;