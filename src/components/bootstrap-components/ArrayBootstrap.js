import Table from 'react-bootstrap/Table';

export default function ArrayBootstrap(props)
{
    return (
        <Table bordered responsive className="mt-4">
            <thead>
                <tr>
                    {Object.values(props.header).map((value, key) => <th key={key}>{value}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    (props.content.length > 0) ? props.content.map(
                        (data,key) => {
                            return <tr key={key}>{
                                Object.keys(data).map(
                                    (property,key2) => <td key={key2}>{data[property]}</td>
                                )
                            }</tr>
                        }
                    ) : 
                    <tr><td colSpan={Object.values(props.header).length}>Aucun résultat trouvé</td></tr>}
            </tbody>
        </Table>
    )
}

