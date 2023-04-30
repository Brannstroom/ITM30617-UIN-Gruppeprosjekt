import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SanityClient from "../client.js";

export default function Login() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [user] = useState(localStorage.getItem("user"));
  const [errorMessage, setErrorMessage] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  const inputClasses = 'border-2 border-gray-400 rounded-lg p-2 m-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600';

  const loginCheck = (event) => {
    event.preventDefault();
    SanityClient.fetch(
      `*[_type == "user"]
      [username == "${username}" && password == "${password}"]{
          "ref": _id,
          email,
          username,
      }`
    )
      .then((data) => {
        if (data.length === 1) {
          setLogin(true);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch(console.error);
  };

  const handleUserCreation = (event) => {
    event.preventDefault();
    if (!username || !password || !email) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    // Check if username or email is already taken
    SanityClient.fetch(
      `*[_type == "user"]
      [username == "${username}" || email == "${email}"]{
          "ref": _id,
          email,
          username,
      }`
    )
      .then((data) => {
        if (data.length === 0) {
          SanityClient.create({
            _type: "user",
            username: username,
            password: password,
            email: email,
          })
            .then((data) => {
              setErrorMessage("");
              setShowSignup(false);
              clearInputInfo();
            })
            .catch(console.error);
        } else {
          setErrorMessage("Username or email already taken");
        }
      })
      .catch(console.error);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setShowSignup(true);
    clearInputInfo();
  };

  const clearInputInfo = () => {
    setErrorMessage("");
    setUsername("");
    setEmail("");
    setPassword("");
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.value = "";
    }
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setShowSignup(searchParams.get("signup") === "true");
  }, [location]);

  if (login || user) {
    window.location.href = "/library";
  }

  if (showSignup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h1 className="text-4xl font-bold mb-4">Signup</h1>
          <form className="flex flex-col justify-center items-center" onSubmit={handleUserCreation}>
            <input className={inputClasses} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" />
            <input className={inputClasses} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username" />
            <input className={inputClasses} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
            <button className="bg-gray-700 text-white rounded-lg p-2 m-2 w-64" type="submit">
              Signup
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-500">Already have an account?</span>{' '}
            <button className="text-sky-800 hover:underline focus:outline-none" onClick={() => {setShowSignup(false);clearInputInfo();}}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <form className="flex flex-col justify-center items-center" onSubmit={loginCheck}>
          <input className={inputClasses} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username" />
          <input className={inputClasses} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
          {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
          <button className="bg-gray-700 text-white rounded-lg p-2 m-2 w-64" type="submit">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-500">Don't have an account?</span>{' '}
          <button className="text-sky-800 hover:underline focus:outline-none" onClick={handleSignup}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
