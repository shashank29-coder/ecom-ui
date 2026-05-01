import { createContext, useContext, useState } from "react";

 const Themedata = createContext();
export function ThemeContext({children}){
   

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    };

     const themeClasses = theme === "light" ? "bg-white text-black min-h-screen p-4"
      : "bg-gray-900 text-white min-h-screen p-4";



    return (
        <>
        <ThemeContext.Provider value={{theme, toggleTheme}} >
           <div className={themeClasses}> {children} </div>
        </ThemeContext.Provider>
        </>
    )



}

export const useTheme = () => useContext(Themedata);