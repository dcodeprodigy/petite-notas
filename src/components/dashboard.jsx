import React, {useEffect} from "react";
import AllNotes from "../components/allnotes";


const mainDashboard = function (notes) {
    return (
        <main className="w-[95%] py-5 m-auto flex sm:flex-col">
            <AllNotes notes={notes} />
        </main>
    )
}


export default mainDashboard