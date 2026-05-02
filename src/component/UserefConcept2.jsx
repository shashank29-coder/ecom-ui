import React, { useRef, useState } from "react";

export function UserefConcept2() {
    const inputRef = useRef(null); // ✅ consistent naming
    const [name, setName] = useState("");

    function handleClick() {
        const greet = inputRef.current.value;
        setName(greet);
    }

    return (
        <>
            <input type="text" ref={inputRef} />
            <button onClick={handleClick}>click me</button>

            <h1>hello : {name}</h1>
        </>
    );
}