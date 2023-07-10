import { Container, Navbar } from "react-bootstrap";
import '../../assets/css/menu.css';
import Banner from "./Banner";
import Items from "./Items";

export default function Menu()
{
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                <Banner/>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Items/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}