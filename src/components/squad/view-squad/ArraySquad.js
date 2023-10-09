import Table from 'react-bootstrap/Table';
import { colorSpan } from '../../../code/viewSquad/functions';

export default function ArraySquad(props)
{
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
                    {
                        units.map(function(element,key) {
                            return (
                                <td key={key}>
                                    <div className='text-center'>
                                        <img src={props.squad.units[element].image}/>
                                        <div className='text-center'>
                                            {props.squad.units[element].name}
                                        </div>
                                    </div>
                                </td>
                            )}
                        )
                    }
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
                                return <td key={'td-unit-'+index}>
                                    <b>
                                        <span className={colorSpan(dataPlayer.gear_level)}> {
                                        props.squad.type === 'hero' ? 
                                        (`${dataPlayer.rarity}* G${dataPlayer.gear_level} R${dataPlayer.relic_level} (${dataPlayer.speed})`): 
                                        (`${dataPlayer.rarity}* ${dataPlayer.protection}/${dataPlayer.life} (${dataPlayer.speed})`)
                                    }
                                        </span>
                                    </b>
                                </td>
                            })
                        }
                    </tr>
                })}
            </tbody>
        </Table>
    )
}