import './index.css';
import { useState, useEffect, createContext } from "react"
import {Route, Routes, useNavigate } from "react-router-dom";

import * as Base64 from "base64-arraybuffer"

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import UplaodQuiz from './components/UploadQuiz';
import QuizViewer from './components/QuizViewer';
import QuizTaker from './components/QuizTaker';
import UserContainer from './components/UserContainer';
import AdminHome from './components/AdminHome';
import StudentGradesContainer from './components/StudentGradesContainer';
import TestList from './components/TestList';

import banner from "./banner.jpg"
import TestDataContainer from './components/testData/TastDataContainer';
import StudentHome from './components/students/StudentHome';

import { UserProvider } from "./context/user"

export const UsersContext = createContext();
export const QuizzesContext = createContext();
//export const UserContext = createContext();

function App() {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);


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
    .then(quizzes => {
      quizzes.map(quiz => {
        quiz.questions.map(question => {
          if(question.imageBase64) {
            question.imageUrl = createImgUrl(question);
          }
          return question;
      })
      return quiz.questions.sort((a, b) => a.number - b.number);  
      })
      setQuizzes(quizzes);
    });

    fetch("/users")
        .then(resp => resp.json())
        .then(users => setUsers(users))
  }, []);

  function createImgUrl(question) {
    const imageArrayBuffer = Base64.decode(question.imageBase64);
    const blob = new Blob( [ imageArrayBuffer ], { type: "image/jpeg" } );
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL( blob );
    return imageUrl;
  }

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
    .then(quiz => {
      handleSubmitNewQuizQuestions(quiz.id, questions, quiz);
    })
  }

  function handleSubmitNewQuizQuestions(quizId, questions, quiz) {
    const allFetches = questions.map((question) => {
      return fetch("/questions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ...question,
          quiz_id: quizId
        })
      })
      .then(resp => resp.json())
      
    })

    Promise.all(allFetches).then(resp => {
      const questions = resp.sort((a, b) => a.number - b.number);
      quiz.questions = questions;

      quiz.questions.map(question => {
        if(question.imageBase64) {
          question.imageUrl = createImgUrl(question);
        }
        return question;
      })

      setQuizzes([...quizzes, quiz]);
    });
  }


  if(loggedIn === false) {
    return (
      <div className="flex flex-col items-center justify-between bg-th-primary w-screen min-h-screen pt-5">
        <div className='flex flex-col items-center w-screen'>
          <img 
            src={banner}
            className="w-100 mb-5 border-4 border-th-secondary" 
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

  if(users.length === 0) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row min-h-screen max-w-[100vw] bg-th-primary">

      {!takingQuiz ? (
        <NavBar user={currentUser} onSignOut={handleSignOut} quizzes={quizzes}/>
      ) : null }
      
      <div className='flex flex-col pl-60 w-full justify-between'>
        {currentUser.admin ? (
          <UserProvider setLoggedIn={setLoggedIn}>
            <UsersContext.Provider value={users}>
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
                    element={<UserContainer />}
                  />
                  <Route path="/" 
                    element={<AdminHome />}
                  />

                  </Routes>
                </QuizzesContext.Provider>
              </UsersContext.Provider>
           </UserProvider>
        ) : (
          <UserProvider>
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
          </UserProvider>
        )}

        <div className='flex pb-5 pt-2 mt-3 justify-center'>
          <p className='text-slate-800'>© {new Date().getFullYear()} by St. Paul's Computer Training Center. <a href="http://www.info@spctc.org">info@spctc.org</a></p>
        </div>
      </div>
      
    </div>
  )

}

export default App;