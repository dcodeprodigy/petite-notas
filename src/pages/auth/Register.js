import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";









const Register = () => {
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
        <p className="mb-2 pt-3 pb-3 text-center">
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
            />
            <span ref={idSpanRef} className={styles.spanStyles}>
              Email or Username
            </span>
          </label>

          {notValidated?.identifier && (
            <div className="text-red-600 text-xs text-left mt-2">
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
            <div className="text-red-500 text-xs text-left mt-2">
              {notValidated.pwdMsg}
            </div>
          )}
        </div>

        {!isLoading ? (
          <button
            type="submit"
            ref={loginBtn}
            className="p-3 w-[100%] bg-btn-blue text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>
        ) : (
          <Button
            fullWidth
            loading
            loadingPosition="center"
            variant="outlined"
            sx={{ padding: "1.35rem", borderRadius: "6px" }}
          ></Button>
        )}

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
      <ToastContainer />
    </div>
  );
}





  export default Register