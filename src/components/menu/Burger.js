import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom"

export default function Burger()
{
    return (
        <Nav>
            <NavDropdown title="Menu">
                <NavDropdown.Item href="#team">Créer une team</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}