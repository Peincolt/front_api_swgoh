import Menu from "../components/menu/Menu";
import Squad from "../components/squad/view-squad/Squad";

export default function ViewSquad(props)
{
    return (
        <>
            <Menu/>
            <div className="container">
                <Squad/>
            </div>
        </>
    )
}