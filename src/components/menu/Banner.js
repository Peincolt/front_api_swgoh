import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"
import logo from '../../assets/images/tex_guild_icon_blast.png';

export default function Banner()
{
    return (
        <Link to="/" style={{'text-decoration': 'none'}}>
            <Navbar.Brand>API SWGOH
                <img src={logo} alt="Logo" height="30"/>
            </Navbar.Brand>
        </Link>
    )
}