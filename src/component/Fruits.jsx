import React from "react";

export function Fruits(){
    const fruits = ["apple", "banana", "mango", "grapes", "cherry"]

    return(
        <>
            {fruits.length === 0 ? (
                <p>No fruits Avalaible</p>
            ) : (
                <ul>{fruits.map(fruit => <li>{fruit}</li>)}
                    </ul>
            )}
        </>
    )
}