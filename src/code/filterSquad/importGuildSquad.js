export default function importGuildSquad()
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