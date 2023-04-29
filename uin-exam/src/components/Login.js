import React, { useState } from "react";
import SanityClient from "../client.js";

export default function Login() {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState(localStorage.getItem("user"));

    const loginCheck = (event) => {
        event.preventDefault();
        SanityClient.fetch(
            `*[_type == "user"]
            [username == "${username}" && password == "${password}"]{
                "ref": _id,
                id,
                email,
                username,
            }`
        ).then((data) => {
            setUser(data);
            if (data.length === 1) {
                setLogin(true);
                localStorage.setItem("user", JSON.stringify(data));
            }
        }).catch(console.error);
    }    
    if (login || user) {
        const userData = JSON.parse(localStorage.getItem("user"));
        return (
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold">Welcome, {userData[0]?.username}!</h1>
            </div>
          </div>
        );
      }
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">Login</h1>
                <form className="flex flex-col justify-center items-center" onSubmit={loginCheck}>
                  <input className="border-2 border-black rounded-lg p-2 m-2" onChange={event => setUsername(event.target.value)} type="text" placeholder="Username" />
                  <input className="border-2 border-black rounded-lg p-2 m-2" onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" />
                  <button className="border-2 border-black rounded-lg p-2 m-2" type="submit">Login</button>
                </form>
              </div>
            </div>
          );
      }