import { Navbar } from "react-bootstrap";
import logo from '../../assets/images/tex_guild_icon_blast.png';

export default function Banner()
{
    return (
        <Navbar.Brand href="#home">API SWGOH
            <img src={logo} alt="Logo" height="30"/>
        </Navbar.Brand>
    )
}