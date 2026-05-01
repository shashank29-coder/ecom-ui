import React, { useState } from "react";

export function SyntheticEvent() {
    const [username, setUsername] = useState("sumit")

    console.log(username)

    const obj1 = {
        uname : "amamn"
    }



    return(
        <>
        <input type="text" value={obj1.uname} onChange={(e) => setUsername(e.target.value)}/>

        <h1>{username}</h1>
        </>
    )
}