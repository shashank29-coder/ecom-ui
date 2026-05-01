import React from "react";

export function ClickButton() {
    function handleClick() {
        alert("button was clicked")
    }

    return (
        <>
        <button onClick={handleClick}>Click me</button>
        </>
    )
}