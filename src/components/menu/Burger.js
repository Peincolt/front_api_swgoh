import { Nav, NavDropdown } from "react-bootstrap";

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