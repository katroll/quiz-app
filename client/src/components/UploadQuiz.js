import { useState } from "react";
import "../index.css"
import * as XLSX from "xlsx";


function UplaodQuiz({ handleSubmitNewQuiz }) {

    const [quizName, setQuizName] = useState("");
    const [quizCategory, setQuizCategory] = useState("");
    const [preview, setPreview] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");


    function loadQuizFile(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                workbook.SheetNames.forEach(sheetName => {
                    const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    const json_object = JSON.stringify(XL_row_object);
                    
                    //console.log(XL_row_object);
                    //setQuizFile(XL_row_object)

                    const quizQuestions = [];
                    XL_row_object.forEach(question => {
                        const questionObj = {
                        question: question.Question,
                        choices: [question.Choice0, question.Choice1, question.Choice2, question.Choice3],
                        answer: question.Answer,
                        bengali: question.Bengali
                        };
                        quizQuestions.push(questionObj);
                    });
                    console.log(XL_row_object);
                    setQuestions(quizQuestions);
                })
            }
            reader.readAsArrayBuffer(selectedFile);
        }

    }

    function handleViewPreview(e) {
        e.preventDefault();
        setPreview(!preview);
    }

    function onSubmitQuiz() {
        if(!quizName || questions.length === 0) {
            setError("Quiz name and file are required");
        } else {
            setError("")
            handleSubmitNewQuiz(quizName, questions, quizCategory);
        }
    }

    console.log("category", quizCategory);

    return (
        <div className="flex flex-col pt-10 items-start w-full items-center">
            <h1 className="text-2xl text-stone-800 font-bold">Upload a Test</h1>

            <form className="mt-5">
                <div className="flex flex-row space-x-1 items-center">
                    <label className="p-2 text-stone-800">Test Name: </label>
                    <div className=" rounded-md p-2">
                            <input type="text" name="name" id="name" onChange={(e) => setQuizName(e.target.value)} className=" bg-stone-100 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" placeholder="Enter Quiz Name"></input>
                    </div>
                </div>
                <div className="flex">
                    <label className="p-2 text-stone-800">Test Level: </label>
                    <div className="flex flex-col space-x-1">
                        <div className="flex flex-row rounded-md pt-2 pl-3">
                                <input type="radio" name="category" id="beginner" onChange={(e) => setQuizCategory(e.target.id)} className=" bg-stone-100 px-2 mt-1 mr-2"/>
                                <label>Beginner</label>  
                        </div>
                        <div className="flex flex-row rounded-md pl-2">
                                <input type="radio" name="category" id="intermediate" onChange={(e) => setQuizCategory(e.target.id)} className=" bg-stone-100 px-2 mt-1 mr-2"/>
                                <label>Intermediate</label>  
                        </div>
                        <div className="flex flex-row rounded-md pl-2">
                                <input type="radio" name="category" id="advanced" onChange={(e) => setQuizCategory(e.target.id)} className=" bg-stone-100 px-2 mt-1 mr-2"/>
                                <label>Advanced</label>  
                        </div>
                        <div className="flex flex-row rounded-md pl-2">
                                <input type="radio" name="category" id="english" onChange={(e) => setQuizCategory(e.target.id)} className=" bg-stone-100 px-2 mt-1 mr-2"/>
                                <label>English</label>  
                        </div>
                        <div className="flex flex-row rounded-md pl-2">
                                <input type="radio" name="category" id="misc" onChange={(e) => setQuizCategory(e.target.id)} className=" bg-stone-100 px-2 mt-1 mr-2"/>
                                <label>Misc</label>  
                        </div>
                    </div>
                </div>
                <div htmlFor="upload" className="flex flex-row space-x-1 items-center mt-2">
                    <label className="p-2 text-stone-800">Upload Test: </label>
                    <div>
                        <input 
                            type="file" 
                            id="upload" 
                            name="upload" 
                            onChange={loadQuizFile} 
                            className="rounded-md p-2" />
                    </div>
                </div>
            </form>

            {error ? (
                <div className="ml-10 px-3 bg-red-400 rounded">
                    <p className="text-white">{error}</p>
                </div>
            ) : null}

            <div className="flex space-x-5 pl-10 mt-5">   
                {questions.length > 0 ? (
                    <button 
                        className="bg-slate-500 p-2 rounded"
                        onClick={handleViewPreview}>
                            {preview ? "Hide Preview" : "View Preview"}
                    </button>
                ) : null } 


                <button 
                        className="bg-slate-500 p-2 rounded"
                        onClick={onSubmitQuiz}>
                            Submit Test
                </button>
            </div>


            {preview ? (
                <div className="flex flex-col pt-10 items-start min-h-screen w-full">
                    <h1 className="text-2xl text-stone-800 font-bold">{quizName}</h1>
                    <ul className="flex flex-col justify-start mt-5 w-full">
                        {questions.map((question, index) => {
                            return (
                                <li key={question.question} className="mb-3">
                                    <div className="flex flex-row">
                                        <p className="font-bold mr-3 text-stone-800">{`${index + 1}.`}</p>
                                        <div className="felx flex-col mb-2">
                                            <p className="text-stone-800">{question.question}</p>
                                            <p className="text-stone-800 mt-2 ">{question.bengali}</p>
                                        </div>  
                                    </div>
                                    <div className="flex flex-col pl-10">
                                        {question.choices.map((choice, index) => {
                                            return (
                                                <div key={choice} className="">
                                                    <input type="radio" id={choice} name={question.question} checked={question.answer === index ? true : false} readOnly></input>
                                                    <label className="pl-1 text-stone-800">{choice}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : ( null )}
            
        </div>
    )
}

export default UplaodQuiz;