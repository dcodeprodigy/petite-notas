import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

const DropdownSelector = ({ Dropdown, setDropdown }) => {
  const selectDrop = () => { setDropdown(!Dropdown) };
  return (
    <>
      <ul className="list-none rounded-lg shadow-md bg-white absolute -bottom-24 z-10 text-black font-normal text-sm">
        <li
          key="notes"
          onClick={selectDrop}
          className="hover:bg-slate-100 py-3 px-10 cursor-pointer transition-all duration-500 rounded-tr-lg rounded-tl-lg"
        >
          Notes
        </li>
        <li
          key="todo"
          onClick={selectDrop}
          className="hover:bg-slate-100 py-3 px-10 cursor-pointer transition-all duration-500 rounded-bl-lg rounded-br-lg"
        >
          To Do
        </li>
      </ul>
    </>
  );
};

const Dropdown = () => {
  const [Dropdown, setDropdown] = useState(false);
  return (
    <>
      <IoFilterOutline
        style={{ fontSize: "2rem", color: "#131316", cursor: "pointer" }}
        onClick={() => setDropdown(!Dropdown)} // Set its value to opposite the way it was
      />
      {Dropdown ? <DropdownSelector Dropdown={Dropdown} setDropdown={setDropdown} /> : null}
    </>
  );
};

export default Dropdown;
