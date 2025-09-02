import React from "react";
import axios from "axios";

export default function Profile({
  setUserLoginData,
  setIsUserLoggedIn,
  isUserLoggedIn,
  userLoginData,
}) {
  let ViteApiUrl = import.meta.env.VITE_API_URL;

  async function handleSignUp(e) {
    e.preventDefault();
    let Data = {
      fullName: e.target.fullName.value,
      avatar: e.target.avatar.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    let Res = await axios.post(`${ViteApiUrl}/users/register`, Data);

   if (Res.data.status == "success") {
      localStorage.setItem("userLoginData", JSON.stringify(Res.data.data));
      setUserLoginData(Res.data.data);
      setIsUserLoggedIn(true);
      window.location.reload();
    } else {
      alert(Res.data.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    let Data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    let Res = await axios.post(`${ViteApiUrl}/users/login`, Data);

    if (Res.data.status == "success") {
      localStorage.setItem("userLoginData", JSON.stringify(Res.data.data));
      setUserLoginData(Res.data.data);
      setIsUserLoggedIn(true);
      window.location.reload();
    } else {
      alert(Res.data.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>

      {isUserLoggedIn ? (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 text-center">
          <img
            src={userLoginData.avatar || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-600"
          />
          <h2 className="text-xl font-semibold">{userLoginData.fullName}</h2>
          <p className="text-gray-400">{userLoginData.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem("userLoginData");
              setIsUserLoggedIn(false);
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-3 w-80"
          >
            <h2 className="text-xl font-semibold mb-2">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="p-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="p-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Login
            </button>
          </form>

          {/* Register Form */}
          <form
            onSubmit={handleSignUp}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-3 w-80"
          >
            <h2 className="text-xl font-semibold mb-2">Register</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Your Name"
              className="p-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="avatar"
              placeholder="Enter Your Profile Pic Link"
              className="p-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="p-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="p-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
