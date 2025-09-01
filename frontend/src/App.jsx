import React,{useState,useEffect} from 'react'

import NavBar from "./components/NavBar.jsx"

import Thoughts from "./pages/Thoughts.jsx"
import Profile from "./pages/Profile.jsx"

import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom"


export default function App() {



  let [userLoginData,setUserLoginData] = useState({})
  let [isUserLoggedIn,setIsUserLoggedIn] = useState(true)

  useEffect(()=>{
    if(localStorage.getItem("userLoginData"))
    {
        setUserLoginData(JSON.parse(localStorage.getItem("userLoginData")))
        setIsUserLoggedIn(true)
        console.log(userLoginData);

    }
  },[isUserLoggedIn])

  function PrivateRoute({children}) {
    if(isUserLoggedIn)
    {
        return children
    }
    else
    {
        return <Navigate to="/profile" />
    }
  }

  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route path="/" element={<PrivateRoute><Thoughts /></PrivateRoute>} />
            <Route path="/profile" element={<Profile setUserLoginData={setUserLoginData} setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} userLoginData={userLoginData} />} />
        </Routes>
    </BrowserRouter>
  )
}
