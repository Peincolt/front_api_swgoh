export default function importUnits()
{
    return fetch("http://www.api-hgamers.fr/api/units",{
        method: "GET"
    })
    .then(resp => resp.json())
}