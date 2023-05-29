import Array from "./Array";
import Team from "./Team";
import importGuildViewSquad from "../../code/viewSquad/importGuildViewSquad"
import { useLoaderData } from "react-router-dom";

export default function Squad(props)
{
    const { squad } = useLoaderData()
    return (
        <>
            <Team squad={squad}/>
            <Array squad={squad}/>
        </>
      );
}

export async function loader({params})
{
    const squad = await importGuildViewSquad(params.squadId)
    return { squad }
}