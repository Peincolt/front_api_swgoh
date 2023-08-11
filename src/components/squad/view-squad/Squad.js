import { Row, Col } from "react-bootstrap";
import importGuildViewSquad from "../../../code/viewSquad/importGuildViewSquad"
import { useLoaderData } from "react-router-dom";
import ButtonBootstrap from "../../bootstrap-components/ButtonBootstrap";
import ArraySquad from "./ArraySquad";
import '../../../assets/css/responsive.css'
import { Link } from "react-router-dom"

export default function Squad(props)
{
    const { squad } = useLoaderData()
    return (
        <div id="view-squad">
            <Row className="mt-4 justify-content-center align-items-center">
                <Col className="col-6 align-text text-truncate text-nowrap">
                    <h1 className="no-overflow" title={squad.name}>{squad.name}</h1>
                </Col>
                <Col sm className="text-center mt-4-buttons">
                <Link to={`/squad/edit/${squad.uniqueIdentifier}`} target="_blank">
                    <ButtonBootstrap variant="dark" text="Modifier l'escouade"/>
                </Link>
                </Col>
                <Col sm className="text-center">
                    <ButtonBootstrap variant="primary" text="Exporter l'escouade" target="_blank" onClick = { e => {
                        window.open(`http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/${squad.uniqueIdentifier}/export`)
                    }} />
                </Col>
            </Row>
            <Row className="mt-4 justify-content-center">
                <ArraySquad squad={squad}/>
            </Row>  
        </div>
      );
}

export async function loader({params})
{
    const squad = await importGuildViewSquad(params.squadId)
    return { squad }
}