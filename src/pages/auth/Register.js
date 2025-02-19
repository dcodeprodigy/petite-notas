import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { GiCheckMark } from "react-icons/gi";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";

const styles = {
  spanStyles:
    "absolute left-4 top-[30%]  transition-all peer-focus:-translate-y-6 peer-focus:bg-white  peer-focus:text-[10px] peer-focus:px-[4px] peer-focus:-ml-1  peer-focus:rounded-xl cursor-text text-t-grey",
  keepsPlaceholderUp: [
    "-translate-y-6",
    "text-[10px]",
    "rounded-xl",
    "-ml-1",
    "px-[4px]",
  ],
  disableInput: ["disabled:opacity-50", "disabled:cursor-not-allowed"],
};

const Register = () => {
  const emailRef = useRef(null);
  const emailSpanRef = useRef(null);
  const usernameRef = useRef(null);
  const usernameSpanRef = useRef(null);
  const passRef = useRef(null);
  const passSpanRef = useRef(null);
  const signupBtn = useRef(null);
  let [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  const [notValidated, setNotValidated] = useState({
    email: null,
    password: null,
    username: null,
    emailMsg: "",
    pwdMsg: "",
    usernameMsg: "",
  });
  const [isValidated, setIsValidated] = useState({
    email: null,
    pwd: null,
    username: null,
  });

  const navigate = useNavigate();
  const { email, username, password } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let newIsValidated = {...isValidated};
    let newNotValidated = {...notValidated};


    if (name === "username") {
        newIsValidated.username = false;

        if (!value) {
          newNotValidated = {...newNotValidated, username : true, usernameMsg: "This field cannot be empty"}
        } else if (!value.match(/^[A-Za-z0-9_-]+$/)) {
          newNotValidated = {...newNotValidated, username : true, usernameMsg: "This field contains disallowed characters (e.g. spaces or special symbols)"}
        } else {
            newIsValidated.username = true;
            newNotValidated = {...newNotValidated, username : false, usernameMsg: "Looks good"}
        }
        setIsValidated(newIsValidated); setNotValidated(newNotValidated);
    }


    if (name === "email") {
      newIsValidated.email = false;

      if (!value) {
        newNotValidated = {...newNotValidated, email : true, emailMsg: "This field cannot be empty"}
      } else if (!value.match(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/)) {
        newNotValidated = {...newNotValidated, email : true, emailMsg: "Please enter a valid email address"}
      } else {
        newIsValidated = {...newIsValidated, email: true}
        newNotValidated = {...newNotValidated, email: false, emailMsg: "Looks good"}
      }
      setIsValidated(newIsValidated); setNotValidated(newNotValidated);
    }

    if (name === "password") {
     newIsValidated.pwd = false;
     
     if (!value) {
      newNotValidated = { ...newNotValidated, password : true, pwdMsg: "This field cannot be empty" }
     } else if (!value.match(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)) {
      newNotValidated = {...newNotValidated, password: true, pwdMsg: "Password must be at least 8 characters and include at least one letter and one number"}
     } else {
      newIsValidated.pwd = true;
      newNotValidated = {...newNotValidated, password: false, pwdMsg: "Looks good"}
     }

     setIsValidated(newIsValidated); setNotValidated(newNotValidated);

    }

    console.log(newNotValidated);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email && !password && !username) {
      return setNotValidated({
        ...notValidated,
        email: true,
        password: true,
        username: true,
        emailMsg: "This field cannot be blank",
        usernameMsg: "This field cannot be blank",
        pwdMsg: "This field cannot be blank",
      });
    } else if (!email) {
      return setNotValidated({
        ...notValidated,
        email: true,
        emailMsg: "This field cannot be blank",
      });
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return setNotValidated({
        ...notValidated,
        email: true,
        emailMsg: "Email address must be of valid type",
      });
    } else if (!password) {
      return setNotValidated({
        ...notValidated,
        password: true,
        pwdMsg: "This field cannot be blank",
      });
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      return setNotValidated({
        ...notValidated,
        password: true,
        pwdMsg:
          "Password cannot be less than 8 characters & must contain at least 1 letter and 1 digit",
      });
    } else if (!username) {
      return setNotValidated({
        ...notValidated,
        username: true,
        usernameMsg: "This field cannot be blank",
      });
    } else if (!username.match(/^[A-Za-z0-9_-]+$/)) {
      return setNotValidated({
        ...notValidated,
        username: true,
        usernameMsg:
          "Username contains one or more disallowed characters (e.g, an empty space or special characters)",
      });
    }

    function displayToast(success, msg) {
      if (success) {
        toast.success(msg, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      } else {
        toast.error(msg, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/register`,
        {
          email,
          username,
          password,
        }
      );

      if (res.status === 200) {
        displayToast(true, "Registeration Successful");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        displayToast(
          false,
          res.data.msg || "An error occured while signing you up"
        ); // On successful login
        return setError(res.data.msg);
      }
    } catch (err) {
      displayToast(false, "An error occured while logging you in."); // On successful login
      setError(err.response?.data?.msg || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleBlur(e) {
    const target = e.target;
    if (target === emailRef.current) {
      if (emailRef.current.value.length > 0) {
        styles.keepsPlaceholderUp.forEach((style) => {
          emailSpanRef.current.classList.add(style);
        });
      } else {
        styles.keepsPlaceholderUp.forEach((style) => {
          emailSpanRef.current.classList.remove(style);
        });
      }
    } else if (target === usernameRef.current) {
      if (usernameRef.current.value.length > 0) {
        styles.keepsPlaceholderUp.forEach((style) => {
          usernameSpanRef.current.classList.add(style);
        });
      } else {
        styles.keepsPlaceholderUp.forEach((style) => {
          usernameSpanRef.current.classList.remove(style);
        });
      }
    } else if (target === passRef.current) {
      if (passRef.current.value.length > 0) {
        styles.keepsPlaceholderUp.forEach((style) => {
          passSpanRef.current.classList.add(style);
        });
      } else {
        styles.keepsPlaceholderUp.forEach((style) => {
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
        className="flex flex-col flex-1 justify-center items-center p-6 py-9 rounded-xl w-[100%] h-[100%] sm:max-w-[85%] md:max-w-96 lg:max-w-md bg-white shadow-md"
      >
        <div className="flex justify-start mb-3">
          <img
            src="/assets/images/p%20notas.png"
            alt="Petite Notas"
            className="w-[29%] m-auto"
          />
        </div>

        <h2 className="py-2 font-medium text-lg">Sign up for Little Notes</h2>

        {error && (
          <div className="mb-4 text-red-500 font-medium text-xs">{error}</div>
        )}

        <div className="relative w-[100%] mb-5">
          <label className="relative block w-[100%]">
            <input
              type="text"
              ref={emailRef}
              name="email"
              value={email}
              onBlur={handleBlur}
              onChange={onChange}
              disabled={isLoading ? true : false}
              className="peer p-3 border border-p-grey shadow-sm w-[100%] focus:outline-btn-blue focus:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span ref={emailSpanRef} className={styles.spanStyles}>
              Email
            </span>
          </label>

          {notValidated?.email && (
            <div className="text-red-600 text-xs text-left mt-2 pl-3">
              {notValidated.emailMsg}
            </div>
          )}
          {!notValidated?.email && notValidated.emailMsg && (
            <div className="text-green-700 text-xs text-left inline-flex gap-2 mt-2 pl-3">
              {notValidated.emailMsg} {<GiCheckMark />}
            </div>
          )}
        </div>

        <div className="relative w-[100%] mb-5">
          <label className="relative block w-[100%]">
            <input
              type="text"
              ref={usernameRef}
              name="username"
              value={username}
              onBlur={handleBlur}
              onChange={onChange}
              disabled={isLoading ? true : false}
              className="peer p-3  border border-p-grey shadow-sm w-[100%] focus:outline-btn-blue focus:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span ref={usernameSpanRef} className={styles.spanStyles}>
              Username
            </span>
          </label>

          {notValidated?.username && (
            <div className="text-red-600 text-xs text-left mt-2 pl-3">
              {notValidated.usernameMsg}
            </div>
          )}
          {!notValidated?.username && notValidated.usernameMsg && (
            <div className="inline-flex gap-2 text-green-700 text-xs text-left mt-2 pl-3">
              {notValidated.usernameMsg} {<GiCheckMark />}
            </div>
          )}
        </div>

        <div className="relative w-[100%] mb-8">
          <label className="relative block w-[100%]">
            <input
              type={passwordVisible ? "text" : "password"}
              ref={passRef}
              name="password"
              value={password}
              onChange={onChange}
              onBlur={handleBlur}
              disabled={isLoading ? true : false}
              className="peer p-3 pr-8 border border-p-grey shadow-sm w-[100%] focus:outline-btn-blue focus:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span ref={passSpanRef} className={styles.spanStyles}>
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

          {notValidated?.password && (
            <div className="text-red-500 text-xs text-left mt-2 pl-3">
              {notValidated.pwdMsg}
            </div>
          )}

          {!notValidated?.password && notValidated.pwdMsg && (
            <div className="inline-flex gap-2 text-green-700  text-xs text-left mt-2 pl-3">
              {notValidated.pwdMsg} {<GiCheckMark />}
            </div>
          )}
        </div>

        {!isLoading ? (
          <button
            type="submit"
            ref={signupBtn}
            className="p-3 w-[100%] bg-btn-blue text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading ? true : false}
          >
            Signup
          </button>
        ) : (
          <Button
            fullWidth
            loading
            loadingPosition="center"
            variant="outlined"
            sx={{
              padding: "1.35rem",
              borderRadius: "6px",
              opacity: "0.7",
              backgroundColor: "#8da6ff",
            }}
          ></Button>
        )}

        <span className="pt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-medium hover:underline">
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;