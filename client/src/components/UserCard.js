import { useState } from "react";
import StudentGrades from "./StudentGrades";


function UserCard({ user, setPopUp }) {
    const [updatePassword, setUpdatePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");
    const [updateAdminSuccess, setUpdateAdminSuccess] = useState(false);
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false);

    console.log(userToDelete)


    function handleUpdateUserPassword(e) {
        e.preventDefault();

        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password: newPassword})
        })
        .then((resp) => {
            if (resp.ok) {
              resp.json().then((user) => {
                setUpdatePasswordSuccess(true);
              });
            } else {
              resp.json().then(errors => console.log(errors))
            }
          });
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

    function handleAdminToggle() {
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({admin: true})
        })
        .then((resp) => {
            if (resp.ok) {
              resp.json().then((user) => {
                setUpdateAdminSuccess(true);
              });
            } else {
              resp.json().then(errors => console.log(errors))
            }
          });
      
    }

    return (
        <div className="flex flex-col w-3/4 h-1/2">
            <div className="flex">
                <div className="flex flex-col">
                    <div className="flex justify-around items-center bg-th-table-header-bg p-1 h-[60px] rounded-tl border-r border-th-border">
                        <div>
                            <button 
                                className="text-xs px-1 text-th-light-text bg-th-button hover:bg-th-secondary rounded p-1 " 
                                onClick={() => setPopUp(false)}>
                                    Close
                            </button>
                        </div>
                        <div className="text-center uppercase font-bold ">
                            {user.first_name} {user.last_name}
                        </div>
                    </div>
                
            
                    <div className="bg-th-card-bg h-full">
                        <div className="px-6 py-4 border-b border-th-border">
                            <div className="text-sm leading-5 text-gray"> <strong>Username: </strong>{user.username}</div>
                        </div>  
                        <div className="px-6 py-4 border-b border-th-border">
                            <div className="text-sm leading-5 text-gray"> <strong>User ID: </strong>{user.id}</div>
                        </div> 
                        <div className="px-6 py-4 border-b border-th-border">
                            <div className="text-sm leading-5 text-gray"> <strong>Joined: </strong>{user.created_at.slice(0,10)}</div>
                        </div> 
                        <div className="flex flex-col">
                            <div className="px-3 py-2 border-th-border flex justify-center">
                                <button 
                                    className="text-sm text-th-light-text bg-th-button hover:bg-th-secondary rounded-l p-1 border-r border-th-border"
                                    onClick={() => setUpdatePassword(true)}>
                                        Reset Password
                                </button>
                                <button 
                                    className="text-sm text-th-light-text bg-th-button hover:bg-th-secondary rounded-r p-1 " 
                                    onClick={handleAdminToggle}>
                                        Make Admin
                                </button>
                            </div>
                                {updateAdminSuccess ? (
                                    <div className="w-full flex justify-center mb-1">
                                        <div className="text-xs bg-th-border text-th-light-text w-1/2 text-center rounded">
                                            Admin Updated!
                                        </div>
                                    </div>
                                ) : null }
                                {updatePasswordSuccess ? (
                                    <div className="w-full flex justify-center mb-1">
                                    <div className="text-xs bg-th-border text-th-light-text w-1/2 text-center rounded">
                                        Password Updated!
                                    </div>
                                </div>
                                ) : null }
                        </div>
                            {updatePassword ? (
                                <td>
                                    <div className="px-6 pb-3">
                                        <form className="flex" onSubmit={handleUpdateUserPassword}>
                                            <input 
                                                type="password" 
                                                placeholder="Enter New Password"
                                                className="p-1 border border-th-secondary rounded text-xs mr-2"
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
                    </div>
                    <div className="bg-th-card-bg pb-2">
                        <button 
                            className="mx-5 bg-th-warning px-10 py-1 rounded text-th-light-text"
                            onClick={() => setDeleteWarning(true)}>
                            DELETE USER
                        </button>
                    </div>
                </div>
                <div className="flex flex-col h-full items-center">
                    <div className="w-full h-[60px] rounded-tr font-bold bg-th-table-header-bg flex justify-center items-center">
                        Quizzes
                    </div>
                    <div className="bg-th-primary h-full overflow-y-scroll">
                        <StudentGrades user={user} />
                    </div>
                </div>
            </div>
                {deleteWarning ? (
                    <div className="bg-th-primary p-3 w-1/2 rounded mt-2 mx-2">
                        <p>Are you sure you would like to delete this user? All associated data will be deleted.</p>
                        <div className="flex items-center">
                            <label>To confirm, type username: </label>
                            <input 
                                type="text" 
                                placeholder="Username to delete"
                                className="rounded ml-2 pl-2 text-sm"
                                onChange={(e) => setUserToDelete(e.target.value)}/>
                            <button
                                onClick={handleDeleteUser} 
                                className="ml-2 rounded bg-th-warning text-th-light-text p-1 text-sm">
                                Confirm 
                            </button>
                            <button
                                onClick={() => setDeleteWarning(false)} 
                                className="ml-2 rounded bg-th-warning text-th-light-text p-1 text-sm">
                                Cancel 
                            </button>
                        </div>
                    </div>
                ) : null}
        </div>
    )
}

export default UserCard;

