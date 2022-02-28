import { useState } from "react";
import StudentGrades from "./StudentGrades";


function UserCard({ user, setPopUp }) {
    const [updatePassword, setUpdatePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [userToDelete, setUserToDelete] = useState("")

    console.log(userToDelete)


    function handleUpdateUserPassword(e) {
        e.preventDefault();

        fetch(`/update_password/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password: newPassword})
        })
        .then(resp => resp.json())
        .then(user => console.log(user));
    }

    function handleDeleteUser() {
        if (userToDelete.replace(/\s+/g, '') === user.username.replace(/\s+/g, '')) {
            fetch(`/users/${user.id}`, {
                method: "DELETE",
            })
            .then(console.log("deleted"))
        } else {
            console.log("type the username as exact mathc")
        }
    }

    return (
        <div className="mt-2 m-10">
                <div className="flex flex-col mt-8 max-h-[80vh]">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-light-gray shadow sm:rounded-lg">
        
                        <table className="min-w-content rounded-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-center text-gray uppercase border-b border-light-gray bg-th-table-header-bg">
                                        {user.first_name} {user.last_name}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-th-card-bg">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                <div className="text-sm leading-5 text-gray"> <strong>Username: </strong>{user.username}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-light-gray">
                                                <div className="text-sm leading-5 text-gray"> <strong>Joined: </strong>{user.created_at.slice(0,10)}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-no-wrap border-light-gray flex justify-between">
                                                <div>
                                                    <button 
                                                        className="text-sm leading-5 text-th-light-text bg-th-button hover:bg-th-secondary rounded p-1 border border-slate-300"
                                                        onClick={() => setUpdatePassword(true)}>
                                                            Reset Password
                                                    </button>
                                                </div>
                                                <div>
                                                    <button 
                                                        className="text-sm px-3 leading-5 text-th-light-text bg-th-button hover:bg-th-secondary rounded p-1 " 
                                                        onClick={() => setPopUp(false)}>
                                                            Close
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            {updatePassword ? (
                                                <td>
                                                    <div className="px-6 pb-3">
                                                        <form className="flex" onSubmit={handleUpdateUserPassword}>
                                                            <input 
                                                                type="text" 
                                                                placeholder="Enter New Password"
                                                                className="p-1 border border-th-secondary rounded text-sm mr-2"
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="bg-th-button hover:bg-th-secondary text-th-light-text p-1 rounded text-sm">
                                                                Update
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            ) : null}
                                        </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-center text-gray uppercase border-b border-light-gray bg-th-table-header-bg">
                                        Quizzes</th>
                                </tr>
                            </thead>

                            <tbody className="bg-th-primary overflow-y-scroll">
                                <StudentGrades user={user} />
                            </tbody>
                            
                            
                            <tbody>
                                <tr className="flex justify-center bg-th-primary py-2">
                                    <td>
                                        <button 
                                            className="mx-5 bg-th-warning px-10 py-1 rounded text-th-light-text"
                                            onClick={() => setDeleteWarning(true)}>
                                            DELETE USER
                                        </button>
                                        {deleteWarning ? (
                                            <div className="bg-th-secondary p-3 rounded mt-2 mx-2">
                                                <p>Are you sure you would like to delete this user? All data associated data will be deleted.</p>
                                                <label>To confirm, type username: </label>
                                                <input 
                                                    type="text" 
                                                    placeholder="Username to delete"
                                                    className="rounded ml-2"
                                                    onChange={(e) => setUserToDelete(e.target.value)}/>
                                                <button
                                                    onClick={handleDeleteUser} 
                                                    className="ml-2 rounded bg-th-warning text-th-light-text p-1">
                                                    Confirm 
                                                </button>
                                            </div>
                                        ) : null}
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                        </div>
                    </div>
                </div>
            </div>
   
    )
}

export default UserCard;


// <div className="bg-gray-100 p-3 min-w-content min-h-fit flex justify-center flex-col overflow-y-scroll rounded-md shadow-lg"></div>
// <div className="flex">
//                 <div className="flex w-full items-center">
//                     <h1 className="font-bold text-slate-800 text-xl">{user.first_name} {user.last_name}</h1>
//                 </div>
//             </div>
//             <div>
//                 <div className="w-full flex justify-center">
//                     <button
//                         className="w-full px-1 px-3 py-1 rounded-md ml-2 text-white my-2 bg-slate-400 hover:bg-slate-500"
//                         onClick={() => setPopUp(false)}
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>