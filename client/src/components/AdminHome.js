function AdminHome() {
    return (
        <div className="pl-72 pt-10 min-h-screen flex flex-col items-start">
            <h1 className="text-2xl text-slate-800 font-bold">This Weeks Activity</h1>
            <div className="flex">
                <div className="text-slate-800 text-lg mt-5 pt-2 p-x-20">Recently Taken Quizzes</div>
                <div className="flex flex-col mt-5 ml-5 border-l pl-5">
                    <div className="py-2">name - quiz - grade - date</div>
                    <div className="py-2">name - quiz - grade - date</div>
                    <div className="py-2">name - quiz - grade - date</div>
                    <div className="py-2">name - quiz - grade - date</div>
                    <div className="py-2">name - quiz - grade - date</div>
                </div>
            </div>
           
        </div>
    )

}

export default AdminHome;