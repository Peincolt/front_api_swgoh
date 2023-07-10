import ArrayBootstrap from "../bootstrap-components/ArrayBootstrap";
import { Row } from "react-bootstrap";

export default function Array(props)
{
    return (
        <Row className="mt-4">
            <ArrayBootstrap header={props.header} content={props.content}/>
        </Row>
    )
}