import { useState } from "react";
import "../index.css"
import * as Excel from "exceljs";
import * as Base64 from "base64-arraybuffer"


function UplaodQuiz({ handleSubmitNewQuiz }) {

    const urlCreator = window.URL || window.webkitURL;

    const [quizName, setQuizName] = useState("");
    const [quizCategory, setQuizCategory] = useState("");
    const [preview, setPreview] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState([]);

    const categories = ["Beginner", "Intermediate", "Advanced", "English", "Misc"];

    function loadQuizFile(e) {
        const selectedFile = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(selectedFile)
        reader.onload = () => {
            const buffer = reader.result;
            wb.xlsx.load(buffer).then(workbook => {
                console.log(workbook, 'workbook instance')
                workbook.eachSheet((sheet, id) => {
                    const quizQuestions = [];
                    sheet.eachRow((row, rowIndex) => {
                        if(rowIndex === 1 ) return;                        
                        const questionObj = {
                            question: row.values[1],
                            bengali: row.values[2],
                            choices: [row.values[3], row.values[4], row.values[5], row.values[6]],
                            answer: row.values[7],
                            number: rowIndex - 1
                            };
                        quizQuestions.push(questionObj);
                    })

                    const images = sheet.getImages();
                    images.forEach(image => {
                        const row = image.range.tl.row;
                        const img = workbook.model.media.find(m => m.index === image.imageId);
                        const imgBase64 = Base64.encode(img.buffer);
                        quizQuestions[row - 1].imageBase64 = imgBase64;
                    })
                    setQuestions(quizQuestions);
                })
            })
        }
    }

    function handleViewPreview(e) {
        e.preventDefault();
        setPreview(!preview);
    }

    function onSubmitQuiz() {
        if(!quizName || questions.length === 0 || !quizCategory) {
            setError("All fields are required")
        } else {
            setError("")
            handleSubmitNewQuiz(quizName, questions, quizCategory);
        }
    }

    return (
        <div className="flex flex-col pt-10" >
            <div className="flex flex-col bg-th-card-bg py-5 items-center">
                <h1 className="text-4xl text-th-title-text font-bold">Upload a Test</h1>
                <div>
                    <form className="mt-5 w-full">
                        <div className="flex flex-row">
                            <div className="w-full rounded-md p-2">
                                    <input 
                                        type="text" 
                                        name="name" id="name" 
                                        onChange={(e) => setQuizName(e.target.value)} 
                                        className="px-2 py-2 placeholder-blueGray-300 text-blueGray-600 relative rounded text-sm shadow border border-th-table-heading-bg ring ring-th-table-header-bg focus:outline-none focus:ring w-full" 
                                        placeholder="Enter Test Name">
                                    </input>
                            </div>
                        </div>
                        <div className="flex">
                            <label className="p-2 text-stone-800">Choose Test Category: </label>
                            <div className="flex flex-col space-x-1">
                                {categories.map(category => {
                                    return (
                                        <div key={category} className="flex flex-row rounded-md pt-2 pl-3">
                                            <input type="radio" name="category" id={category.toLowerCase()} onChange={(e) => setQuizCategory(e.target.id)} className=" bg-stone-100 px-2 mt-1 mr-2"/>
                                            <label>{category}</label>  
                                        </div>
                                    )
                                })}
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
                </div>

                {error ? (
                    <div className="ml-10 px-3 bg-th-warning text-th-light-text rounded">
                        <p className="text-white">{error}</p>
                    </div>
                ) : null}

                <div className="flex space-x-5 pl-10 mt-5">   
                    {questions.length > 0 ? (
                        <button 
                            className="bg-th-button hover:bg-th-secondary text-th-light-text p-2 rounded"
                            onClick={handleViewPreview}>
                                {preview ? "Hide Preview" : "View Preview"}
                        </button>
                    ) : null } 


                    <button 
                            className="bg-th-button hover:bg-th-secondary text-th-light-text p-2 rounded"
                            onClick={onSubmitQuiz}>
                                Submit Test
                    </button>
                </div>
            </div>


            {preview ? (
                <div className="flex flex-col pt-10 items-center min-h-screen w-full pl-12 pr-10">
                <h1 className="text-4xl text-th-title-text font-bold">{quizName}</h1>
                <ul className="flex flex-col justify-start mt-5 w-full">
                    {questions.map(question => {
                        return (
                            <li key={question.question} className="mb-3">
                                <div className="flex flex-col w-full p-2 bg-th-card-bg items-center border rounded border-yellow">
                                {question.imageBase64 ? (
                                        <img
                                            src={urlCreator.createObjectURL(new Blob( [ Base64.decode(question.imageBase64) ], { type: "image/jpeg" } ))}
                                            alt="question pic"
                                            className="w-1/3 mb-8 mt-2 rounded">
                                        </img>
                                    ) : null }
                                    <div className="flex flex-col justify-start pb-2 pt-2">
                                        <div className="flex flex-row">
                                            <p className="font-bold mr-3 text-stone-800">{`${question.number}.`}</p>
                                            <div className="felx flex-col mb-2">
                                                <p className="text-stone-800">{question.question}</p>
                                                <p className="text-stone-800 mt-2">{question.bengali}</p>
                                            </div>  
                                        </div>
                                            <div className="flex flex-col pl-10">
                                                {question.choices.map((choice, index) => {
                                                    return (
                                                        <div key={`${choice}-${index}`} className="">
                                                            <input type="radio" id={choice} name={question.question} checked={question.answer === index ? true : false} readOnly></input>
                                                            <label className="pl-1 text-stone-800">{choice}</label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                    </div>
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



