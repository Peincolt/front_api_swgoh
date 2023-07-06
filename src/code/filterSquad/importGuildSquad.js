import { Link } from "react-router-dom"
import Pencil from "../../components/boxicon-components/Pencil"
import Search from "../../components/boxicon-components/Search"

export default function importGuildSquad(headerArray)
{
    return fetch("http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/search", {
      method: 'POST'
    })
    .then(res => res.json())
    .then(
      (json) => {
        if (json.length > 0) {
          let keysHeader = Object.keys(headerArray)
          let jsonKeys = Object.keys(json[0])
          json.map(obj => {
            obj['icon'] = <>
              <Link to={`/squad/${obj.unique_identifier}`} target="_blank"><Search/></Link>
              <Link to={`/squad/edit/${obj.unique_identifier}`} target="_blank"><Pencil/></Link>
            </>
            for (let x = 0; x < jsonKeys.length; x++) {
                if (!keysHeader.includes(jsonKeys[x])) {
                    delete obj[jsonKeys[x]]
                }
            }
            
            return obj
          })
          return json
        }
      },
      (error) => {
        return []
      }
    )
}