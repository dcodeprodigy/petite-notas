import React from "react";
import { RiSettingsLine } from "react-icons/ri";
import { HiOutlinePlus } from "react-icons/hi2";

const Header = function ({ user }) {
  const settingsIcon = (
    <RiSettingsLine style={{ fontSize: "1em", color: "#64512B" }} />
  );
  const addIcon = (
    <HiOutlinePlus
      className="text-t-grey"
      style={{ fontSize: "1.5rem", color: "#000" }}
    />
  );

  return (
    <>
      <header className="flex flex-row-reverse sm:flex-row justify-between max-w-[85%] h-16 items-center bg-white rounded-xl px-5  m-auto text-base">

        <div className="flex flex-row justify-between items-center gap-2">
          <img
            src={user?.profileImg}
            alt={`${user?.fName} ${user?.lName || ""}`}
            className="max-w-10 max-h-10 rounded-[50%] border-2 border-btn-blue bg-cover flex-shrink"
          />
          <p className="font-medium">
            {user?.fName}{" "}
            {user?.lName && window.innerWidth > 600 ? user?.lName : ""}
          </p>
        </div>

        <img
          src="/assets/images/p%20notas.png"
          alt="P. Notas"
          className="max-h-[50%] max-w-[50%] flex-shrink"
        />

        {NavBar({addIcon, settingsIcon})}
      </header>
    </>
  );
};

const NavBar = function ({ addIcon, settingsIcon }) {
  if (window.innerWidth > 600) {
    return (
      <nav className="flex justify-between items-center gap-3">
        <span className="bg-p-grey rounded-md py-1 px-1 cursor-pointer">
          {addIcon}
        </span>
        <button className="flex justify-between items-center gap-1 px-6 py-2 bg-btn-yellow rounded-xl text-t-grey font-medium">
          {settingsIcon}
          <span className="">Settings</span>
        </button>
      </nav>
    );
  }
};

export default Header;
