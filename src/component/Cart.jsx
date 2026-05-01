import React from "react";
import { useCart } from "./CartContext";

import { useNavigate } from "react-router-dom";

export function Cart() {
    const {cartItems, removeFromCart, increment, decrement} = useCart()
    const navigate = useNavigate()
    console.log(cartItems)

      if (cartItems.length === 0 ){
        return <h2>🛒 Your cart is empty.</h2>
    }

     const handleBuyNow = (product) => {

      navigate('/buy', {state: {product}})

     }

    return(
       <>
        <div>
             <h2>🛒 Your Cart</h2>
                         {cartItems.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #ddd',
                    padding: '10px 0'
                }}>

                      <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '80px', marginRight: '1rem' }}
          />

<div>
                    <h4>{item.title}</h4>
                    <h4> ₹{item.price * item.quantity}</h4>

                <button style={{border: "1px solid black", padding: "10px", borderRadius: "10px", width: "150px", background: "blue", color: "white", fontSize: "22px", marginRight: "20px"}} onClick={() => handleBuyNow(item)}> Buy Now </button>

                 <button style={{border: "1px solid black", padding: "10px", borderRadius: "10px", width: "150px", background: "blue", color: "white", fontSize: "22px"}}  onClick={() => removeFromCart(item.id)}>
                     Remove
                </button>

                 <button style={{marginLeft: "30px"}} onClick={() => decrement(item.id)}>-</button>
                  <span>Quantity: {item.quantity}</span>
      <button onClick={() => increment(item.id)}>+</button>

                    </div>




  </div>
                         ))}
        </div>

        </>
        
    )
    
}