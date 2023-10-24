import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalContextProvider({children}) {
    const [ globalData, setGlobalData ] = useState(
        {
            spinner : true
        }
    )

    return (
        <GlobalContext.Provider value={{globalData, setGlobalData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;