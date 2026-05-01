import React, { useState } from "react";

export function LoginTwo(){
const[email,setEmail] = useState("")
const[password,setPassword] = useState("")
const[isLoggedIn,setIsLoggedIn]= useState(null)
function handleClick(e){
    e.preventDefault();
    if(email=="abc@gmail.com" && password=="asbd12"){
        setIsLoggedIn(true)
    }
    else{
        setIsLoggedIn(false)
    }
    setEmail("")
    setPassword("")
}

// Internal CSS styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f4f6f8",
      fontFamily: "Arial",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    success: {
      color: "green",
      marginTop: "15px",
    },
    error: {
      color: "red",
      marginTop: "15px",
    },
  };

return(
    <>
     <div style={styles.container}>
    <form onSubmit={handleClick} style={styles.form}>

        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  style={styles.input} />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  style={styles.input}/>
        <button type="submit" style={styles.button}>Submit</button>
    </form>
    {isLoggedIn===true && <h1 style={styles.success}>you are log in</h1>}
    {isLoggedIn===false && <h1 style={styles.error}>you are log </h1>}
    </div>
    </>
)
}