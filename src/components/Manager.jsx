import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showpassword = () => {
    passRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });

    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });

    setform({ site: "", username: "", password: "" });
    toast("Password Saved ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  const deletePassword = async (id) => {
    let c = confirm("Do You Really Want To Delete?");
    if (c) {
      setpasswordArray(passwordArray.filter((items) => items.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
    toast("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.filter((items) => items.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((items) => items.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied To Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-2 md:max-w-[60vw] md:p-0 md:py-5 md:mx-auto min-h-[85.3vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Op /&gt;</span>
        </h1>
        <p className="text-lg text-green-900 text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4 gap-8 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-600 w-full text-black p-4 py-1"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            required={true}
            id="site"
          />
          <div className=" flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-600 w-full text-black p-4 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
              required={true}
              id="username"
            />
            <div className="relative ">
              <input
                ref={passRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-600 w-full text-black p-4 py-1 pr-10"
                placeholder="Enter Password"
                type="password"
                name="password"
                required={true}
                id="password"
              />
              <span
                className="absolute top-[4px]  right-[3px] cursor-pointer"
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={24}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            disabled={!form.site || !form.username || !form.password}
            className={`flex justify-center gap-2 items-center rounded-full px-8 py-2 w-fit border 
    ${
      !form.site || !form.username || !form.password
        ? "bg-green-300 cursor-not-allowed"
        : "bg-green-400 hover:bg-green-300 cursor-pointer border-green-900"
    }`}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>
              <h3>No password To Show</h3>
            </div>
          ) : (
            <table className="table-auto w-full rounded-md  overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className=" text-center   py-2 border border-white ">
                        <div className="flex items-center justify-center">
                          <a href="items.site" target="_blank">
                            {items.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer loardiconcopy "
                            onClick={() => copyText(items.site)}
                          >
                            <lord-icon
                              style={{
                                with: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center  py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{items.username}</span>
                          <div
                            className="size-7 cursor-pointer loardiconcopy "
                            onClick={() => copyText(items.username)}
                          >
                            <lord-icon
                              style={{
                                with: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" text-center  py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(items.password.length)}</span>
                          <div
                            className="size-7 cursor-pointer loardiconcopy "
                            onClick={() => copyText(items.password)}
                          >
                            <lord-icon
                              style={{
                                with: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center text-center  py-2 border border-white">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(items.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(items.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
