import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalContextProvider({children}) {
    const [ globalData, setGlobalData ] = useState(
        {
            spinner : true,
            url: 'http://www.api-hgamers.fr/api/',
            guildId: 'uuwcpRBoStWfogZersAvJA'
        }
    )

    return (
        <GlobalContext.Provider value={{globalData, setGlobalData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;