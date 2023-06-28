import { Row, Col } from "react-bootstrap";
import importGuildViewSquad from "../../code/viewSquad/importGuildViewSquad"
import { useLoaderData } from "react-router-dom";
import ButtonBootstrap from "../bootstrap-components/ButtonBootstrap";
import ArraySquad from "./ArraySquad";

export default function Squad(props)
{
    const { squad } = useLoaderData()
    console.log(squad)
    return (
        <>
            <Row className="mt-4 justify-content-center">
                <Col className="col-5">
                    <h1>{squad.name}</h1>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ButtonBootstrap variant="dark" text="Modifier l'escouade"/>
                        </Col>
                        <Col>
                            <ButtonBootstrap variant="primary" text="Exporter l'escouade" target="_blank" onClick = { e => {
                                window.open(`http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/${squad.uniqueIdentifier}/export`)
                            }} />
                        </Col>
                    </Row>
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