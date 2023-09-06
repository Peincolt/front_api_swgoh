
import Squad from "../components/squad/view-squad/Squad";
import Skeleton from "../components/common/Skeleton";
import { useLoaderData } from "react-router-dom";

export default function ViewSquad()
{
    const { squad } = useLoaderData()

    return (
        <Skeleton>
            <Squad squad={squad}/>
        </Skeleton>
    )
}