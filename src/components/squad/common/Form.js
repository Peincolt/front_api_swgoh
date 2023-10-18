import '../../../assets/css/responsive.css';
import { Col, Row, Card, Button } from "react-bootstrap";
import { Form as FormBootstrap } from 'react-bootstrap'
import { useReducer, useState, useContext, useEffect } from "react";
import FormGroup from "../../bootstrap-components/FormGroup";
import squadReducer from './reducer/squadReducer';
import ButtonBootstrap from '../../bootstrap-components/ButtonBootstrap';
import { checkUnitNotPresent, unitExist } from '../helper/VerifUnits';
import Autocomplete from '../../autocomplete/Autocomplete';
import { Helmet } from 'react-helmet-async';
import { GlobalContext } from '../../common/context/GlobalContextProvider';

export function Form(props)
{
    const [formData, setFormData] = useState(props.squad);
    const [unitField, setUnitField] = useState('');
    const [unitFieldStatus, setUnitFieldStatus] = useState('');
    const { heroes, ships } = props;
    const [currentList, setCurrentList] = useState(props.currentList);
    const [squad, dispatch] = useReducer(squadReducer,props.units);
    const [id, setId] = useState(props.id)
    const { setGlobalData } = useContext(GlobalContext)
    const pageTitle = (squad.length === 0) ? "Création d'une nouvelle escouade" : `Modification de l'escouade ${formData.name}`;
    const urlApi = process.env.REACT_APP_API_URL;

    useEffect(() => {
        setGlobalData(
            {
                spinner: false
            }
        )
    },[])

    const formFilterFields = [
        {
            key : 0,
            type : 'text',
            label : 'Nom de l\'escouade',
            attributes : {
                required: true,
                value : formData.name,
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
                value: formData.unitType,
                defaultValue : "Type d'unité",
                focus: true,
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
                onChange : (e) => {
                    setFormData({...formData, unitType : e.target.value})
                    if (e.target.value === 'ship') {
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
                value: formData.squadType,
                name : 'used_for',
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
                onChange : (e) => setFormData({...formData, squadType : e.target.value})
            },
            formAttributes : {
                className: "mb-4-lg"
            }
        }
    ];
    const inputProps = {
        onChange: (event, {newValue}) => {setUnitField(newValue)},
        className: "form-control",
        placeholder: "Nom de l'unité à ajouter",
        value: unitField
    }
    const submitProps = {
        type: "submit",
        variant: "primary",
        text: props.id === 0 ? "Créer l'escouade" : "Modifier l'escouade" ,
        disabled: squad.length > 0 ? false : true
    };

    function addUnit(unitName)
    {
        if (!checkUnitNotPresent(unitName, squad)) {
            const returnUnitExist = unitExist(unitName, currentList)
            if (returnUnitExist[0]) {
                dispatch({
                    type: 'add',
                    id: id+1,
                    name: unitName,
                    baseId: returnUnitExist[1],
                    image: returnUnitExist[2]
                })
                setId(id+1);
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
        let reponse;
        let bodyData = new URLSearchParams({
            name: formData.name,
            used_for: formData.squadType,
            guild: 1,
            type: formData.unitType
        });
        squad.map(element => {
            bodyData.append('units[]',element.baseId)
        })

        if (props.id === 0) {
            reponse = await fetch(`${urlApi}/squad/create`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyData
            })
        } else {
            reponse = await fetch(`${urlApi}/squad/${formData.uniqueIdentifier}/update`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: bodyData
            })
        }

        const jsonResponse = await reponse.json();
        if (jsonResponse.result.message !== undefined) {
            alert(jsonResponse.result.message)
            document.location.href='/squad/'+jsonResponse.result.unique_identifier;
        } else {
            alert('Une erreur est survenue lors de la création de l\'escouade dans la base de données');
        }
    }

    return (
        <>
            <Helmet>
                <title>{`HGamers II - ${pageTitle}`}</title>
            </Helmet>
            <Row>
                <Col className="text-center mt-4">
                    <h1>{pageTitle}</h1>
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
                        (
                            squad.map(element => {
                                return (
                                <Col lg={4} key={`create-squad-${element.id}`} className='mb-4-lg'>
                                    <Card style={{ marginBottom: '20px', height: '35%', width: '35%'}}>
                                        <div style={{positon: 'relative'}}>
                                            {
                                            element.id !== squad[0].id ?
                                                <button type="button" onClick={
                                                    e => {
                                                        e.preventDefault();
                                                        dispatch(
                                                            {
                                                                type: 'left',
                                                                id:element.id
                                                            }
                                                        )
                                                    }
                                                }
                                                className="close" aria-label="Close" style={{position: 'absolute', top: 0, right: 50, backgroundColor: 'blue', color: 'white', border: 'none'}}>
                                                    &lt;
                                                </button>
                                            : ''
                                            } 
                                            <button type="button" onClick={e => {deleteUnit(e, element.id)}} className="close" aria-label="Close" style={{position: 'absolute', top: 0, right: 25, backgroundColor: 'red', color: 'white', border: 'none'}}>
                                                X
                                            </button>
                                            {
                                                element.id !== squad[squad.length-1].id ?
                                                    <button type="button" onClick={
                                                        e => {
                                                            e.preventDefault();
                                                            dispatch(
                                                                {
                                                                    type: 'right',
                                                                    id:element.id
                                                                }
                                                            )
                                                        }
                                                     } className="close" aria-label="Close" style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'blue', color: 'white', border: 'none' }}>
                                                        &gt;
                                                    </button>
                                                : 
                                                <button type="button" disabled className="close hidden" aria-label="Close" style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'blue', color: 'white', border: 'none' }}>
                                                    &gt;
                                                </button>
                                            }
                                            <Card.Img variant="top" className="card-img-top" src={element.image}/>
                                        </div>
                                        <Card.Body>
                                                <Card.Title className='text-center'>
                                                    {element.name}
                                                </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })):
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