import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='bg-black flex justify-between px-4 py-2'>
      <h2 className='text-white text-2xl weight-bold' >Thought Circle</h2>
      <ul className='flex justify-between gap-2.5' >
        <li className='active:text-indigo-500 text-white'  ><Link to={"/"} >Thoughts</Link></li>
        <li className='active:text-indigo-500 text-white'  ><Link to={"/profile"} >Profile</Link></li>
      </ul>
    </div>
  )
}
