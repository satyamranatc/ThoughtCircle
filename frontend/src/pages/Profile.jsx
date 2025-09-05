import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({
  setUserLoginData,
  setIsUserLoggedIn,
  isUserLoggedIn,
  userLoginData,
}) {
  const ViteApiUrl = import.meta.env.VITE_API_URL;
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn && userLoginData?._id) {
      fetchMyPosts();
    }
  }, [userLoginData, isUserLoggedIn]);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.get(
        `${ViteApiUrl}/thoughts/listByAuthor/${userLoginData._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMyPosts(data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e, isLogin = true) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = isLogin 
      ? {
          email: formData.get("email"),
          password: formData.get("password"),
        }
      : {
          fullName: formData.get("fullName"),
          avatar: formData.get("avatar"),
          email: formData.get("email"),
          password: formData.get("password"),
        };

    try {
      const endpoint = isLogin ? "/users/login" : "/users/register";
      const response = await axios.post(`${ViteApiUrl}${endpoint}`, data);

      if (response.data.status === "success") {
        localStorage.setItem("userLoginData", JSON.stringify(response.data.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setUserLoginData(response.data.data);
        setIsUserLoggedIn(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsUserLoggedIn(false);
    setUserLoginData(null);
    setMyPosts([]);
  };

  if (isUserLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Profile Section */}
        <div className="text-center space-y-4">
          <img
            src={userLoginData.avatar || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold">{userLoginData.fullName}</h1>
            <p className="text-gray-600">{userLoginData.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        {/* Posts Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Posts</h2>
          
          {loading ? (
            <p className="text-gray-500">Loading posts...</p>
          ) : myPosts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {myPosts.map((post) => (
                <div key={post._id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-2">{post.thoughtTitle}</h3>
                  <p className="text-gray-600">{post.thoughtText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-center">Welcome</h1>
      
      {/* Login Form */}
      <div className="space-y-6">
        <form onSubmit={(e) => handleAuth(e, true)} className="space-y-4">
          <h2 className="text-lg font-medium">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-500">or</div>

        {/* Register Form */}
        <form onSubmit={(e) => handleAuth(e, false)} className="space-y-4">
          <h2 className="text-lg font-medium">Register</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="url"
            name="avatar"
            placeholder="Profile Picture URL (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}