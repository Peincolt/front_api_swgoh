export default function importGuildViewSquad(idSquad)
{
  console.log(idSquad)
    return fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/get/"+idSquad, {
      method: 'GET'
    })
    .then(res => res.json())
}