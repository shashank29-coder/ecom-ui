import React, { createContext, useContext,useState } from "react";
const ThemeContext = createContext();
export function ThemeProvider({children}){
    const[theme,setTheme]=useState("light")
    const toggleTheme = () =>{
        setTheme(theme==="light"?"dark ": "light");
    }
    const themeClasses = theme ==="light" ? "bg-white text-black min-h-screen p-4" : "bg-grey text-white min-h-screen p-4"
    return(

        <>
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            <div className={themeClasses}>{children}</div>
        </ThemeContext.Provider>
        
        </>
    )
}
export const useTheme=() =>useContext(ThemeContext)