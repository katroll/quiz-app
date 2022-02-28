import { useState, useContext } from "react";
import "../index.css"
import StudentTable from "./StudentTable";
import UserCard from "./UserCard";
import { StudentsContext } from "../App";
import { QuizzesContext } from "../App";


function StudentContainer() {
    const students = useContext(StudentsContext);
    const quizzes = useContext(QuizzesContext);
    const [nameSearch, setNameSearch] = useState(""); 
    const [usernameSearch, setUsernameSearch] = useState(""); 


    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    console.log(students)

    function handleStudentSearch(e) {
        if(e.target.name === "name") {
            setNameSearch(e.target.value);
        } else {
            setUsernameSearch(e.target.value);
        }
    }

    console.log(nameSearch);
    console.log(usernameSearch)

    function filterStudents() {
        const filteredStudents =  students.filter(student => {
            return ((student.first_name.includes(nameSearch) || student.last_name.includes(nameSearch)) && student.username.includes(setUsernameSearch))
        })

        console.log(filteredStudents)

    }

    filterStudents()


    return (
        <div>
            {popUp ? (
                <div className="absolute w-full h-full bg-th-primary/[.5] z-20 flex items-center pl-48">
                    <UserCard user={selectedUser} setPopUp={setPopUp} />
                </div>
            ) : null }

            <div className="pt-5 flex justify-center w-full">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-4xl text-th-title-text mb-5">Students</p>
                    <div className="flex w-full pl-5 py-2 bg-th-secondary rounded">
                        <form className="">
                            <label>Search For A Student:</label>
                            <input
                                type="text"
                                placeholder="Student's Name"
                                name="name"
                                className="mx-3 pl-3"
                                onChange={handleStudentSearch}
                            />
                            <label>OR</label>
                            <input
                                type="text"
                                placeholder="Student's Username"
                                name="username"
                                className="mx-3 pl-3"
                                onChange={handleStudentSearch}
                            />
                        </form>
                    </div>
                    <StudentTable users={students} setPopUp={setPopUp} setSelectedUser={setSelectedUser} quizzes={quizzes} />
                </div>
            </div>
        </div>
    )
        
}

export default StudentContainer;