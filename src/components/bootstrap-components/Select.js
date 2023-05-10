import { Form } from "react-bootstrap";

export default function Select (props) {
    return <Form.Select id={props.name} onChange={props.event} defaultValue={props.value}>
        <option>{props.defaultValue}</option>
        {
            props.options.map(function (option, key) {
                return <option key={"option-filter-select"+key} value={option.value}> {option.label}</option>
            })
        }
    </Form.Select>
}