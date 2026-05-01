import React, { useState } from "react";
export function FilterMemo(){
    const[filternum,setFilternum] = useState([1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9, 10, 11]);
    const filternumber = ()=>{
        const num= filternum.filter(num=>num%2===0);
        setFilternum(num);
    }
    const handleonchange = (event)=>{
setFilternum= (event.target.value)
    }
     return (
        <div>
            <textarea  id="filternum" value={filternum} onChange={handleonchange}></textarea>
            <button onClick={filternumber}>filter it</button>
           
        </div>
     )
}