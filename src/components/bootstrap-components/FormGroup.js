import Form from 'react-bootstrap/Form'
import Input from '../bootstrap-components/Input'
import Select from '../bootstrap-components/Select'
import ButtonBootstrap from './ButtonBootstrap';

export default function FormGroup(props)
{
    let inputContent;

    switch (props.type) {
        case 'text':
        case 'email':
        case 'checkbox':
            inputContent = <Input {...props.attributes}/>
        break;
        case 'select':
            inputContent = <Select {...props.attributes}/>
        break;
        case 'button':
            inputContent = <ButtonBootstrap {...props.attributes}/>
        break;
    }

    return (
            <Form.Group {...(props.formAttributes ? props.formAttributes : {})}>
                <Form.Label>{props.label}</Form.Label>
                {inputContent}
            </Form.Group>
    )
}