import React from "react";
import Todos from "./todo";
import readingTime from "../utilis/reading-time-calc";

const DisplayNote = function ({ notes, todos }) {
  return (
    <>
      {/* This displays an open note */}
      <section className=" flex flex-col flex-1 gap-4">
        <div className="flex flex-col bg-white px-6 py-8 rounded-[34px] sticky top-0">
          <div className="flex justify-between mb-4 gap-[calc(3%/2)] items-center">
            <div className="p-1 flex justify-center items-center bg-btn-blue rounded-lg max-w-[10%]">
              <img
                src={notes[0]?.thumbnail || "/assets/images/notes-img-a.png"}
                className="bg-contain w-[90%]"
                alt="Notes thumbnail"
              />
            </div>

            <h3 className="font-bold items-center text-xl text-ellipsis whitespace-nowrap overflow-hidden flex-grow-0 flex-shrink">
              {notes[0]?.title}
            </h3>

            <button className="bg-btn-blue px-4 py-2 rounded-lg text-white font-medium">
              Edit
            </button>
          </div>

          <article className="mb-8 text-sm/7 font-medium max-h-[90vh] overflow-y-auto sticky top-0">
            <hr className="border-t-2 text-[#000]" />
            <span className="text-btn-blue px-2 py-1 text-xs rounded-xl my-5 inline-block bg-[#E7E5FC] font-medium  ">
              {readingTime(notes[0]?.content)} mins
            </span>
            <br></br>
            {notes[0]?.content}
            <div className="flex justify-between items-center">
              <div></div>
              <button className="bg-btn-blue px-4 py-2 rounded-lg text-white font-medium cursor-pointer">
                Save
              </button>
            </div>
          </article>
        </div>

        <div className="flex flex-col gap-4">
          <Todos todos={todos} />
        </div>
      </section>
    </>
  );
};

export default DisplayNote;
