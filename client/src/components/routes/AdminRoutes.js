import { Routes, Route } from "react-router-dom"

import UplaodQuiz from '../UploadQuiz';
import QuizViewer from '../QuizViewer';
import UserContainer from '../UserContainer';
import AdminHome from '../AdminHome';
import TestDataContainer from '../testData/TastDataContainer';
import TestList from '../TestList';

import { UsersProvider } from "../../context/Users"

function AdminRoutes({  }) {

    console.log("admin routes")

    return (
        <div className="pl-60">
            <UsersProvider>
                <Routes>
                    <Route path="/uploadquiz" 
                    element={<UplaodQuiz />}
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
            </UsersProvider>
        </div>
    )
}

export default AdminRoutes;