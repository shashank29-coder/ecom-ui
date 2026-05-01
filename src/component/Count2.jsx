import React, { useState } from "react";

export function Count2(){

const[count,setCount]= useState(0);
return(

<>

<button onClick={() => setCount(count+1)} >INCREASE</button>
<button onClick={() => setCount(count-1)}>DECREASE</button>
<button onClick={() => setCount(0)}RESET></button>

</>

)

}