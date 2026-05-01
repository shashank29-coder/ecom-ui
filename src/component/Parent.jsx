import React, { useState } from "react";
import { Display } from "./Display";
export function Parent() {
    const [value, setValue] = useState("shashank")

    return (
        <>
        <Display value={value} />
        </>
    )
}