// import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'

export default function DeleteModal(props) {
    const handleClose = () => props.setShow(false)
    const handleDelete = () => {
        props.handleDeleteSong(props.songId)
        handleClose()
    }
    return (
        // <div>
            <Modal
                size="sm"
                show={props.show}
                aria-labelledby="example-modal-sizes-title-vcenter"
                centered
            >
                <Modal.Header>
                <Modal.Title>
                    Delete this song ?
                </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>

    );
}