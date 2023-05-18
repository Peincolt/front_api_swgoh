import FilterContextProvider from "./context/FilterContext";
import Form from "./Form"
import Array from "./Array"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import importGuildSquad from "../../code/filterSquad/importGuildSquad"

const headerArray = {name: 'Nom de l\'équipe', used_for: 'Utilisée pour', type: 'Type d\'unités', };

export default function FilterSquad()
{
    const [ { squads }, setSquads ] = useState(useLoaderData());

    return (
      <div id="filter-squad">
          <FilterContextProvider>
            <Form/>
            <Array header={headerArray} content={squads}/>
          </FilterContextProvider>
      </div>
    );
}

export async function loader()
{
    const squads = await importGuildSquad(headerArray)
    return { squads }
}