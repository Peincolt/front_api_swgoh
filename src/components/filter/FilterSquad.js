import Form from "./Form"
import Array from "./Array"
import { useState, useContext, useEffect, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import importGuildSquad from "../../code/filterSquad/importGuildSquad"
import { FilterContext } from "./context/FilterContext";
import traduction from "../../assets/traduction/squad";

const headerArray = {name: 'Nom de l\'équipe', used_for: 'Utilisée pour', type: 'Type d\'unités', };

export default function FilterSquad()
{
  const [ squads, setSquads ] = useState(useLoaderData());
  const { filterData, setFilterData } = useContext(FilterContext)

  const squadFiltered = useMemo(() => {
    return squads.map(element => {
      let copieElement = {...element};
      return filterData.name && !copieElement.name.includes(filterData.name) ? []
      : filterData.used_for && filterData.used_for !== copieElement.used_for ? []
      : filterData.type && filterData.type !== copieElement.type ? []
      : (() => {
        copieElement.type = traduction['fr'][copieElement.type];
        copieElement.used_for = traduction['fr'][copieElement.used_for];
        return copieElement
      })()
    });
  },[filterData])

  return (
    <div id="filter-squad">
        <Form/>
        <Array header={headerArray} content={squadFiltered}/>
    </div>
  );
}

export async function loader()
{
    const squads = await importGuildSquad(headerArray)
    return squads
}