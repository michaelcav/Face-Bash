import  "./update.scss"
import React, {useState} from 'react'

export default function Update({setOpenUpdate}) {
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    civilStatus: "",
  })

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
        {/* <input type="text" name="name" onChange={handleChange} /> */}
      </form>
      <button onClick={()=>setOpenUpdate(false)}>X</button>
    </div>
  )
}
