import '../../assets/css/create-squad.css';
import { Col, Row } from "react-bootstrap";
import importUnits from "../../code/create-squad/importUnits"
import { useLoaderData } from "react-router-dom";
import { Form as FormBootstrap } from 'react-bootstrap'
import { useReducer, useState } from "react";
import FormGroup from "../bootstrap-components/FormGroup";
import squadReducer from './reducer/squadReducer';
import Input from '../bootstrap-components/Input';
import ButtonBootstrap from '../bootstrap-components/ButtonBootstrap';

export default function Form(props)
{
    let [formData, setFormData] = useState({});
    let [unitField, setUnitField] = useState('');
    let { heroes, ships } = useLoaderData();
    let [squad, dispatch] = useReducer(squadReducer,[]);
    let formFilterFields = [
        {
            key : 0,
            type : 'text',
            label : 'Nom de l\'escouade',
            attributes : {
                placeholder : "Nom de l'escouade team",
                onChange : (e) => setFormData({...formData, name : e.target.value}),
                name : 'name'
            },
            formAttributes : {
                className: "mb-4-lg"
            }
        },
        {
            key : 1,
            type : 'select',
            label : 'Type d\'unité',
            attributes : {
                name : 'type',
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
                onChange : (e) => setFormData({...formData, unitType : e.target.value})
            },
            formAttributes : {
                className: "mb-4-lg"
            }
        },
        {
            key : 2,
            type : 'select',
            label : 'Emplacement',
            attributes: {
                name : 'emplacement',
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
                onChange : (e) => setFormData({...formData, squadType : e.target.value})
            },
            formAttributes : {
                className: "mb-4-lg"
            }
        }
    ];

    function addUnit(unitName)
    {
        if (!checkUnitNotPresent(unitName)) {
            dispatch({
                type: 'add',
                id: id++,
                name: unitName
            })
            return true;
        }
        return false;
    }

    function deleteUnit(unitId)
    {
        dispatch({
            type: 'delete',
            id: unitId
        })
    }

    function checkUnitNotPresent(unitName)
    {
        let present = false;
        if (squad.length) {
            squad.forEach(element => {
                if (element.name === unitName) {
                    present = true;
                    return true;
                }
            });
            return present;
        }
    }

    return (
        <>
            <Row>
                <Col className="text-center mt-4">
                    <h1>Création d'une nouvelle escouade</h1>
                </Col>
            </Row>
            <FormBootstrap className="mt-4">
                <Row>
                    <h2>Infomrations concernant l'escouade</h2>
                </Row>
                <Row className='mt-4'>
                    {
                        formFilterFields.map(element => {
                            return(
                                <Col lg={4} key={'col-form-'+element.key}>
                                    <FormGroup {...element}/>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row className='mt-4 align-items-end'>
                    <h2>Unités composant l'escouade</h2>
                    <Col lg={4} className='mb-4-lg'>
                        <FormBootstrap.Group>
                            <FormBootstrap.Label>Nom de l'unité à ajouter</FormBootstrap.Label>
                            <Input name="unitField" value={unitField} onChange={e => setUnitField(e.target.value)}/>
                        </FormBootstrap.Group>
                    </Col>
                    <Col lg={4}>
                        <ButtonBootstrap type="primary" text="Ajouter" onClick={e => {
                                e.preventDefault();
                                if (addUnit(unitField)) {
                                    setUnitField('');
                                }
                            }
                        }/>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    {
                        (squad.length > 0) ? 
                        squad.map(element => {
                                return (
                                <Col lg={4} key={`create-squad-${element.id}`}>
                                    <label>Unité numéro {element.id}</label>
                                    <FormBootstrap.Control type="text" name="units[]" value={element.name} readOnly/>
                                </Col>
                            )
                        }):
                        <Col className='text-center'><p>Veuillez ajouter des unités à l'escouade que vous souhaitez créer</p></Col>
                    }
                </Row>
            </FormBootstrap>
        </>
    );

}

export async function loader()
{
    const units = await importUnits()
    return units
}

let id = 1;