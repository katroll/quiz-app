import React, { useEffect } from "react";

import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children, setLoggedIn }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch("/me").then((resp) => {
            if (resp.ok) {
              resp.json().then((user) => {
                setUser(user);
                setLoggedIn(true);
                console.log("fetching session")
              });
            } else {
              resp.json().then(errors => console.log(errors))
            }
          });
      

    }, [])

    function userContext(user, setValue) {
        return {
            user: user,
            setValue: setValue
        }
    }
    
    const context = userContext(user, setUser);

    console.log("setting user: ", user)


    return (
        <UserContext.Provider value={context}>
            {user === null ? (
                <div className="flex justify-center items-center mt-20">
                    <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>
            ) : (
                children
            )}
        </UserContext.Provider>
    )
    
}

export { UserContext, UserProvider };