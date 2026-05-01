import React from "react";

export function ClickButtonThree(){
    function handleClick(){
        alert("Button was clicked")
    }

    return(
        <>
        <button onClick={handleClick}>Click me</button>
        </>
    )
}