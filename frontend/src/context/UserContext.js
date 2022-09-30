import { createContext, useState } from "react";

export const userContext= createContext({});

export const DataProvider= ({children}) => {
    const [currentUser, setCurrentUser] = useState("")

    return(
        <userContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </userContext.Provider>
    )
}