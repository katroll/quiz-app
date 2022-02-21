import { useState } from "react";
import UserCard from "./UserCard";

function UserTable({ users, setPopUp, setSelectedUser }) {


    function onUserClick(e) {
        setPopUp(true);
        setSelectedUser(users[e.target.value]);
    }


    return (

            <div className="mt-2 m-10">
                <div className="flex flex-col mt-8">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3  border-b border-gray-200 bg-gray-50">
                                            Name
                                        </th>
                                        <th className="px-6 py-3  border-b border-gray-200 bg-gray-50">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Quizzes Taken
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {users.map((user, index) => {
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <button 
                                                        className="text-sm leading-5 text-gray-500"
                                                        value={index}
                                                        onClick={onUserClick}>
                                                            {user.first_name} {user.last_name}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-500">{user.username}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                    <div className="text-sm leading-5 text-gray-500">{user.grades.length}</div>
                                                </td>
                                            </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
   
    )

}

export default UserTable;