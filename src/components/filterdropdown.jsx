import React from "react";
import { RiDropdownList } from "react-icons/ri";

const Dropdown = () => {

    return (
        <>
          <div className="rounded-sm shadow-md p-4">
            <ul className="list-none">
                <li>Notes</li>
                <li>To-Do</li>
            </ul>
          </div>
        </>
    )
}

export default Dropdown;