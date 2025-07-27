import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div
        className="mycontainer max-w-4xl px-10  mx-auto flex justify-between
       items-center py-5 h-14"
      >
        <div className="logo font-bold text-2xl ">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Op /&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-5">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <div className="invert">
          <lord-icon
            src="https://cdn.lordicon.com/fgxwhgfp.json"
            trigger="hover"
          ></lord-icon>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
