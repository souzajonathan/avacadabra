import { useCallback, useEffect, useState } from "react";
import {Form, Button} from "react-bootstrap";

function CadastrarPpcs() {

    const [ppc, setPpc] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [curso_id, setCurso_id] = useState("");
    const [anoVoto, setAnoVoto] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [horaCredito, setHoraCredito] = useState("");
    const [quantSemestres, setQuantSemestres] = useState("");
    const [active, setActive] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5001/cursos")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCursos( data )
        })
    },[])

    const createPpcs = useCallback( (event) => {
        event.preventDefault()
        console.log(active);
        fetch("http://localhost:5001/ppcs",
        { method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres, active})}
        )
        .then(response => response.json())
        .then(data => {
            setPpc( [...ppc, data] )
        })
    }, [curso_id, anoVoto, dataInicio, dataFim, horaCredito, quantSemestres, active, ppc])

    return(
        <>
            <Form onSubmit={createPpcs}>

            {
                cursos && (
                    <Form.Group className="m-2" controlId="curso">
                        <Form.Label>Curso</Form.Label>
                        <Form.Select value={curso_id} onChange={ (e) => {setCurso_id(e.target.value)} }>
                        <option>Selecione um curso</option>
                            {
                                cursos.map((curso) =>
                                <option key={curso.id} value={curso.id}>{curso.name}</option>
                                )
                            }
                        </Form.Select>
                        </Form.Group>
                    )
                }

                <Form.Group className="m-2" controlId="anoVoto">
                    <Form.Label>Ano de voto</Form.Label>
                    <Form.Control type="number" required min={1997} max={2040} placeholder="Digite o ano do voto" value={anoVoto} onChange={ (e) => {setAnoVoto(e.target.value)}} />
                </Form.Group>

                <Form.Group className="m-2" controlId="dataInicio">
                    <Form.Label>Data Início</Form.Label>
                    <Form.Control type="date" required placeholder="Digite a data de início" value={dataInicio} onChange={ (e) => {setDataInicio(e.target.value)}} />
                </Form.Group>

                <Form.Group className="m-2" controlId="dataFim">
                    <Form.Label>Data Fim</Form.Label>
                    <Form.Control type="date" required placeholder="Digite a data de fim" value={dataFim} onChange={ (e) => {setDataFim(e.target.value)}} />
                </Form.Group>

                <Form.Group className="m-2" controlId="horaCredito">
                    <Form.Label>Hora Crédito</Form.Label>
                    <Form.Control type="number" required min={1} max={300} placeholder="Digite a hora crédito" value={horaCredito} onChange={ (e) => {setHoraCredito(e.target.value)}} />
                </Form.Group>

                <Form.Group className="m-2" controlId="dataFim">
                    <Form.Label>Quantidade de Semestres</Form.Label>
                    <Form.Control type="number" required min={2} max={20} placeholder="Digite a quantidade de semestres" value={quantSemestres} onChange={ (e) => {setQuantSemestres(e.target.value)}} />
                </Form.Group>

                <Form.Check
                    type="switch"
                    id="active"
                    label="PCC ativo?"
                    value={active}
                    onChange={ (e) => {setActive(e.target.checked)}}
                />

                <Button className="m-3" variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </>
        
    )
}

export default CadastrarPpcs;