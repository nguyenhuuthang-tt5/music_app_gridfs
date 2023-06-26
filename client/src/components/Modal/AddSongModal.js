import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'

export default function AddSongModal(props) {
    const [nameSong, setNameSong] = useState('')
    const [singer, setSinger] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [songFile, setSongFile] = useState('')
    //
    const resetForm = () => {
        setNameSong('')
        setSinger('')
        setImageFile('')
        setSongFile('')
    }
    const handleClose = () => {
        props.setShowAddModal(false)
        resetForm()
    }
    //
    const handleSubmit = (e) => {
        e.preventDefault()
        //
        const formData = new FormData();
        formData.append('name', nameSong)
        formData.append('singer', singer)
        formData.append('imageFile', imageFile)
        formData.append('songFile', songFile)
        props.handleAddSong(formData)
        resetForm()
        handleClose()
        props.setUploading(true)
    }
    return (
        <Modal
            size="sm"
            show={props.showAddModal}
            onHide={handleClose}
            aria-labelledby="example-modal-sizes-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title> New Song </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter name of song" name="name" value={nameSong} onChange={(e) => setNameSong(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter name of singer" name="singer" value={singer} onChange={(e) => setSinger(e.target.value)} required/>
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image file</Form.Label>
                        <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Song file</Form.Label>
                        <Form.Control type="file" onChange={(e) => setSongFile(e.target.files[0])} required/>
                    </Form.Group>
                    <Button type='submit' className='float-end'>Add</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
