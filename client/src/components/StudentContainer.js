import { useEffect, useState } from "react";
import "../index.css"
import UserCard from "./UserCard";


function StudentContainer() {
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch("/users")
        .then(resp => resp.json())
        .then(users => {
            const studentList = users.filter(user => !user.admin);
            const adminList = users.filter(user => user.admin);

            setStudents(studentList);
            setAdmins(adminList);
        })
    }, []);

    console.log("students: ", students);
    console.log("admins: ", admins);


    return (
        <div className="h-full pl-72 pt-5">
            <p>Students</p>
            {students.map(student => {
                return (
                <div 
                    key={student.id} 
                    className="bg-slate-200 mb-2 border border-slate-500 p-1 rounded">
                        <p>{student.first_name} {student.last_name}</p>
                </div>
            )})}
        </div>
    )
        
}

export default StudentContainer;