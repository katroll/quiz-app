import "../index.css"
import { NavLink, useNavigate } from "react-router-dom";
import useCurrentColorScheme from "@mui/system/cssVars/useCurrentColorScheme";
import 'tw-elements';


function NavBar({ user, onSignOut, quizzes }) {
    const navigate = useNavigate();

    function handleNewQuizClick() {
        navigate("/uploadquiz")
    }

    console.log("navbar: ", quizzes);

    return (
        <div className="w-60 h-full shadow-md bg-stone-400 absolute" id="sidenavSecExample">
            <div className="pt-4 pb-2 px-6">
                <div className="flex items-center">
                    <div className="shrink-0">
                        <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-User-essential-collection-bearicons-glyph-bearicons.png"
                            className="rounded-full w-10" 
                            alt="Avatar"/>
                    </div>
                    <div className="grow ml-3">
                        <p className="text-sm font-semibold text-stone-800">{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                </div>
            </div>

            {user.admin ? (
                <>
                <ul className="relative px-1 mt-10">
                    <li class="relative" onClick={() =>  navigate("/uploadquiz")}>
                        <a class="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-stone-800 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-stone-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                            <span>Upload a Quiz</span>
                        </a>
                    </li>   
                </ul>
                <ul className="relative px-1">
                    <li class="relative" onClick={handleNewQuizClick}>
                        <a class="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-stone-800 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-stone-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                            <span>Students</span>
                        </a>
                    </li>   
                </ul>
                </>
            ): ( null )}



            <li>
                <a className="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-stone-800 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-stone-300 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="stone" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-expanded="false" aria-controls="collapseSidenavSecEx2">
                    <span>Quizzes</span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
                </a>
                {quizzes.map(quiz => {
                    return (
                        <ul key={quiz.name} className="relative accordion-collapse collapse" id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
                            <li class="relative" onClick={() => navigate(`/quiz/${quiz.name}`)}>
                                <a class="flex items-center text-sm font-semibold mx-5 py-4 px-6 h-12 overflow-hidden text-stone-800 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-stone-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                                    <span>{quiz.name}</span>
                                </a>
                            </li>   
                        </ul>
                    )
                })}
                
            </li>

            {!user.admin? (
                <ul class="relative px-1">
                    <li onClick={() => navigate("/mygrades")} class="relative">
                    <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                        <span>Grades</span>
                    </a>
                    </li>
                </ul>
            ) : ( null )}

            <ul class="relative px-1 mt-5">
                <li onClick={onSignOut} class="relative">
                  <a class="flex items-center text-md font-semibold py-4 px-6 h-12 overflow-hidden text-stone-800 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-stone-300 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="stone">
                    <span>Logout</span>
                  </a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;