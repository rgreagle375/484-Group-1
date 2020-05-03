import React, { createContext, useState} from 'react'

export const JWTContext = createContext();

export function JWTContextProvider (props) {
    const [jwt, setJWT] = useState('');
    const updateJWT = (token) => {
        setJWT(token)
        console.log(jwt)
    }
    
    return(
        <JWTContext.Provider value={{jwt, setJWT, updateJWT}}>
            {props.children}
        </JWTContext.Provider>
    )
    
}

