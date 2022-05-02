import { useCallback, useEffect, useState } from "react";
import {Form, Table, Button} from "react-bootstrap";
import ModalPpcs from "./ModalPpcs";

function ListarCursos(){

    const [curso, setCurso] = useState([]);
    const [name, setName] = useState("");
    const [modal, setModal] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5001/cursos")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCurso( data )
        })
    },[])

    const createCurso = useCallback( (event) => {
        event.preventDefault()
        try {
            fetch("http://localhost:5001/cursos",
            {method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({name})})
            .then(response => response.json())
            .then(data => {
                setCurso( [...curso, data] )
            }).catch((error) => {
                alert(error.message);
            })
        } catch (error) {
            alert(error.message);
        }
    }, [name, curso])

    return(
        <>

            {
                !!modal && (
                    <ModalPpcs curso={modal} openModal={!!modal} closeModal={()=>setModal(null)} />
                )
            }

            <Form style={{display: "flex"}} onSubmit={createCurso}>
                <Form.Group className="m-2" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control placeholder="Digite o nome do curso" value={name} onChange={ (e) => {setName(e.target.value)}} />
                </Form.Group>

                <Button className="m-3" variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        curso.map((curso) =>
                            <tr key={curso.id} onClick={ () => setModal(curso) }>
                                <td>{curso.name}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
        
    )
}

export default ListarCursos;