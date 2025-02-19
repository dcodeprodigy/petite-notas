import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
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

const Login = () => {
  const idRef = useRef(null);
  const idSpanRef = useRef(null);
  const passRef = useRef(null);
  const passSpanRef = useRef(null);
  const loginBtn = useRef(null);
  let [error, setError] = useState("");
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [notValidated, setNotValidated] = useState({
    password: null,
    identifier: null,
    idMsg: "",
    pwdMsg: "",
  });

  const navigate = useNavigate();
  const { identifier, password } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "identifier") {
      if (value.length > 0 ) {
        setNotValidated({
          ...notValidated,
          identifier: null,
          idMsg: ""
        })
      } else {
        setNotValidated({
          ...notValidated,
          identifier: true,
          idMsg: "Email/username field may not be empty"
        })
      }

    } else if (name === "password") {
      if (value.length > 0) {
        setNotValidated({
          ...notValidated,
          password: null,
          pwdMsg: ""
        })
      }
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier && !password) {
      setNotValidated({
        ...notValidated,
        identifier: true,
        password: true,
        idMsg: "Email/Username field may not be empty",
        pwdMsg: "Password field may not be empty",
      });
      return;
    } else if (!identifier) {
      return setNotValidated({
        ...notValidated,
        identifier: true,
        idMsg: "Email/Username field may not be empty",
      });
    } else if (!password) {
      return setNotValidated({
        ...notValidated,
        password: true,
        pwdMsg: "Password field may not be empty",
      });
    } else if (password.length < 8) {
      return setNotValidated({
        ...notValidated,
        password: true,
        pwdMsg: "Password cannot be less than 8 characters",
      });
    }

    // On passing validaiton
    setNotValidated({
      ...notValidated,
      password: false,
      identifier: false,
      idMsg: "",
      pwdMsg: ""
    });

    function displayToast(success, msg) {
      if (success) {
        toast.success(msg, {
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
        `${process.env.REACT_APP_URL}/api/auth/login`,
        {
          identifier,
          password,
        }
      );

      if (res.status === 200) {
        displayToast(true, "Authentication Successful"); // On successful login
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        displayToast(
          false,
          res.data.msg || "An error occured while trying to log you in."
        ); // On successful login
        return setError(res.data.msg);
      }
    } catch (err) {
      displayToast(false, "An error occured while logging you in."); // On successful login
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  function handleBlur(e) {
    const target = e.target;
    if (target === idRef.current) {
      if (idRef.current.value.length > 0) {
        styles.keepsPlaceholderUp.forEach((style) => {
          idSpanRef.current.classList.add(style);
        });
      } else {
        styles.keepsPlaceholderUp.forEach((style) => {
          idSpanRef.current.classList.remove(style);
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

        <h2 className="py-2 font-medium text-lg">Welcome Back, Chief!</h2>
        <p className="mb-0 pt-3 pb-3 text-center">
          Please enter your email/username and password to login
        </p>

        {error && (
          <div className="mb-4 text-red-500 font-medium text-xs">{error}</div>
        )}

        <div className="relative w-[100%] mb-5">
          <label className="relative block w-[100%]">
            <input
              type="text"
              ref={idRef}
              name="identifier"
              value={identifier}
              onBlur={handleBlur}
              onChange={onChange}
              placeholder=""
              className="peer p-3 border border-p-grey shadow-sm w-[100%] focus:outline-btn-blue focus:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading ? true : false}
            />
            <span ref={idSpanRef} className={styles.spanStyles}>
              Email or Username
            </span>
          </label>

          {notValidated?.identifier && (
            <div className="text-red-600 text-xs text-left mt-2 pl-3">
              {notValidated.idMsg}
            </div>
          )}
        </div>

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
              disabled={isLoading ? true : false}
              className="peer p-3 pr-8 border border-p-grey shadow-sm  focus:outline-btn-blue focus:shadow-none w-[100%] disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>

        {!isLoading ? (
          <button
            type="submit"
            ref={loginBtn}
            className="p-3 w-[100%] bg-btn-blue text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading ? true : false}
          >
            Login
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
          New to Petite Notas?{" "}
          <Link to="/register" className="font-medium hover:underline">
            Sign up
          </Link>
        </span>
        <span className="pt-2">
          Did someone forget their password?{" "}
          <Link to="/fp" className="font-medium hover:underline">
            Recover
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;