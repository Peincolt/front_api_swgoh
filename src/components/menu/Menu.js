import { Container, Navbar } from "react-bootstrap";
import '../../assets/css/menu.css';
import Banner from "./Banner";
import Burger from "./Burger";

export default function Menu()
{
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Collapse>
                    <Banner/>
                    <Burger/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}