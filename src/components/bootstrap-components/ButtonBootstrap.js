import { Button } from "react-bootstrap"

export default function ButtonBootstrap(props)
{
    return <Button {...props}>{props.text}</Button>
}