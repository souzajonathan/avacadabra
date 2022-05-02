import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalPpcs({curso, openModal, closeModal}) {

    const [ppcs, setPpcs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/ppcs")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPpcs( data )
        })
    },[])
  
    return (
      <>
  
        <Modal show={openModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{curso.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ModalPpcs;