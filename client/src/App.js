import './index.css';
import { useState, useEffect } from "react"
import {Route, Routes, useNavigate } from "react-router-dom";

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import UplaodQuiz from './components/UploadQuiz';
import QuizViewer from './components/QuizViewer';
import QuizTaker from './components/QuizTaker';

//import QuizContainer from './QuizContainer';
//import NewQuizForm from './NewQuizForm';


function App() {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        });
      }
    });

    fetch("/quizzes")
    .then(resp => resp.json())
    .then(quizzes => setQuizzes(quizzes));
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

  function handleSubmitQuiz(quizId, score) {
    console.log("score to submit: ", score);
    fetch("/grades", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_id: currentUser.id, quiz_id: quizId, score: score})
    })
    .then(resp => resp.json())
    .then(grade => {
      const updatedGrades = [...currentUser.grades, grade];
      setCurrentUser({...currentUser, grades: updatedGrades});
    }) 
  }

  console.log(currentUser)

  if(loggedIn === false) {
    return (
      <div className="bg-gray-300 min-h-screen pt-20">
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
    <div className="flex flex-row min-h-scren min-w-screen bg-sky-200">
        <NavBar user={currentUser} onSignOut={handleSignOut} quizzes={quizzes}/>
      {currentUser.admin ? (
        <Routes>
          <Route path="/uploadquiz" 
            element={<UplaodQuiz />}
          />
          <Route path="/quiz/:quiz_name" 
            element={<QuizViewer quizzes={quizzes} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/quiz/:quiz_name" 
            element={<QuizTaker quizzes={quizzes} handleSubmitQuiz={handleSubmitQuiz} />}
          />
        </Routes>
      )}
      
    </div>
  )

}

export default App;