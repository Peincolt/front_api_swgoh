import { Row, Col, Form } from "react-bootstrap";
import Select from '../bootstrap-components/Select';
import Input from '../bootstrap-components/Input';
import ButtonBootstrap from "../bootstrap-components/ButtonBootstrap";
import { useContext } from "react";
import { FilterContext } from "./context/FilterContext";

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
            event : (e) => setFilterData({...filterData, name : e.target.value}),
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
        <Row className="mt-4 justify-content-center">
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
                        <Col className="col-2" key={"col-"+element.key}>
                            <Form.Label htmlFor={"filter-" + element.filterName}>{element.label}</Form.Label>
                            {formInput}
                        </Col>
                    ];
                })
            }
        </Row>
        <Row className="justify-content-center mt-4">
            <Col className="col-2">
                <ButtonBootstrap variant="secondary" text="Réinitialiser les filtres" action={
                    (e) => {
                        formFilterFields[1].value = "";
                        formFilterFields[2].value = "";
                        setFilterData({name:'', unitType:'', squadType:''})
                    }
                }/>
            </Col>
            <Col className="col-2">
                <a className="btn btn-success" rel="noopener noreferrer" href="http://www.api-hgamers.fr/api/guild/uuwcpRBoStWfogZersAvJA/squad/export" target="_blank">Exporter le résultat</a>
            </Col>
        </Row>
    </>
    )
}