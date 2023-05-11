import { useContext, useState } from "react";
import { FilterContext } from "./context/FilterContext";
import ArrayBootstrap from "../bootstrap-components/ArrayBootstrap";
import { Row, Col, Form } from "react-bootstrap";

export default function Array(props)
{
    const { filterData, setFilderData } = useContext(FilterContext)
    return (
        <Row className="mt-4">
            <ArrayBootstrap header={props.header} content={props.content}/>
        </Row>
    )
}