import React, { useState } from "react";

export function Counts(){
   
    const[name , value] = useState(0);

    return(
        <>
        <h1> name:{name}</h1>
        <button onClick={() => value(name+1) }>+</button>
        <button onClick={() => value(name-1) }>-</button>
        <button onClick={() => value(0) }>+</button>
        </>
    )
   
}