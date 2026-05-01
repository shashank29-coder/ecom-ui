import React, { useState } from "react";
export function Forms(){
    const [ name,setName] = useState("")
     const [ email,setEmail] = useState("")
      const [ password,setPassword] = useState("")

      const [isChecked, setIsChecked] = useState(false)
      const [gender, setGender] = useState("")
      const [city, setCity] = useState("")


      function handleSubmit (e){
        e.preventDefault()
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(isChecked)
        console.log(gender)
        console.log(city)
      }

      return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />

            <input type="checkbox" checked={isChecked} onChange={(e) =>  setIsChecked(e.target.checked)} />
            <input type="radio" value="Male" checked={gender === "Male" } onChange={(e) => setGender(e.target.value)} />
            <input type="radio" value="Female" checked={gender === "Female" } onChange={(e) => setGender(e.target.value)} />

            <select value={city} onChange={(e) => setCity(e.target.value)} >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Mumbai">Mumbai</option>
            </select>

            <button type="submit" >Submit</button>
        </form>
        </>
      )
}