import { Form } from "react-bootstrap";

export default function Input(props)
{
    return (
        <Form.Control type="text" id={props.name} placeholder={props.placeholder} value={props.value} onChange={props.event}/>
    )
}