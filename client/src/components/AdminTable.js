import { useState } from "react"


function AdminTable({ admins  }) {
    const sorted = admins.sort((a, b) => a.first_name - b.first_name)

    const [selected, setSelected] = useState({});
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");


    console.log(selected)

    function handleRemoveAdmin() {
        console.log(selected);
        fetch(`users/${selected.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({admin: false})
        })
        .then(resp => resp.json())
        .then(user => console.log(user))
    }

    function handleDeleteAdmin() {
        console.log(userToDelete);
        if (userToDelete.replace(/\s+/g, '') === selected.username.replace(/\s+/g, '')) {
            fetch(`/users/${selected.id}`, {
                method: "DELETE",
            })
            .then(console.log("deleted"))
        } else {
            console.log("type the username as exact mathc")
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col">
                <div>
                    <button 
                        className="bg-th-secondary rounded py-1 px-4 mr-3"
                        onClick={handleRemoveAdmin}>
                        Remove as Admin
                    </button>
                    <button 
                        className="bg-th-secondary rounded py-1 px-4"
                        onClick={() => setDeleteWarning(true)}>
                        Delete User
                    </button>
                </div>
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
            <div className="mt-2 overflow-x-scroll overflow-y-scroll w-full">
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
                                    {sorted.map(admin => {
                                        return (
                                            <tr key={admin.id}>
                                                <td className="px-6 pb-3 whitespace-no-wrap border-b border-th-border">
                                                    <input 
                                                        type="radio"
                                                        name="select"
                                                        className="mt-2 bg-th-card-bg"
                                                        onChange={() => setSelected(admin)}/>                                           
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