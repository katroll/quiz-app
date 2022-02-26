import banner from "../../banner.jpg"

function StudentHome() {

    return (
        <div className="pt-10 flex flex-col items-center">
           <img 
            src={banner}
            className="w-100 mb-10 shadow border-4 border-light-blue" 
            alt="Avatar"/>
        </div>
    )
}

export default StudentHome;