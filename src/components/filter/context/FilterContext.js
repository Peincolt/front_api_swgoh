import { createContext, useState } from "react";

export const FilterContext = createContext();

function FilterContextProvider({children}) {
    const [ filterData, setFilterData ] = useState(
        {
          name:'',
          unitType:'',
          squadType:''
        }
    )

    return (
        <FilterContext.Provider value={{filterData, setFilterData}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContextProvider;