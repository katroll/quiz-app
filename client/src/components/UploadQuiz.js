import { useState } from "react";
import "../index.css"

function UplaodQuiz() {
    const [quizName, setQuizName] = useState();


    return (
        <div className="flex flex-col pt-10 items-center min-h-screen w-full pl-72">
            <h1 className="text-2xl text-sky-600 font-bold">Upload a quiz!</h1>

            <form className="mt-5">
                <div className="flex flex-row space-x-1">
                    <label className="p-2">Quiz Name: </label>
                    <div className="mt-1 rounded-md shadow-md hover:shadow-lg mb-10">
                            <input type="text" name="name" id="name" onChange={(e) => setQuizName(e.target.value)} className="px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" placeholder="Enter Quiz Name"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UplaodQuiz;