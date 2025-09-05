import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Thoughts({userLoginData}) {
  let navigate = useNavigate()
  let ViteApiUrl = import.meta.env.VITE_API_URL;


  let [Thoughts,setThoughts] = useState([])
  let token = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    async function getData() {
      let {data} = await axios.get(`${ViteApiUrl}/thoughts/list/${userLoginData._id}`,{
        headers: {
          "Authorization":`Bearer ${token}`
        }
      })
      console.log(data.data);
      setThoughts(data.data)
    }
    getData();
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 text-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-5 text-center" >Welcome {userLoginData.fullName}</h1>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Thoughts</h2>
        <button 
          onClick={async()=>{
            let thoughtTitle = prompt("Enter Title");
            let thoughtText = prompt("Enter Content");
            let data = {
              "thoughtTitle":thoughtTitle,
              "thoughtText":thoughtText
            }

            let Res = await axios.post(`${ViteApiUrl}/thoughts/create`,{
              ...data,
              "thoughtAuthor":userLoginData._id
            },{
              headers: {
                "Authorization":`Bearer ${token}`
              }
            })
            if(Res.data.status == "success") {
              alert("Thought Added")
              window.location.reload();
            }
          }} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
        >
          + Add New
        </button>
      </div>

      <main className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          Thoughts.map((thought)=>{
            return (
              <div 
                key={thought._id} 
                className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{thought.thoughtTitle}</h2>
                <p className="text-gray-300 mb-3">{thought.thoughtText}</p>
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>{thought.thoughtAuthor.fullName}</span>
                  <span>{new Date(thought.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            )
          })
        }
      </main>
    </div>
  )
}
