import { useTheme } from "./ThemeContext";

export function ThemeButton() {
    const {theme, toggleTheme} = useTheme();

    return (
        <>
        <h1> current Theme: {theme}</h1>
        <button className="bg-blue-600 text-white w-50 h-12 p-2 rounded my-4" onClick={toggleTheme}>
           change theme
        </button>
        </>
    )
}