import { useState } from "react";
import "../index.css"

function UplaodQuiz() {
    const [quizName, setQuizName] = useState();


    return (
        <div className="flex flex-col pt-10 items-start min-h-screen w-full pl-72">
            <h1 className="text-2xl text-stone-800 font-bold">Upload a Quiz</h1>

            <form className="mt-5">
                <div className="flex flex-row space-x-1 items-center">
                    <label className="p-2 text-stone-800">Quiz Name: </label>
                    <div className=" rounded-md p-2">
                            <input type="text" name="name" id="name" onChange={(e) => setQuizName(e.target.value)} className=" bg-stone-100 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" placeholder="Enter Quiz Name"></input>
                    </div>
                </div>
                <div className="flex flex-row space-x-1 items-center mt-2">
                    <label className="p-2 text-stone-800">Upload Quiz: </label>
                    <div className=" rounded-md p-2">
                            <button 
                                onClick={null} 
                                className=" bg-stone-200 px-2 py-2 text-blueGray-600 relative rounded text-sm w-full">
                                    Choose File
                                </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UplaodQuiz;