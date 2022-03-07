import { useState, useContext } from "react"
import { UsersContext } from "../context/Users";

function AdminTable() {

    const usersContext = useContext(UsersContext);
    const users = usersContext.users;

    const [selectedUser, setSelectedUser] = useState({});
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [updatePassword, setUpdatePassword] = useState(false);
    const [passwordUpdateResult, setPasswordUpdateResult] = useState("");
    const [adminUpdateResult, setAdminUpdateResult] = useState("");

    function setUpdatePasswordResult(result) {
        if(result) {
            setPasswordUpdateResult("Password Updated!");
        } else {
            setPasswordUpdateResult("Password Update Failed.");
        }
        setTimeout(() => setPasswordUpdateResult(""), 2000);
    }

    function setUpdateAdminResult(result) {
        if(result) {
            setAdminUpdateResult(`${selectedUser.first_name} ${selectedUser.last_name} removed as admin.`);
        } else {
            setAdminUpdateResult(`Failed to remove ${selectedUser.first_name} ${selectedUser.last_name} as admin.`);
        }
        setTimeout(() => setAdminUpdateResult(""), 2000);
    }


    function handleUpdateUserPassword(e) {
        e.preventDefault();
        usersContext.updatePassword(selectedUser, newPassword, setUpdatePasswordResult);
        setUpdatePassword(false);
    }

    function handleAdminToggle() {
        usersContext.updateAdmin(selectedUser, setUpdateAdminResult);
    }

    function handleDeleteAdmin() {
        console.log(userToDelete);
        if (userToDelete.replace(/\s+/g, '') === selectedUser.username.replace(/\s+/g, '')) {
            usersContext.deleteUser(selectedUser);
        } else {
            console.log("type the username as exact match")
        }
    }



    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col">
                {selectedUser.id ? (
                    <div>
                        <div>
                            <button 
                                className="bg-th-secondary rounded py-1 px-4 mr-3"
                                onClick={handleAdminToggle}>
                                Remove as Admin
                            </button>
                            <button 
                                className="bg-th-secondary rounded py-1 px-4 mr-3"
                                onClick={() => setDeleteWarning(true)}>
                                Delete User
                            </button>
                            <button 
                                className="bg-th-secondary rounded py-1 px-4"
                                onClick={() => setUpdatePassword(true)}>
                                Reset Password
                            </button>
                        </div>
                        {updatePassword ? (
                                    <div className="w-full flex justify-center mb-1 mt-2">
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
                            ) : null} 

                        {passwordUpdateResult ? (
                                <div className="w-full flex justify-center mb-1 mt-2">
                                    <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                        {passwordUpdateResult}
                                    </div>
                                </div>
                                ) : null }

                        {adminUpdateResult ? (
                            <div className="w-full flex justify-center mb-1 mt-2">
                                <div className="text-sm bg-th-border text-th-light-text w-1/2 text-center rounded">
                                    {adminUpdateResult}
                                </div>
                            </div>
                            ) : null }      

                        {deleteWarning ? (
                                <div className="flex space-y-2 mt-2 items-center">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Username to Delete"
                                        className="rounded mr-2 w-60 p-1"
                                        onChange={(e) => setUserToDelete(e.target.value)}>
                                    </input>
                                    <button 
                                        className="bg-th-warning rounded w-60 p-1"
                                        onClick={handleDeleteAdmin}>
                                        Confirm 
                                    </button>
                                </div>
                        ) : null }
                    </div>
                ) : null }
            </div>
            <div className="mt-2 overflow-x-scroll overflow-y-scroll w-full flex flex-col items-center">
                <div className="flex flex-col max-h-[70vh] max-w-[75vw]">
                    <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-th-border shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 border-b text-gray tracking-wider border-th-border bg-th-table-header-bg text-left">
                                        
                                        </th>
                                        <th className="px-6 py-3 border-b text-gray tracking-wider border-th-border bg-th-table-header-bg w-40 text-left">
                                            <div className="w-40">Name</div>
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray uppercase border-b border-th-border bg-th-table-header-bg">
                                            <div className="w-40">Username</div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-th-card-bg">
                                    {users.filter(user => user.admin).map(admin => {
                                        return (
                                            <tr key={admin.id}>
                                                <td className="px-6 pb-3 whitespace-no-wrap border-b border-th-border">
                                                    <input 
                                                        type="radio"
                                                        name="select"
                                                        className="mt-2 bg-th-card-bg"
                                                        onChange={() => setSelectedUser(admin)}/>                                           
                                                </td>
                                                <td className="px-6 pb-3 whitespace-no-wrap border-b border-th-border">
                                                    <div className="text-sm font-semibold leading-5 text-gray bg-th-card-bg">
                                                        {admin.first_name} {admin.last_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-th-border">
                                                    <div className="text-sm leading-5 text-gray">{admin.username}</div>
                                                </td>
                                            </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )

}

export default AdminTable;