import React from "react";

export function Condition() {
    var isLoggedIn = true

    // if(isLoggedIn) {
    //     return <h1>You are logged in</h1>
    // }

    // else {
    //     return <h1>you are not looged in</h1>
    // }

    return(
        <>
        {isLoggedIn ? <h1>hii user you are login</h1> : <h1>please sign in</h1>}
        </>
    )
}