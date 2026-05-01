import React, { useRef } from "react";
export function UseRefTwo(){
const inputRef = useRef();
function focusInput(){
    inputRef.current.focus();
}
return(
    <>
    <input ref={inputRef}/>
    <button onClick={focusInput}> click me</button>


    </>
)
}



// context api in react ----> Reacxt context is used to manage and share global state across a react application without having to pass props downsi
// de manually at every level (a process known as propsdrilling )  in this we use 3 features like reate con text - 
// cretate context 
// usecontext-use context also define in parent it means that whatever wcontext we created wwe will use it in child doing these type of things like weh ve to craete custom hoks it i screated by using use keyword 
// the data will be shared 
// provider - it is used to return the context or display theccontext 