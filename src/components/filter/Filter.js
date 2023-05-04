import { Row, Col, Form, Button } from "react-bootstrap";

export default function Filter(props)
{
    let formFilterFields = [
        {
            key : 0,
            type : 'text',
            name : 'name',
            label : 'Nom de la team',
            placeholder : "Nom de la team",
            event : props.functionFilterName
        },
        {
            key : 1,
            type : 'select',
            name : 'type',
            label : 'Type d\'unité',
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
            event : props.functionFilterType
        },
        {
            key : 2,
            type : 'select',
            name : 'emplacement',
            label : 'Emplacement',
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
            event : props.functionFilterEmplacement
        }
    ];
    return (
    <>
        /* Créer un sous composant de type Select, Un sous composant de type Texte et un sous composant de type "bouton" et faire appel à ces composants dans la fonction map */
        <Row className="mt-4 justify-content-center">
            {
                formFilterFields.map((element) => {
                    switch (element.type) {
                        case 'text' :
                            var formInput = <Form.Control type="text" id={element.name} placeholder={element.placeholder}/>
                            break;
                        case 'select' :
                            var formInput = <Form.Select id={element.name}>
                                <option>{element.defaultValue}</option>
                                {
                                    element.options.map((option, key) => <option key={"option-filter-select"+key} value={option.value}>{option.label}</option>)
                                }
                            </Form.Select>
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
                <Button type="submit">Valider la recherche</Button>
            </Col>
            <Col className="col-2">
                <Button variant="secondary">Réinitialiser les filtres</Button>
            </Col>
        </Row>
    </>
    )
}