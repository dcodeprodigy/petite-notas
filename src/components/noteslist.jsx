import React, { useEffect, useState, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import chroma from "chroma-js";
import readingTime from "../utilis/reading-time-calc";
import FilterDropdown from "./filterdropdown";

const fac = new FastAverageColor();

const NotesAsList = function ({ notes, displayNote, setDisplayNote }) {
  const [avThumbnailColors, setAvThumbnailColors] = useState({}); // Store colors by note ID
  const thumbnailElems = useRef({}); // Store refs by note ID
  const baseThumbnailDivStyle =
    "flex flex-1 justify-center items-center rounded-[18px]";
  const [clicked, setClicked] = useState({});

  const setNote = async ({e, id}) => {
    // Open or CLose the Note
    const element = e.target;
    console.log(id, element.className);
    
    setClicked((prevState) => {
      const newClicked = { ...prevState };
      Object.keys(newClicked).forEach(key => {
        if (key !== id) newClicked[key] = false; // Set all others to false
      })
      newClicked[id] = !prevState[id]; // Toggle value of clicked one

      return newClicked;
    })

    /* 
    Get the element and style it accordingly
    1. Check current state of the displaye note div 
    2. Open if Closed
    3. Close if Open
    */
  }

  

  return (
    <>
      <section>
        {notes.length === 0 ? (
          <div className="flex justify-center items-center h-[200px] text-xl font-semibold text-black">
            No notes available
          </div>
        ) : (

          notes.map((note) => {

            return (

              <div
                key={note._id}
                onClick={(e) => setNote({e, id: note._id})}
                style={{backgroundColor: `${clicked[`${note._id}`] ? avThumbnailColors[note._id] : null}`}}
                className={`transition-all cursor-pointer duration-500 flex gap-4 rounded-2xl py-6 px-5 mb-4 ${clicked ? "bg-p-grey hover:bg-gray-200" : null}`}
              >

                <div
                  className={`${baseThumbnailDivStyle}
                  }]`}
                >

                  {/* Use individual color */}
                  <img
                    src={note.thumbnail || "/assets/images/testt2.png"}
                    className="bg-cover w-[100%] rounded-2xl"
                    alt="Notes thumbnail"
                    ref={(el) => (thumbnailElems.current[note.id] = el)} // Store ref with note ID
                    onLoad={() => {
                      if (thumbnailElems.current[note.id]) {
                        fac
                          .getColorAsync(thumbnailElems.current[note.id])
                          .then((color) => {
                            const lightened = chroma(color.hex).brighten().hex();
                            
                            setAvThumbnailColors((prevColors) => ({
                              ...prevColors,
                              [note._id]: (chroma(lightened).brighten().hex()),
                            }))
                      })
                          .catch((err) => console.error(err));
                      }
                    }}
                  />
                </div>

                <article 
                className="flex flex-col gap-2 max-w-[65%]"
                
                >
                  <h2 className="font-bold text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                    {note?.title}
                  </h2>
                  <p className="line-clamp-2 text-ellipsis whitespace-nowrap overflow-hidden text-wrap text-sm/relaxed">
                    {note?.content}
                  </p>

                  <div className="flex flex-1 items-center gap-2 text-black font-medium text-[10px] pt-2">
                    <span className="py-1 px-2 rounded-2xl bg-white shadow-sm">
                      {readingTime(note?.content)} mins
                    </span>
                    <p>{new Date(note?.createdAt).toLocaleString()}</p>
                  </div>
                </article>
              </div>
            );
          })
        )}
      </section>
    </>
  );
};

const NotesList = function ({ notes, displayNote, setDisplayNote }) {


  return (
    <>
      <section className="rounded-[34px] bg-white px-6 pt-8 pb-4 flex-1">
        <div className="inline-flex justify-center items-center gap-3 font-semibold text-xl">
          <img src="/assets/images/note-icon.svg" alt="Notes" className="w-7" />
          <h3>All Notes</h3>
        </div>

        <div className="flex justify-between items-center px-1 mt-6 text-btn-blue font-semibold text-md mb-8">
          <span className="text-lg">
            {notes.length} Note{`${notes.length > 1 ? "s" : ""}`}
          </span>
          
          <div className="relative p-0">
            <FilterDropdown />
          </div>
          
        </div>

        {/* Here, we shall map the content in accordance with the number of notes existing. Let's build the UI components first */}
        <NotesAsList notes={notes} displayNote={displayNote} setDisplayNote={setDisplayNote} />
      </section>
    </>
  );
};

export default NotesList;
