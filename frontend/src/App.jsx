import React,{useState,useEffect} from 'react'
import NavBar from "./components/NavBar.jsx"
import Thoughts from "./pages/Thoughts.jsx"
import Profile from "./pages/Profile.jsx"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

export default function App() {

  let [userLoginData,setUserLoginData] = useState({})
  let [isUserLoggedIn,setIsUserLoggedIn] = useState(false)
  let [loading, setLoading] = useState(true) 

  useEffect(()=>{
    const data = localStorage.getItem("userLoginData")
    if(data) {
        setUserLoginData(JSON.parse(data))
        setIsUserLoggedIn(true)
    }
    setLoading(false) // finish checking
  },[])

  function PrivateRoute({children}) {
    if (loading) return <h2>Loading</h2>; // Or show a spinner
    if (isUserLoggedIn) return children;
    return <Navigate to="/profile" />
  }

  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<PrivateRoute><Thoughts userLoginData={userLoginData} /></PrivateRoute>} />
            <Route path="/profile" element={<Profile setUserLoginData={setUserLoginData} setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} userLoginData={userLoginData} />} />
        </Routes>
    </BrowserRouter>
  )
}
