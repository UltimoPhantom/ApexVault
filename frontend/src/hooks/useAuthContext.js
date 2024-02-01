import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context)
        throw Error ('Not inside the provider!')
    
    console.log("From useAutnContext: ", context)
    return context
}