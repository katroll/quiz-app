

function UserCard({ user, setPopUp }) {

    return (
        <div className="mt-2 m-10">
                <div className="flex flex-col mt-8">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
        
            <table className="min-w-content rounded-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        {user.first_name} {user.last_name}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500"> <strong>Username: </strong>{user.username}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500"> <strong>Joined: </strong> </div>
                                            </td>
                                        </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Quizzes</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">

                            </tbody>

                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-sm font-bold leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        <button 
                                            className="bg-transparent hover:bg-slate-400 text-slate-500 font-semibold hover:text-white py-2 px-4 border border-blue-200 hover:border-transparent rounded" 
                                            onClick={() => setPopUp(false)}>
                                                Close
                                        </button>
                                        
                                    </th>
                                </tr>
                            </thead>
                            
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