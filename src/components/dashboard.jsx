import React, {useEffect} from "react";
import DisplayNote from "./displaynote";
import NotesList from "./noteslist";


const mainDashboard = function ({ notes }) {
    return (
        <main className="pt-10 m-auto grid grid-cols-1 gap-4 md:grid-cols-2 max-w-[85%]">
            <NotesList notes={notes}/>
            <DisplayNote notes={notes} />
        </main>
    )
}


export default mainDashboard