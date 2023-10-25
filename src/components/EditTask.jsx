import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditTask({initialData, onEdit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useState(initialData);

  const update = (event) => {
    setState( { ...state, [event.target.name]: event.target.value });
  };
  const handleUpdate = () => {
    onEdit( initialData.index,
      {
      task: state.task,
      description: state.description
    });
    handleClose(); // Close the modal after editing
  }

 

  return (
    <>
      <button variant="btn" style={{ border:'none'}} onClick={handleShow}>
        <img src="edit.png" width={30} height={30} alt="" />
      </button>

<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name='task' placeholder='Enter Task Name' className='form-control' value={state.task} onChange={update} />
          <textarea name="description" cols="30" rows="5" placeholder='Add description' className='form-control mt-2' value={state.description} onChange={update}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="button" className="btn text-white" onClick={handleUpdate}>Update</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;
