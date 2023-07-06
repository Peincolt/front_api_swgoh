import { Row, Col } from "react-bootstrap";
import importGuildViewSquad from "../../../code/viewSquad/importGuildViewSquad"
import { useLoaderData } from "react-router-dom";
import ButtonBootstrap from "../../bootstrap-components/ButtonBootstrap";
import ArraySquad from "./ArraySquad";
import '../../../assets/css/view-squad.css'

export default function Squad(props)
{
    const { squad } = useLoaderData()
    return (
        <>
            <Row className="mt-4 justify-content-center align-items-center">
                <Col className="col-6 align-text">
                    <h1>{squad.name}</h1>
                </Col>
                <Col sm className="text-center mt-4-buttons">
                    <ButtonBootstrap variant="dark" text="Modifier l'escouade"/>
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
        </>
      );
}

export async function loader({params})
{
    const squad = await importGuildViewSquad(params.squadId)
    return { squad }
}