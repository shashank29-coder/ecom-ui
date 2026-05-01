import React, { useReducer } from "react";
function Usereducer(state,action){
    if(action.type==='increment') return{count:state.count+1};
    if(action.type==='decrement') return{count:state.count-1};
    return state;
}

    
   
export function CounterButton(){
    const[state,dispatch]=useReducer ( Usereducer, {count:0});
return(
    <>
    <p>{state.count}</p>
    <button onClick={() => dispatch({type:'increment'})}>+1</button>
    <button onClick={() => dispatch({type:'decrement'})}>-1</button>
    </>
)
}
