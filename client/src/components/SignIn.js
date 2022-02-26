import { useState } from 'react';

import { NavLink } from "react-router-dom";
import 'tw-elements';


export default function SignIn({ onSignIn, setSignUp }) {
    const [signInData, setSignIndata] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    function handleSignInChange(e) {
        setSignIndata({
            ...signInData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInData)
        })
        .then(resp => {
            if(resp.ok){
                resp.json().then(admin => onSignIn(admin))
            }
            else {
                resp.json().then(error => setError(error.error))
            }
        })
    }

  return (
      <div className="w-3/4 lg:w-6/12 bg-light-blue rounded-md shadow-xl shadow-slate-600">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
          <div className="flex flex-col items-center rounded-t mb-0 px-6 py-6">
            <p className='text-2xl font-bold text-text-blue'>Sign In</p>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-text-blue text-xs font-bold mb-2">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Username"
                  onChange={handleSignInChange}/>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-text-blue text-xs font-bold mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150" placeholder="Password"
                  onChange={handleSignInChange}/>
              </div>
              <div className="text-center mt-6">
                <button 
                  type="submit" 
                  className="bg-text-blue text-white active:bg-text-blue text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-xl mr-1 mb-1 w-full ease-linear transition-all duration-150"> 
                    Sign In 
                </button>
              </div>
            </form>
            <div className="flex justify-between">
              <div className="flex items-start">
                    <p className="bg-error-red text-white px-2 my-1 rounded">{error}</p>
              </div>
              <div className='flex flex-col items-end'>
                <NavLink to="/signup" className="text-text-blue">Don't have a account? Sign up.</NavLink>
                <NavLink to="/signup" className="bengali text-text-blue">বাংলা-মিডিয়াম</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
    
  }