import React from "react";
export class EventBindindThree extends React.Component{
    constructor(){
        super();
        this.state = {name:"Developer"}
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        alert("shut up")
    }
    render(){
        return(
            <button onClick={this.handleClick}>click me</button>
        )
    }
}