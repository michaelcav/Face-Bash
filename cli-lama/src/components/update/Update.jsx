import  "./update.scss"
import React, {useState} from 'react';
import { makeRequest } from "../../axios";


export default function Update({setOpenUpdate}) {
const [cover, setCover] = useState(null);
const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    civilStatus: "",
  })

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
   setTexts((prev) => ({...prev, [e.target.name]: [e.target.value]}))
  }

  return (
    <div className="update">
      Update
      <form action="">
        <input type="file" name="" id="" />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
        <input type="text" name="civilStatus" onChange={handleChange} />
        <button>Update</button>
      </form>
      <button onClick={()=>setOpenUpdate(false)}>X</button>
    </div>
  )
}
