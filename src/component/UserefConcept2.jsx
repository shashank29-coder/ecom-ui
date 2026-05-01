import React, { useRef, useState } from "react";

export function UserefConcept2() {
    const  InputRef = useRef()
    const [name,setName] = useState()
    function handleClick(){
        const greet = InputRef.current.value
        setName(greet)
    }

   

    return(
        <>
        <input type="text" ref={inputRef} />
        <button onClick={focusInput}> click me</button>

        <h1>hello : {name}</h1>
        </>
    )
}