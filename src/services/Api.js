import { GlobalContext } from '../components/common/context/GlobalContextProvider';
import { useContext } from "react";

function importUnits()
{
    return fetch("http://www.api-hgamers.fr/api/units",{
        method: "GET"
    })
    .then(resp => resp.json())
}

function importGuildSquad()
{
    return fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(
      res => res.json(),
      (error) => {
        return []
      }
    )
}

function importGuildViewSquad(idSquad)
{
    return fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/get/"+idSquad, {
      method: 'GET'
    })
    .then(res => res.json())
}

export { importUnits, importGuildSquad, importGuildViewSquad }