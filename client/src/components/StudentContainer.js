import { useEffect } from "react";
import "../index.css"
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';


function StudentContainer() {

    useEffect(() => {
        fetch("/users")
        .then(resp => resp.json())
        .then(users => console.log("users: ", users))
    }, []);


    return (
        <div className="h-screen pl-72 pt-5">
            
        </div>
    )
}

export default StudentContainer;