import React from 'react'
import axios from 'axios'
export default function Profile({setUserLoginData,setIsUserLoggedIn,isUserLoggedIn,userLoginData}) {

  let ViteApiUrl = import.meta.env.VITE_API_URL
  async function handleSignUp(e){
    e.preventDefault()
    let Data = {
      fullName:e.target.fullName.value,
      profilePic:e.target.profilePic.value,
      email:e.target.email.value,
      password:e.target.password.value
    }
    console.log(Data);
    let Res = await axios.post(`${ViteApiUrl}/users/register`,Data);
    console.log(Res.data);

    localStorage.setItem("userLoginData",JSON.stringify(Res.data.data))
    setUserLoginData(Res.data.data)
    setIsUserLoggedIn(true)
    window.location.reload()


  }
  return (
    <div>
      <center>
        <h1>Profile Page</h1>

        {
          isUserLoggedIn?
          <>
            <h2>{userLoginData.fullName}</h2>
            <h2>{userLoginData.email}</h2>
          </>
          :
          <>
           <div className='flex gap-2 ' >

            <form >
              <input type="email" name="email" placeholder='Enter Your Email' className='border border-black' />
              <input type="password" name="password" placeholder='Enter Your Password' className='border border-black' />
              <button type='submit' className='border border-black'>Login</button>
            </form>

            <form onSubmit={handleSignUp} >
              <input type="text" name="fullName" placeholder='Enter Your Name' className='border border-black' />
              <input type="text" name="profilePic" placeholder='Enter Your Profile Pic Link' className='border border-black' />
              <input type="email" name="email" placeholder='Enter Your Email' className='border border-black' />
              <input type="password" name="password" placeholder='Enter Your Password' className='border border-black' />
              <button type='submit' className='border border-black'>Register</button>
            </form>

           </div>
          </>
        }

      </center>
    </div>
  )
}
