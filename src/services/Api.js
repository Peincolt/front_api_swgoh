const url = process.env.REACT_APP_API_URL;
const idGuild = process.env.REACT_APP_ID_GUILD;

function importUnits()
{
    return fetch(`${url}/units`,{
        method: "GET"
    })
    .then(resp => resp.json())
}

function importGuildSquad()
{
    return fetch(`${url}/guild/${idGuild}/squad/search`, {
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
    return fetch(`${url}/guild/${idGuild}/squad/get/${idSquad}`, {
      method: 'GET'
    })
    .then(function(resp) {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 404) {
        return null;
      }
    })
}

export { importUnits, importGuildSquad, importGuildViewSquad }