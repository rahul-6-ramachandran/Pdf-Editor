import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState()
    const storeTokenInLS = (token,userId)=>{
        const result = sessionStorage.setItem("token",token)
        const userResult = sessionStorage.setItem("userID",JSON.stringify(userId))
        return result,userResult
        
    }
        
    return (
        // ,{user,setUser}
        <AuthContext.Provider value={{storeTokenInLS,user,setUser}}>
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