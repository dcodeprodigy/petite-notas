import React from "react";
import { IoFilterOutline } from "react-icons/io5";


const AllNotes = function ({notes}) {
  const filterIcon = <IoFilterOutline style={{ fontSize: "1rem" }} />;

  return (
    <>
      <section className="rounded-xl bg-white px-6 py-8">
        <div className="inline-flex gap-3 font-bold text-xl">
          <img
            src="/assets/images/note-icon.svg"
            alt="Notes"
            className="w-7 font-bold"
          />
          <h3>All Notes</h3>
        </div>
        <div className="flex justify-between text-sm mt-6 text-btn-blue font-medium">
          <span>{notes.length} Notes</span>
          <filterIcon />
        </div>
      </section>

      {/* This displays an open note */}
      <section className="rounded-xl bg-white px-6 py-8">
        <div className="flex justify-between mb-4">
          <div className="flex justify-between items-center gap-3">
            <img
              src="/assets/images/notes-thumbnail.webp"
              className="h-[50px]"
              alt="Notes thumbnail"
            />
            <h3 className="font-bold text-2xl">
              {notes[0]?.title || "Salsile Project Brief"}
            </h3>
          </div>
          <button className="bg-btn-blue px-4 py-1 rounded-lg text-white font-medium">
            Edit
          </button>
        </div>
        <hr className="border-t-2 text-[#000]" />
        <span className="text-btn-blue px-2 py-1 text-xs rounded-xl my-5 inline-block bg-[#E7E5FC] font-medium  ">
          4 mins
        </span>
        <article className="mb-8">
          {notes[0]?.content ||
            "Salsile Inc. is a well-established fashion retailer specializing in high-quality clothing and accessories for men and women. The client is looking to revamp their existing e-commerce website to enhance user experience, improve overall aesthetics, and increase online sales. The new design should reflect their brand identity as a modern, and customer-centric fashion store."}
        </article>

        <div className="flex justify-between items-center">
          <div></div>
          <button className="bg-btn-blue px-4 py-2 rounded-lg text-white font-medium cursor-pointer">
            Save
          </button>
        </div>
      </section>
    </>
  );
};

export default AllNotes;
