export default function importGuildSquad(headerArray)
{
    return fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(
      res => res.json(),
    /*.then(
      (json) => {
        if (json.length > 0) {
          let keysHeader = Object.keys(headerArray)
          let jsonKeys = Object.keys(json[0])
          json.map(obj => {
            for (let x = 0; x < jsonKeys.length; x++) {
                if (!keysHeader.includes(jsonKeys[x])) {
                    delete obj[jsonKeys[x]]
                }
            }
            return obj
          })
          return json
        }
      },*/
      (error) => {
        return []
      }
    )
}