import { useEffect, useState } from "react";
import "../index.css"
import UserTable from "./UserTable";
import UserCard from "./UserCard";


function StudentContainer({ students, admins }) {
    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    return (
        <div>
            {popUp ? (
                <div className="absolute w-full h-full ml-60 bg-gray-500/[.7] z-20 flex items-center pl-48">
                    <UserCard user={selectedUser} setPopUp={setPopUp} />
                </div>
            ) : null }

            <div className="h-full pl-72 pt-5 flex justify-center w-content">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl text-gray-800">Students</p>
                    <UserTable users={students} setPopUp={setPopUp} setSelectedUser={setSelectedUser} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl text-gray-800">Admins</p>
                    <UserTable users={admins} setPopUp={setPopUp} setSelectedUser={setSelectedUser}/>
                </div>
            </div>
        </div>
    )
        
}

export default StudentContainer;