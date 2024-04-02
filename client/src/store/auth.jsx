import { createContext, useContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const storeTokenInLS = (token,userId)=>{
        const result = sessionStorage.setItem("token",token)
        const userResult = sessionStorage.setItem("userID",userId)
        return result,userResult
        
    }
        
    return (
        <AuthContext.Provider value={storeTokenInLS}>
        {children}
        </AuthContext.Provider>
    )
    
}

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error ("useAuth used outside the provider")
    }
    return authContextValue
}