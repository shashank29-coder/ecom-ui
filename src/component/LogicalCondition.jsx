import React from "react";

export function LogicalCondition() {
    var cart = ["apple", "banana", "cherry"]

    return (
        <>
        {cart.length >= 0 && <h1>You have {cart.length} items in cart</h1>}

        <ol>
            {cart.map((item, index) => (
                <li>{item} {index}</li>
            ))}
        </ol>

        </>
    )
}