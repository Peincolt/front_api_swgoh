import { Button } from "react-bootstrap"

export default function ButtonBootstrap(props)
{
    return (props.type) ? <Button type={props.type} onClick={props.action}>{props.text}</Button> : <Button variant={props.variant} onClick={props.action}>{props.text}</Button>
}