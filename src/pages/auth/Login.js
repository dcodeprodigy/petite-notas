import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

const Login = () => {
  const idRef = useRef(null);
  const idSpanRef = useRef(null);
  const passRef = useRef();
  const passSpanRef = useRef();
  let [error, setError] = useState("");
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  let [passwordVisible, setPasswordVisible] = useState(false);
  const spanStyles =
    "absolute left-4 top-[30%]  transition-all peer-focus:-translate-y-6 peer-focus:bg-white  peer-focus:text-[10px] peer-focus:px-[4px] peer-focus:-ml-1  peer-focus:rounded-xl cursor-text text-t-grey";

  const keepsPlaceholderUp = [
    "-translate-y-6",
    "text-[10px]",
    "rounded-xl",
    "-ml-1",
    "px-[4px]",
  ];

  const navigate = useNavigate();
  const { identifier, password } = formData;
  const onChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("Please enter your email/username and password");
    }

    try {
      const res = axios.post("http://localhost:5000/api/auth/login", {
        identifier,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please, try again.");
    }
  };

  function handleBlur(e) {
    const target = e.target;
    if (target === idRef.current) {
      if (idRef.current.value.length > 0) {
        console.log("did i run");
        keepsPlaceholderUp.forEach((style) => {
          idSpanRef.current.classList.add(style);
        });
      } else {
        keepsPlaceholderUp.forEach((style) => {
          idSpanRef.current.classList.remove(style);
        });
      }
    } else if (target === passRef.current) {
      console.log("did i run");
      if (passRef.current.value.length > 0) {
        keepsPlaceholderUp.forEach((style) => {
          passSpanRef.current.classList.add(style);
        });
      } else {
        keepsPlaceholderUp.forEach((style) => {
          passSpanRef.current.classList.remove(style);
        });
      }
    }
  }

  function handlePasswordVisibility() {
    !passwordVisible ? setPasswordVisible(true) : setPasswordVisible(false);
  }

  // Change the name of the email field to username on submit if value does not match the email regex
  return (
    <div className="min-h-screen flex justify-center items-center bg-primary-background p-3 md:p-0 text-sm ">
      <form
        onSubmit={onSubmit}
        className="flex flex-col flex-1 justify-center items-center p-6 py-9 rounded-xl max-w-[80%] md:max-w-96 lg:max-w-md bg-white shadow-md"
      >
        <div className="flex justify-start mb-3">
          <img
            src="/assets/images/p%20notas.png"
            alt="Petite Notas"
            className="w-[29%] m-auto"
          />
        </div>

        <h2 className="py-2 font-medium text-lg">Welcome Back, Chief!</h2>
        <p className="pt-3 pb-3 text-center">
          Please enter your email/username and password to login
        </p>

        {error && (
          <div className="m-3 text-red-500 font-medium text-xs">{error}</div>
        )}

        <label className="relative block w-[100%] m-5">
          <input
            type="text"
            ref={idRef}
            name="identifier"
            value={identifier}
            onBlur={handleBlur}
            onChange={onChange}
            placeholder=""
            className="peer p-3 border border-p-grey shadow-sm w-[100%] focus:outline-btn-blue focus:shadow-none transition-all"
            required
          />
          <span ref={idSpanRef} className={spanStyles}>
            Email or Username
          </span>
        </label>

        <div className="relative w-[100%] mb-5">
          <label className="relative block w-[100%]">
            <input
              type={passwordVisible ? "text" : "password"}
              ref={passRef}
              name="password"
              value={password}
              onChange={onChange}
              onBlur={handleBlur}
              placeholder=""
              className="peer p-3 pr-8 border border-p-grey shadow-sm  focus:outline-btn-blue focus:shadow-none w-[100%]"
              required
            />
            <span ref={passSpanRef} className={spanStyles}>
              Password
            </span>

            {passwordVisible ? (
              <LuEyeClosed
                className="absolute right-4 top-[37%] cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            ) : (
              <LuEye
                className="absolute right-4 top-[37%] cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            )}
          </label>
        </div>

        <button
          type="submit"
          className="p-3 w-[90%] bg-btn-blue text-white rounded-md"
        >
          Login
        </button>
        <span className="pt-6">
          New to Petite Notas?{" "}
          <Link to="/register" className="font-medium hover:underline">
            Sign up
          </Link>
        </span>
        <span className="pt-2">
          Dumb enough to forget password?{" "}
          <Link to="/fp" className="font-medium hover:underline">
            Recover
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
