import { useContext } from "react";
import { FilterContext } from "./context/FilterContext";
import ArrayBootstrap from "../bootstrap-components/ArrayBootstrap";
import { Row, Col, Form } from "react-bootstrap";

export default function Array(props)
{

    const { filterData, setFilderData } = useContext(FilterContext)
    const filterContent = props.content.flatMap((element) => {
        return filterData.name && !element.name.includes(filterData.name) ? []
            : filterData.used_for && filterData.used_for !== element.used_for ? []
            : filterData.type && filterData.type !== element.type ? []
            : element
    })

    return (
        <Row className="mt-4">
            <ArrayBootstrap header={props.header} content={filterContent}/>
        </Row>
    )
}