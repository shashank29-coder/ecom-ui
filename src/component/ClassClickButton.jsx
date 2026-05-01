import React from "react";

export class ClassClickButton extends React.Component {
    constructor(){
        super();
        this.handleButton = this.handleButton.bind(this) 
    }
    handleButton(){
        alert("button was clicked from class component")
    }

    render() {
        return (
            <>
            <button onClick={this.handleButton}>Greet</button>
            </>
        )
    }
}