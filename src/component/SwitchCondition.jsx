import React from "react";

export function SwitchCondition({status}) {

    switch(status) {
        case "loading" :
            return <p>data is loading... </p>
            break;

            case "success" :
            return <p>data is loaded successfully... </p>
            break;

            case "error" :
            return <p>error occurred while data load </p>
            break;

            default: 
            return <p>unknow status found</p>
    }

}