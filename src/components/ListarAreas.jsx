import { useCallback, useEffect, useState } from "react";
import {Form, Table, Button} from "react-bootstrap";

function ListarAreas() {

    const [area, setArea] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch("http://localhost:5001/areas")
        .then(response => response.json())
        .then(data => {
            setArea( data )
        })
    },[])

    const createArea = useCallback( (event) => {
        event.preventDefault()
        fetch("http://localhost:5001/areas",
        { method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name, description})}
        )
        .then(response => response.json())
        .then(data => {
            setArea( [...area, data] )
        })
    }, [name, description, area])

    return(
        <>
            <Form style={{display: "flex"}} onSubmit={createArea}>
                <Form.Group className="m-2" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder="Digite o nome da área" value={name} onChange={ (e) => {setName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="m-2" controlId="description">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control placeholder="Digite a descrição da área" value={description} onChange={ (e) => {setDescription(e.target.value)}} />
                </Form.Group>

                <Button className="m-3" variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        area.map((area) =>
                            <tr key={area.id}>
                                <td>{area.name}</td>
                                <td>{area.description}</td>
                            </tr>
                        )
                    }   
                </tbody>
            </Table>
        </>
        
    )
}

export default ListarAreas;