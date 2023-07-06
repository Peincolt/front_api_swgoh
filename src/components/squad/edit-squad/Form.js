import importUnits from "../../../code/create-squad/importUnits"
import importGuildViewSquad from "../../../code/viewSquad/importGuildViewSquad"
import { Form as CommonForm} from "../common/Form";
import { getNameByBaseId } from "../helper/VerifUnits"
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function Form(props)
{
    let {squad, units, currentList} = useLoaderData()
    return (
        <CommonForm heroes={units.heroes} ships={units.ships} squad={squad} currentList={currentList} id={squad.units.length}/>
    )
}

export async function loader({params})
{
    const squadData = await importGuildViewSquad(params.squadId)
    const units = await importUnits()
    const { name, type, usedFor, uniqueIdentifier } = squadData
    const squad = { name, unitType: type, squadType: usedFor, uniqueIdentifier, units:[] }
    const currentList = type === 'ship' ? units.ships : units.heroes
    let id = 0;
    Object.entries(squadData.units).forEach(element => {
        squad.units.push({id: id++, baseId: element[0], name: getNameByBaseId(element[0], currentList)})
    })
    return {squad, units, currentList}
}