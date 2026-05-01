import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import {useNavigate} from 'react-router-dom';

export function Fetchdata() {

    const [data, setData] = useState([])

    const navigate = useNavigate()
    const {cartItems = [], addToCart} = useCart()
    

      const handleAddToCart = (product) => {
        addToCart(product)
        navigate('/cart')
    }

     const handleBuyNow= (product) => {

      navigate('/buy', {state: {product}})

     }

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")

        .then(res => res.json())

        .then(data => setData(data))

        .catch(err => console.log(err))

    },[])


    return(
        <>
         <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "20px",
        padding: "20px",
      }}
    >
        {data.map(product => (
            
            <div >
            <img src={product.image} alt={product.description} width="200" />
            <h1>{product.title}</h1>
            <h1> price : {product.price}</h1>
            <h3>{product.description}</h3>
            <button onClick={() => handleAddToCart(product)} style={{backgroundColor: "red", color: "white", width: "100px", height: "40px", borderRadius: "10px", marginRight: "15px" , fontSize: "17px"}}>Add to cart</button>


            <button onClick={() => handleBuyNow(product)} style={{backgroundColor: "red", color: "white", width: "100px", height: "40px", borderRadius: "10px", fontSize: "17px"}}>Buy Now</button>

            </div>
           
        ))}
        </div>
        </>
    )

}