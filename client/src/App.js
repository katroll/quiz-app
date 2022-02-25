import './index.css';
import { useState, useEffect, createContext } from "react"
import {Route, Routes, useNavigate } from "react-router-dom";

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import UplaodQuiz from './components/UploadQuiz';
import QuizViewer from './components/QuizViewer';
import QuizTaker from './components/QuizTaker';
import StudentContainer from './components/StudentContainer';
import AdminHome from './components/AdminHome';
import StudentGradesContainer from './components/StudentGradesContainer';
import TestList from './components/TestList';

import banner from "./banner.jpg"
import TestDataContainer from './components/testData/TastDataContainer';
import StudentHome from './components/students/StudentHome';

export const StudentsContext = createContext();
export const QuizzesContext = createContext();

function App() {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [quizzes, setQuizzes] = useState([]);
  const [takingQuiz, setTakingQuiz] = useState(false);


  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        });
      } else {
        resp.json().then(errors => console.log(errors))
      }
    });

    fetch("/quizzes")
    .then(resp => resp.json())
    .then(quizzes => setQuizzes(quizzes));

    fetch("/users")
        .then(resp => resp.json())
        .then(users => {
            const studentList = users.filter(user => !user.admin);
            const adminList = users.filter(user => user.admin);

            setStudents(studentList);
            setAdmins(adminList);
        })
  }, []);

  function handleSignIn(user) {
    setCurrentUser(user);
    setLoggedIn(true);
  }


  function handleSignOut() {
    fetch("/signout", {
      method: "DELETE",
    }).then(() => {
      navigate("/")
      setLoggedIn(false)
    });
  }

  function handleSubmitQuiz(quizId, results, score) {
    console.log("results to submit: ", results);
    fetch("/grades", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_id: currentUser.id, quiz_id: quizId, results: results, score: score})
    })
    .then(resp => resp.json())
    .then(grade => {
      const updatedGrades = [...currentUser.grades, grade];
      setCurrentUser({...currentUser, grades: updatedGrades});
    }) 
  }

  function handleSubmitNewQuiz(name, questions, category) {
    
    fetch("/quizzes", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: name, category: category})
    })
    .then(resp => resp.json())
    .then(quiz => handleSubmitNewQuizQuestions(quiz.id, questions))
  }

  function handleSubmitNewQuizQuestions(quizId, questions) {
    questions.forEach((question, index) => {
      fetch("/questions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          question: question.question, 
          choices: question.choices,
          answer: question.answer, 
          bengali: question.bengali,
          quiz_id: quizId,
          number: index + 1
        })
      })
      .then(resp => resp.json())
      .then(question => console.log(question))
      
    });
  }

  console.log(quizzes)

  if(loggedIn === false) {
    return (
      <div className="flex flex-col items-center justify-between bg-mid-blue w-screen min-h-screen pt-5">
        <div className='flex flex-col items-center w-screen'>
          <img 
            src={banner}
            className="w-100 mb-5 border-4 border-light-blue" 
            alt="Avatar"/>
          <Routes>
            <Route 
                path="/signup" 
                element={<SignUp handleSignIn={handleSignIn} />}
              />
            
            <Route exact path="/" 
              element={<SignIn setCurrentUser={setCurrentUser} onSignIn={handleSignIn}/>}
            />
          </Routes>
        </div>
        <div className='flex pb-5 pt-2 mt-5 justify-center'>
          <p className='text-slate-800'>© {new Date().getFullYear()} by St. Paul's Computer Training Center. <a href="http://www.info@spctc.org">info@spctc.org</a></p>
        </div>
  </div>
    )
  }

  if(quizzes.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row min-h-screen min-w-screen bg-light-blue">

      {!takingQuiz ? (
        <NavBar user={currentUser} onSignOut={handleSignOut} quizzes={quizzes}/>
      ) : null }
      
      <div className='flex flex-col pl-60 w-full justify-between'>
        {currentUser.admin ? (
          <StudentsContext.Provider value={students}>
            <QuizzesContext.Provider value={quizzes}>
              <Routes>
                <Route path="/uploadquiz" 
                  element={<UplaodQuiz handleSubmitNewQuiz={handleSubmitNewQuiz}/>}
                />
                <Route path="/testdata" 
                  element={<TestDataContainer/>}
                />
                <Route exact path="/test/:name" 
                  element={<QuizViewer />}
                />
                <Route exact path="/tests/:category" 
                  element={<TestList />}
                />
                <Route path="/students" 
                  element={<StudentContainer />}
                />
                <Route path="/" 
                  element={<AdminHome />}
                />

                </Routes>
              </QuizzesContext.Provider>
            </StudentsContext.Provider>
        ) : (
          <QuizzesContext.Provider value={quizzes}> 
            <Routes>
              <Route path="/test/:name" 
                element={<QuizTaker handleSubmitQuiz={handleSubmitQuiz} setTakingQuiz={setTakingQuiz} takingQuiz={takingQuiz} />}
              />
              <Route exact path="/tests/:category" 
                  element={<TestList />}
                />
              <Route path="/mygrades" 
                element={<StudentGradesContainer user={currentUser}/>}
              />
              <Route path="/" 
                element={<StudentHome />}
              />
            </Routes>
          </QuizzesContext.Provider>
        )}

        <div className='flex pb-5 pt-2 mt-3 w-screen justify-center'>
          <p className='text-slate-800'>© {new Date().getFullYear()} by St. Paul's Computer Training Center. <a href="http://www.info@spctc.org">info@spctc.org</a></p>
        </div>
      </div>
      
    </div>
  )

}

export default App;