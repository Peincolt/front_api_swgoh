import { createContext, useState } from "react";

export const FilterContext = createContext();

function FilterContextProvider({children}) {
    const [ filterData, setFilterData ] = useState(
        {
          name:'test',
          unitType:'hero',
          squadType:'defense'
        }
    )

    return (
        <FilterContext.Provider value={{filterData, setFilterData}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContextProvider;