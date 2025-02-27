import { List } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { FastAverageColor } from 'fast-average-color';
import readingTime from "../utilis/reading-time-calc";

const fac = new FastAverageColor();

const NotesAsList = function ({ notes }) {
  const [avThumbnailColors, setAvThumbnailColors] = useState({}); // Store colors by note ID
  const thumbnailElems = useRef({}); // Store refs by note ID
  const baseThumbnailDivStyle = " flex flex-1 justify-center items-center bg-btn-blue rounded-[18px] ";

  useEffect(() => {
    // Calculate colors for  all notes when the component mounts or notes change
    notes.forEach(note => {
      const calculateColor = async () => {
        if (thumbnailElems.current[note.id]) {
          try {
            const color = await fac.getColorAsync(thumbnailElems.current[note.id]);
            setAvThumbnailColors(prevColors => ({ ...prevColors, [note.id]: color.hex }));
          } catch (error) {
            console.error("Error getting average color:", error);
            setAvThumbnailColors(prevColors => ({ ...prevColors, [note.id]: '#FFFFFF' })); // Default color
          }
        }
      };
      calculateColor();
    });
  }, [notes]);

  return (
    <>
      <section>
        {notes.length === 0 ? (
          <div className="flex justify-center items-center h-[200px] text-xl font-semibold text-t-grey">No notes available</div>
        ) : (
          notes.map(note => {
            return (
              <div
                key={note.id}
                className="flex gap-4 bg-p-grey rounded-2xl py-6 px-5 mb-4"
              >
                <div className={`${baseThumbnailDivStyle}  bg-[${avThumbnailColors[note.id] || '#FFFFFF'}]`}> {/* Use individual color */}
                  <img
                    src={note.thumbnail || "/assets/images/testimg.jpg"}
                    className="bg-contain w-[100%]"
                    alt="Notes thumbnail"
                    ref={el => (thumbnailElems.current[note.id] = el)} // Store ref with note ID
                    onLoad={() => {
                      if (thumbnailElems.current[note.id]) {
                        fac.getColorAsync(thumbnailElems.current[note.id])
                          .then(color => setAvThumbnailColors(prevColors => ({...prevColors, [note.id]:color.hex})))
                          .catch(err => console.error(err));
                      }
                    }}
                  />
                </div>

                <article className="flex flex-col gap-2 max-w-[65%]">
                  <h2 className="font-bold text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                    {note?.title}
                  </h2>
                  <p className="line-clamp-2 text-ellipsis whitespace-nowrap overflow-hidden text-wrap text-sm/relaxed">
                    {note?.content}
                  </p>

                  <div className="flex flex-1 items-center gap-2 text-t-grey font-medium text-[10px] pt-2">
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

const NotesList = function ({ notes }) {
  const filterIcon = (
    <IoFilterOutline
      style={{ fontSize: "2rem", color: "#131316", cursor: "pointer" }}
    />
  );

  return (
    <>
      <section className="rounded-[34px] bg-white px-6 pt-8 pb-4 flex-1">
        <div className="inline-flex justify-center items-center gap-3 font-semibold text-xl">
          <img src="/assets/images/note-icon.svg" alt="Notes" className="w-7" />
          <h3>All Notes</h3>
        </div>

        <div className="flex justify-between items-center px-1 mt-6 text-btn-blue font-semibold text-md mb-8">
          <span className="text-lg">{notes.length} Notes</span>
          {filterIcon}
        </div>

        {/* Here, we shall map the content in accordance with the number of notes existing. Let's build the UI components first */}
        <NotesAsList notes={notes} />
      </section>
    </>
  );
};

export default NotesList;