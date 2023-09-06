import { Row, Col, Form } from "react-bootstrap";
import Select from '../bootstrap-components/Select';
import Input from '../bootstrap-components/Input';
import ButtonBootstrap from "../bootstrap-components/ButtonBootstrap";
import { useContext } from "react";
import { FilterContext } from "./context/FilterContext";
import '../../assets/css/responsive.css';

export default function Filter(props)
{
    const { filterData, setFilterData } = useContext(FilterContext)

    let formFilterFields = [
        {
            key : 0,
            type : 'text',
            name : 'name',
            label : 'Nom de la team',
            required: false,
            value: filterData.name,
            placeholder : "Nom de la team",
            'onChange' : (e) => setFilterData({...filterData, name : e.target.value})
        },
        {
            key : 1,
            type : 'select',
            name : 'type',
            label : 'Type d\'unité',
            required: false,
            value: filterData.type,
            defaultValue : "Type d'unité",
            options : [
                {
                    //key : crypto.randomUUID(),
                    key: 'type1',
                    value : 'hero',
                    label : 'Héros'
                },
                {
                    //key : crypto.randomUUID(),
                    key: 'type2',
                    value : 'ship',
                    label : 'Vaisseaux'
                }
            ],
            onChange : (e) => setFilterData({...filterData, type : e.target.value})
        },
        {
            key : 2,
            type : 'select',
            name : 'emplacement',
            label : 'Emplacement',
            value : filterData.used_for,
            required: false,
            defaultValue : "Attaque/Défense",
            options : [
                {
                    //key : crypto.randomUUID(),
                    key: 'emplacement1',
                    value : 'attack',
                    label : 'Attaque'
                },
                {
                    //key : crypto.randomUUID(),
                    key: 'emplacement2',
                    value : 'defense',
                    label : 'Défense'
                }
            ],
            onChange : (e) => setFilterData({...filterData, used_for : e.target.value})
        }
    ];

    return (
    <>
        <Row className="mt-4 justify-content-center align-items-end">
            {
                formFilterFields.map((element) => {
                    switch (element.type) {
                        case 'text' :
                            var formInput = <Input type={element.type} name={element.name} placeholder = {element.placeholder} value={element.value} onChange={element.onChange}/>
                            break;
                        case 'select' :
                            var formInput = <Select name={element.name} defaultValue={element.defaultValue} options={element.options} value={element.value} onChange={element.onChange} required={element.required}/>
                            break;
                    }
                    return [
                        <Col lg={2} key={"col-"+element.key} className="mrg-bottom-inputs">
                            <Form.Label htmlFor={"filter-" + element.filterName}>{element.label}</Form.Label>
                            {formInput}
                        </Col>
                    ];
                })
            }
            <Col sm className="text-center mrg-bottom-button mt-4">
                <ButtonBootstrap variant="secondary" text="Réinitialiser les filtres" onClick={
                    (e) => {
                        formFilterFields[1].value = "";
                        formFilterFields[2].value = "";
                        setFilterData({name:'', type:'', used_for:''})
                    }
                }/>
            </Col>
            <Col sm className="text-center">
                <ButtonBootstrap 
                    variant="success"
                    target="_blank"
                    text="Exporter les résultats"
                    onClick = { e => 
                        {
                            let exportUrl = "http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/export"
                            for (const [key, value] of Object.entries(filterData)) {
                                let first = true;
                                if (value !== '') {
                                    if (first) {
                                        first = false
                                        exportUrl+="?"+key+"="+value
                                    } else {
                                        exportUrl+="&"+key+"="+value
                                    }
                                }
                            }
                            window.open(exportUrl)
                        }
                    }
                />
            </Col>
        </Row>
    </>
    )
}