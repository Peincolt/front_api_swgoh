import { Button } from "react-bootstrap"

export default function ButtonBootstrap(props)
{
    return (props.type) ? <Button type={props.type}>{props.text}</Button> : <Button variant={props.variant}>{props.text}</Button>
}