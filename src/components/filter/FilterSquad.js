import Form from "./Form"
import Array from "./Array"
import { useState, useContext, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import importGuildSquad from "../../code/filterSquad/importGuildSquad"
import { FilterContext } from "./context/FilterContext";
import traduction from "../../assets/traduction/squad";
import { Link } from "react-router-dom"
import Pencil from "../../components/boxicon-components/Pencil"
import Search from "../../components/boxicon-components/Search"
import Delete from "../boxicon-components/Delete";

const headerArray = {name: 'Nom de l\'équipe', used_for: 'Utilisée pour', type: 'Type d\'unités', action: 'Actions'};

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
        let keysHeader = Object.keys(headerArray);
        let jsonKeys = Object.keys(copieElement);
        copieElement.type = traduction['fr'][copieElement.type];
        copieElement.used_for = traduction['fr'][copieElement.used_for];
        copieElement.icon  = <>
            <Link to={`/squad/${copieElement.unique_identifier}`} target="_blank" className="me-3"><Search/></Link>
            <Link to={`/squad/edit/${copieElement.unique_identifier}`} target="_blank" className="me-3"><Pencil/></Link>
            <button type="button" className="btn btn-link me-3" style={{padding: "0", margin:"0", position: "absolute"}} onClick={deleteSquad.bind(this,copieElement['unique_identifier'])} taskid={copieElement.unique_identifier}><Delete/></button>
        </>
        for (let x = 0; x < jsonKeys.length; x++) {
            if (!keysHeader.includes(jsonKeys[x])) {
                delete copieElement[jsonKeys[x]]
            }
        }
        return copieElement
      })()
    });
  },[filterData, squads])

  function deleteSquad(idSquad)
  {
    fetch(`http://www.api-hgamers.fr/api/squad/${idSquad}/delete`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => {
      alert(json.result.message)
      setSquads(squads.filter(squad => squad.unique_identifier !== idSquad))
    },(error) => {
      alert('Une erreur est survenue lors de la suppression de l\'escouade dans la base de données. Veuillez réessayer ou contacter un administrateur');
    })
  }

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