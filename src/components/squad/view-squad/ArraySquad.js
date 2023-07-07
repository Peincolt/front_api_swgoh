import Table from 'react-bootstrap/Table';

export default function ArraySquad(props)
{
    // Pour chaque units, il faut aller dans l'objet chercher l'info qu'on veut ! props.squad.units.nom.player.data
    // Besoin de trier par joueur et non pas par perso => Récupère tous les joueurs via Object.keys d'un des persos de la squad.
    // Pour chaque joueur, on va chercher les infos dans les deux objet. Voir comment pour utiliser un nom de variable comme nom de clé
    const units = Object.keys(props.squad.units);
    const players = Object.keys(props.squad.units[units[0]]['players']);
    return (
        <Table bordered responsive className="mt-4">
            <thead>
                <tr>
                    <th>Joueur</th>
                    <th colSpan={units.length}>Unités</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowSpan={2}></td>
                    {units.map((element,key) => <td key={key}>{props.squad.units[element].name}</td>)}
                </tr>
                <tr>
                    {Array.from({length:units.length}).map((_,key) => <td key={key}>{props.squad.type === 'hero' ? "Etoile(s) Gear Relic (Vitesse)" : "Etoile(s) Protection/Vie (Vitesse)"}</td>)}
                </tr>
                {players.map((player,index) => {
                    return <tr key={'tr-'+index}>
                        <td>{player}</td>
                        {
                            units.map((unit,index) => {
                                let dataPlayer = props.squad.units[unit]['players'][player];
                                return <td key={'td-unit-'+index}> {
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