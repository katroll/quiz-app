import { useState, useContext } from "react";
import "../index.css"
import StudentTable from "./StudentTable";
import UserCard from "./UserCard";
import { UsersContext } from "../App";
import { QuizzesContext } from "../App";
import AdminTable from "./AdminTable";


function UserContainer() {
    const students = useContext(UsersContext).filter(user => !user.admin);
    const admins = useContext(UsersContext).filter(user => user.admin);
    const quizzes = useContext(QuizzesContext);

    const [nameSearch, setNameSearch] = useState(""); 
    const [usernameSearch, setUsernameSearch] = useState(""); 
    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [showStudents, setShowStudents] = useState(true);

    function handleStudentSearch(e) {
        if(e.target.name === "name") {
            setNameSearch(e.target.value);
        } else {
            setUsernameSearch(e.target.value);
        }
    }

    function filterStudents() {
        const filteredStudents =  students.filter(student => {
            return ((student.first_name.toLowerCase().includes(nameSearch.toLowerCase()) || student.last_name.toLowerCase().includes(nameSearch.toLowerCase())) && student.username.toLowerCase().includes(usernameSearch.toLowerCase()))
        })
        return filteredStudents;
    }



    return (
        <div>
            {popUp ? (
                <div className="absolute w-full h-full bg-th-transparent-bg z-20 flex items-center pl-48">
                    <UserCard user={selectedUser} setPopUp={setPopUp} />
                </div>
            ) : null }

            <div className="pt-5 flex justify-center w-full">
                <div className="flex flex-col items-center w-full">
                    <p className="font-bold text-4xl text-th-title-text mb-5">{showStudents ? "Students" : "Admins"}</p>
                    <div className="flex justify-start w-full pl-5 mb-5 ml-5">
                        <input 
                            type="radio" 
                            name="userType" 
                            className="mr-2 mt-2" 
                            checked={showStudents}
                            onChange={() => setShowStudents(!showStudents)}/>
                        <label className="mr-4 text-th-title-text text-lg">Students</label>
                        <input 
                            type="radio" 
                            name="userType" 
                            className="mr-2 mt-2" 
                            checked={!showStudents}
                            onChange={() => setShowStudents(!showStudents)}/>
                        <label className="text-th-title-text text-lg">Admins</label>
                    </div>
                   
                    {showStudents ? (
                        <div>
                            <div className="flex w-full pl-5 py-2 bg-th-secondary rounded">
                                <form className="">
                                    <label>Search For A Student:</label>
                                    <input
                                        type="text"
                                        placeholder="Student's Name"
                                        name="name"
                                        className="mx-3 pl-3 rounded"
                                        onChange={handleStudentSearch}
                                        value={nameSearch}
                                    />
                                    <label>OR</label>
                                    <input
                                        type="text"
                                        placeholder="Student's Username"
                                        name="username"
                                        className="mx-3 pl-3 rounded"
                                        onChange={handleStudentSearch}
                                        value={usernameSearch}
                                    />
                                </form>
                            </div>
                            <StudentTable users={filterStudents()} setPopUp={setPopUp} setSelectedUser={setSelectedUser} quizzes={quizzes} />
                        </div>

                    ) : (
                        <div className="w-full pl-8 py-2 flex w-full items-center">
                                <AdminTable admins={admins}/>
                        </div>
                    )}
                   
                </div>
            </div>
        </div>
    )
        
}

export default UserContainer;