import banner from "../../banner.jpg"

function StudentHome() {

    return (
        <div className="pt-10 flex flex-col items-center">
           <img 
            src={banner}
            className="w-100 mb-10 border-2 shadow border-mid-blue" 
            alt="Avatar"/>
        </div>
    )
}

export default StudentHome;