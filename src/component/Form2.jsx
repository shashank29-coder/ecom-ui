import { useState } from "react";

export function Form2(){
    const[name,setName]=useState("")
    const[city,setCity]=useState("")
    const[email,setemail]=useState("")
    const[password,setPassword]=useState("")
    const[checkbox,setCheckbox]=useState("False")
    const[gender,setGender]=useState("")
    function formclick(e){
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(checkbox)
        console.log(gender)
        console.log(city)
    }
    return(
        <>
        <form onSubmit={formclick}>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="radio" value="Male" checked={gender=="Male"} onChange={(e)=> setGender(e.target.value)} />
            <input type="radio" value="Female" checked={gender=="Female"} onChange={(e)=> setGender(e.target.value)} />
            <input type="text" checked={checkbox} onChange={(e)=> setCheckbox(e.target.value)} />
          <select value={city} setCity={(e)=>e.target.value}></select>
          <option value="">select city</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <button type="submit">submit me</button>
        </form>
        </>
    )
}