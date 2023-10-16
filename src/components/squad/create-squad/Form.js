import { importUnits } from "../../../services/Api.js"
import { Form as CommonForm} from "../common/Form";
import { useLoaderData } from "react-router-dom";

export default function Form()
{
    let units = useLoaderData()
    return (
        <CommonForm heroes={units.heroes} ships={units.ships} squad={{}} units={[]} currentList={[]} id={0}/>
    )
}

export async function loader()
{
    const units = await importUnits()
    return units
}