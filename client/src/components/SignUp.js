import "../index.css"

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";


export default function SignUp({ handleSignIn }) {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        admin: 0
    })

 function handleSignUpFormChange(e) {
    setSignUpData({
        ...signUpData,
        [e.target.name]: e.target.value
    })
  };

  function handleSubmit(e) {
      e.preventDefault();
      console.log(signUpData);

      fetch("/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(signUpData)
      })
      .then((resp) => resp.json())
      .then(user => {
        handleSignIn(user)
      })
      .then(navigate("/"))


  }

  return (

    <div className="flex flex-col bg-slate-500 items-center">
      <p className='text-2xl text-slate-900 font-bold mb-10'>Saint Paul's Computer Training Centre</p>
      <div className="w-full lg:w-4/12 bg-slate-400 rounded-md shadow shodow-slate-600">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
          <div className="flex flex-col items-center rounded-t mb-0 px-6 py-6">
            <p className='text-2xl font-bold text-slate-200'>Sign Up</p>
            <hr className="mt-6 border-b-1 border-blueGray-300"/>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className='flex space-x-2'>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="first_name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="First Name"
                    onChange={handleSignUpFormChange}/>
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="last_name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Last Name"
                    onChange={handleSignUpFormChange}/>
                </div>
              </div>
      
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Username"
                  onChange={handleSignUpFormChange}/>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Password</label>
                <input 
                  type="text" 
                  name="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password"
                  onChange={handleSignUpFormChange}/>
              </div>
              <div className="text-center mt-6">
                <button 
                  type="submit" 
                  className="bg-slate-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"> 
                    Sign In 
                </button>
              </div>
            </form>
            <div className='flex justify-end'>
              <NavLink to="/">Already have an account? Sign in.</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
    
}