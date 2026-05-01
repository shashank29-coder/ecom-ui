import React, { useEffect, useState } from "react";

export function FetchDataTwo() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")

        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err)) 

    },[])


    return (
        <>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr",  }}>
        {data.map(product => (
            <div style={{border:"2px solid red", textAlign:"center"}} >
            <img src={product.image} alt={product.descrption} width="200px" height="100px" />
            <h4>{product.title}</h4>
            <p>Price: {product.price}</p>
            <button style={{backgroundColor: "blue", width:"120px", height:"40px", fontSize:"18px", color:"white", marginRight:"20px", marginTop:"20px"}}>Add to Cart</button>
            <button style={{backgroundColor: "blue", width:"120px", height:"40px", fontSize:"18px", color:"white", marginRight:"20px"}}>Buy Now</button>
            </div>
        ))
        }
        </div>
        </>
    )


}