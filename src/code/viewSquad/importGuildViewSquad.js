export default function importGuildViewSquad(idSquad)
{
    return fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/get/"+idSquad, {
      method: 'GET'
    })
    .then(res => res.json())
}