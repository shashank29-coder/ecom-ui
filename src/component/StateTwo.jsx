import React, { useState } from "react";
export function StateTwo(){
    const[text,setText] = useState("enter the text");
    const handleupclick = ()=>{

        const next = text.toUpperCase()
setText(next)
    }
     const handlelowclick = ()=>{
        const nxt = text.toLowerCase()
setText(nxt)
    }
    const handleclearclick = ()=>{
    //    const nt= text()
       setText("")
    }
    const handleonchange = (event)=>{
        setText(event.target.value)
    }
    return (
        <div>
            <textarea  id="text" value={text} onChange={handleonchange}></textarea>
            <button onClick={handleupclick}>convert in Upper</button>
            <button onClick={handlelowclick}>convert in lower</button>
            <button onClick={handleclearclick}>clear</button>
        </div>
        
    )
}