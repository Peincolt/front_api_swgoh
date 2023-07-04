import '../../assets/css/create-squad.css';
import { Col, Row } from "react-bootstrap";
import importUnits from "../../code/create-squad/importUnits"
import { useLoaderData } from "react-router-dom";
import { Form as FormBootstrap } from 'react-bootstrap'
import { useReducer, useRef, useState } from "react";
import FormGroup from "../bootstrap-components/FormGroup";
import squadReducer from './reducer/squadReducer';
import ButtonBootstrap from '../bootstrap-components/ButtonBootstrap';
import { checkUnitNotPresent, unitExist } from './helper/VerifUnits';
import Autocomplete from '../autocomplete/Autocomplete';

export default function Form(props)
{
    let [formData, setFormData] = useState({});
    let [unitField, setUnitField] = useState('');
    let [unitFieldStatus, setUnitFieldStatus] = useState('');
    let { heroes, ships } = useLoaderData();
    let [currentList, setCurrentList] = useState([]);
    let [squad, dispatch] = useReducer(squadReducer,[]);
    let formFilterFields = [
        {
            key : 0,
            type : 'text',
            label : 'Nom de l\'escouade',
            attributes : {
                required: true,
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
                required: true,
                name : 'type',
                defaultValue : "Type d'unité",
                focus: true,
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
                onChange : (e) => {
                    setFormData({...formData, unitType : e.target.value})
                    if (e.target.value == 'ship') {
                        setCurrentList(ships)
                    } else {
                        setCurrentList(heroes)
                    }
                    dispatch({
                        type: 'clean'
                    })
                }
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
                required: true,
                name : 'used_for',
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
    let inputProps = {
        onChange: (event, {newValue}) => {setUnitField(newValue)},
        className: "form-control",
        placeholder: "Nom de l'unité à ajouter",
        value: unitField
    }
    let submitProps = {
        type: "submit",
        variant: "primary",
        text: "Créer l'escouade",
        disabled: squad.length > 0 ? false : true
    };

    function addUnit(unitName)
    {
        if (!checkUnitNotPresent(unitName, squad)) {
            const baseId = unitExist(unitName, currentList)
            if (baseId) {
                dispatch({
                    type: 'add',
                    id: id++,
                    name: unitName,
                    baseId: baseId
                })
                return true;
            }
            setUnitFieldStatus('L\'unité que vous essayer d\'ajouter n\'existe pas');
            return false;
        }
        setUnitFieldStatus('L\'unité que vous essayez d\'ajouter existe déjà');
        return false;
    }

    function deleteUnit(event, unitId)
    {
        event.preventDefault();
        dispatch({
            type: 'remove',
            id: unitId
        })
    }

    async function validFormulaire(event)
    {
        event.preventDefault();
        let bodyData = new URLSearchParams({
            name: formData.name,
            used_for: formData.squadType,
            guild: 1,
            type: formData.unitType
        });
        squad.map(element => {
            bodyData.append('units[]',element.baseId)
        })

        const reponse = await fetch('http://www.api-hgamers.fr/api/squad/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData
        })
        const jsonResponse = await reponse.json();
        if (jsonResponse.result.message !== undefined) {
            alert(jsonResponse.result.message)
        } else {
            alert('Une erreur est survenue lors de la création de l\'escouade dans la base de données');
        }
    }

    return (
        <>
            <Row>
                <Col className="text-center mt-4">
                    <h1>Création d'une nouvelle escouade</h1>
                </Col>
            </Row>
            <FormBootstrap className="mt-4" onSubmit={validFormulaire}>
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
                            <Autocomplete inputProps={inputProps} list={currentList} onSuggestionSelected={(event, {suggestion}) => {
                                if (addUnit(suggestion.name)) {
                                    setUnitField('');
                                    setUnitFieldStatus('');
                                }
                            }}/>
                        </FormBootstrap.Group>
                    </Col>
                    <Col lg={4}>
                        <ButtonBootstrap variant="primary" text="Ajouter" onClick={e => {
                                e.preventDefault();
                                if (currentList.length) {
                                    if (addUnit(unitField)) {
                                        setUnitField('');
                                        setUnitFieldStatus('');
                                    }
                                } else {
                                    setUnitFieldStatus('Vous devez choisir le type d\'unité avant de pouvoir ajouter une unité');
                                }
                            }
                        }/>
                    </Col>
                </Row>
                {(unitFieldStatus !== '') ? <Row><Col><div className='text-danger'>{unitFieldStatus}</div></Col></Row>: ''}
                <Row className='mt-4'>
                    {
                        (squad.length > 0) ? 
                        squad.map(element => {
                                return (
                                <Col lg={4} key={`create-squad-${element.id}`} className='mb-4-lg'>
                                    <label>Unité numéro {element.id + 1}</label>
                                    <FormBootstrap.Control variant="text" name="units[]" value={element.name} readOnly/>
                                    <div className='mt-1'>
                                        {element.id !== squad[0].id ? <ButtonBootstrap variant="dark" text="<" onClick={(e) => {
                                                e.preventDefault();
                                                dispatch({type: 'left', id:element.id})
                                            }
                                        }/> : ''}
                                        <ButtonBootstrap variant="danger" text="X" onClick={e => {deleteUnit(e, element.id)}} className="ms-2 me-2"/>
                                        {element.id !== squad[squad.length-1].id ? <ButtonBootstrap variant="dark" text=">" onClick={(e) => {
                                                e.preventDefault();
                                                dispatch({type: 'right', id:element.id})
                                            }
                                        }/>:''}
                                    </div>
                                </Col>
                            )
                        }):
                        <Col className='text-center'><p>Veuillez ajouter des unités à l'escouade que vous souhaitez créer</p></Col>
                    }
                </Row>
                <Row className='mt-4'>
                    <Col className='text-center'>
                        <ButtonBootstrap {...submitProps} />
                    </Col>
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

let id = 0;