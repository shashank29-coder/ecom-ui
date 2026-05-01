    import React from 'react';

export class Counter extends React.Component {
    constructor() {
        super();

        this.state = {count: 0}
    }

    render() {
        return(
            <>
            <h1>Count: {this.state.count}</h1>

            <button onClick={() => this.setState({count : this.state.count + 1})}>increment</button>
            <button onClick={() => this.setState({count : this.state.count - 1})}>decrement</button>
            <button onClick={() => this.setState({count : 0})}>Reset</button>
            </>
        )
    }
}