import { Row, Col, Form } from "react-bootstrap";
import Select from '../bootstrap-components/Select';
import Input from '../bootstrap-components/Input';
import ButtonBootstrap from "../bootstrap-components/ButtonBootstrap";
import { useContext } from "react";
import { FilterContext } from "./context/FilterContext";
import '../../assets/css/filter.css';

export default function Filter(props)
{
    const { filterData, setFilterData } = useContext(FilterContext)

    let formFilterFields = [
        {
            key : 0,
            type : 'text',
            name : 'name',
            label : 'Nom de la team',
            value : filterData.name,
            placeholder : "Nom de la team",
            event : (e) => setFilterData({...filterData, name : e.target.value})
        },
        {
            key : 1,
            type : 'select',
            name : 'type',
            label : 'Type d\'unité',
            value: filterData.unitType,
            defaultValue : "Type d'unité",
            options : [
                {
                    key : crypto.randomUUID(),
                    value : 'hero',
                    label : 'Héros'
                },
                {
                    key : crypto.randomUUID(),
                    value : 'ship',
                    label : 'Vaisseaux'
                }
            ],
            event : (e) => setFilterData({...filterData, unitType : e.target.value})
        },
        {
            key : 2,
            type : 'select',
            name : 'emplacement',
            label : 'Emplacement',
            value : filterData.squadType,
            defaultValue : "Attaque/Défense",
            options : [
                {
                    key : crypto.randomUUID(),
                    value : 'attack',
                    label : 'Attaque'
                },
                {
                    key : crypto.randomUUID(),
                    value : 'defense',
                    label : 'Défense'
                }
            ],
            event : (e) => setFilterData({...filterData, squadType : e.target.value})
        }
    ];

    return (
    <>
        <Row className="mt-4 justify-content-center align-items-end">
            {
                formFilterFields.map((element) => {
                    switch (element.type) {
                        case 'text' :
                            var formInput = <Input name={element.name} placeholder = {element.placeholder} value={element.value} event={element.event}/>
                            break;
                        case 'select' :
                            var formInput = <Select name={element.name} defaultValue={element.defaultValue} options={element.options} value={element.value} event={element.event}/>
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
            <Col sm className="text-center mrg-bottom-button">
                <ButtonBootstrap variant="secondary" text="Réinitialiser les filtres" onClick={
                    (e) => {
                        formFilterFields[1].value = "";
                        formFilterFields[2].value = "";
                        setFilterData({name:'', unitType:'', squadType:''})
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