import Table from 'react-bootstrap/Table';

export default function ArraySquad(props)
{
    console.log(Object.entries(props.squad.units))
    // Pour chaque units, il faut aller dans l'objet chercher l'info qu'on veut ! props.squad.units.nom.player.data
    // Besoin de trier par joueur et non pas par perso => Récupère tous les joueurs via Object.keys d'un des persos de la squad.
    // Pour chaque joueur, on va chercher les infos dans les deux objet. Voir comment pour utiliser un nom de variable comme nom de clé
    const units = Object.keys(props.squad.units);
    const players = Object.keys(props.squad.units[units[0]]);
    return (
        <Table bordered responsive className="mt-4">
            <thead>
                <th>Joueur</th>
                <th colSpan={units.length}>Unités</th>
            </thead>
            <tbody>
                <tr>
                    <td rowSpan={2}></td>
                    {units.map((element,key) => <td key={key}>{element}</td>)}
                </tr>
                <tr>
                    {Array.from({length:units.length}).map((_,key) => <td key={key}>{props.squad.type === 'hero' ? "Stars Gear Relic (Speed)" : "Stars Protection/Life (Speed)"}</td>)}
                </tr>
                {players.map(player => {
                    return <tr>
                        <td>{player}</td>
                        {
                            units.map(unit => {
                                let dataPlayer = props.squad.units[unit][player];
                                return <td> {
                                    props.squad.type === 'hero' ? 
                                    (`${dataPlayer.rarity}* G${dataPlayer.gear_level} R${dataPlayer.relic_level} (${dataPlayer.speed})`): 
                                    (`${dataPlayer.rarity}* ${dataPlayer.protection}/${dataPlayer.life} (${dataPlayer.speed})`)
                                }
                                </td>
                            })
                        }
                    </tr>
                })}
            </tbody>
        </Table>
    )
}