import { useCallback, useEffect, useState } from "react";
import {Form, Table, Button} from "react-bootstrap";

function ListarDisciplinas(){

    const [disciplina, setDisciplina] = useState([]);
    const [name, setName] = useState("");
    const [areas, setAreas] = useState([]);
    const [area_id, setArea_id] = useState("");

    useEffect(() => {
        fetch("http://localhost:5001/disciplinas")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setDisciplina( data )
        })
    },[])

    useEffect(() => {
        fetch("http://localhost:5001/areas")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAreas( data )
        })
    },[])

    const createDisciplina = useCallback( (event) => {
        event.preventDefault()
        console.log(JSON.stringify({name, area_id}))
        try {
            fetch("http://localhost:5001/disciplinas",
            {method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({name, area_id})})
            .then(response => response.json())
            .then(data => {
                setDisciplina( [...disciplina, data] )
            }).catch((error) => {
                alert(error.message);
            })
        } catch (error) {
            alert(error.message);
        }
    }, [name, area_id, disciplina])

    return(
        <>
            <Form style={{display: "flex"}} onSubmit={createDisciplina}>
                <Form.Group className="m-2" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder="Digite o nome da disciplina" value={name} onChange={ (e) => {setName(e.target.value)}} />
                </Form.Group>

                {
                    areas && (
                        <Form.Group className="m-2" controlId="area">
                            <Form.Label>Área de conhecimento</Form.Label>
                            <Form.Select value={area_id} onChange={ (e) => {setArea_id(e.target.value)} }>
                            <option>Selecione uma área</option>
                                {
                                    areas.map((area) =>
                                    <option key={area.id} value={area.id}>{area.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    )
                }

                <Button className="m-3" variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Área de conhecimento</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        disciplina.map((disciplina) =>
                            <tr key={disciplina.id}>
                                <td>{disciplina.name}</td>
                                <td>{disciplina.area.name}</td>
                            </tr>
                        )
                    }   
                </tbody>
            </Table>
        </>
        
    )
}

export default ListarDisciplinas;