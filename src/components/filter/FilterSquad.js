import Form from "./Form"
import Array from "./Array"
import { useState, useContext, useEffect } from "react";
import { FilterContext } from "./context/FilterContext";
import traduction from "../../assets/traduction/squad";
import { Link } from "react-router-dom"
import Pencil from "../../components/boxicon-components/Pencil"
import Search from "../../components/boxicon-components/Search"
import Delete from "../boxicon-components/Delete";
import { GlobalContext } from "../../components/common/context/GlobalContextProvider";

export default function FilterSquad(props)
{
  const { filterData } = useContext(FilterContext)
  const [ squads, setSquads ] = useState(props.squads);
  const [ filteredSquad, setFilteredSquad] = useState(props.squads)
  const { setGlobalData } = useContext(GlobalContext)

  useEffect(
    () => {
      setGlobalData({spinner: false})
    },[]
    )

  useEffect(() => {
    setFilteredSquad(
      squads.filter(
        element => {
          if (
            (filterData.name && !element.name.includes(filterData.name)) ||
            (filterData.used_for && filterData.used_for !== element.used_for) ||
            (filterData.type && filterData.type !== element.type)
          ) {
            return false;
          }
          return true;
        }
      ).map(element => prepareArrayLines(element))
    )
  },[filterData, squads])

  function prepareArrayLines(squad)
  {
    let squadCopy = {...squad}
    let keysHeader = Object.keys(props.headerArray);
    let jsonKeys = Object.keys(squadCopy);
    squadCopy.type = traduction['fr'][squadCopy.type];
    squadCopy.used_for = traduction['fr'][squadCopy.used_for];
    squadCopy.icon  = <>
        <Link to={`/squad/${squadCopy.unique_identifier}`} target="_blank" className="me-3"><Search/></Link>
        <Link to={`/squad/edit/${squadCopy.unique_identifier}`} target="_blank" className="me-3"><Pencil/></Link>
        <button type="button" className="btn btn-link me-3" style={{padding: "0", margin:"0", position: "absolute"}} onClick={() => {deleteSquad(squad.unique_identifier)}} taskid={squadCopy.unique_identifier}><Delete/></button>
    </>
    for (let x = 0; x < jsonKeys.length; x++) {
        if (!keysHeader.includes(jsonKeys[x])) {
            delete squadCopy[jsonKeys[x]]
        }
    }
    return squadCopy
  }

  const deleteSquad = (idSquad) => {
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
        <Array header={props.headerArray} content={filteredSquad}/>
    </div>
  );
}