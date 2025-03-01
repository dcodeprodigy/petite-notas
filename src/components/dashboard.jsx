import React, {useEffect, useState} from "react";
import DisplayNote from "./displaynote";
import NotesList from "./noteslist";


const MainDashboard = function ({ notes }) {
    const [displayNote, setDisplayNote] = useState();

    return (
        <main className="pt-10 m-auto grid grid-cols-1 gap-4 md:grid-cols-2 max-w-[85%]">
            <NotesList notes={notes} displayNote={displayNote} setDisplayNote={setDisplayNote} />

            <DisplayNote notes={notes} />
        </main>
    )
}


export default MainDashboard