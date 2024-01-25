import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { IoIosAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import CustomModel from '../CustomModel';

const Users = () => {
    const [users, setUsers] = useState(Array.from({ length: 10 }, (v, i) => i));
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {true ? (
                <div className="main-body">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="count">Total Users: {users?.length}</div>
                        <div className="add-user-btn">
                            <Button variant="outline-primary" onClick={handleShow}>Add User <MdAdd /></Button>
                        </div>
                    </div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>Test</td>
                                    <td>Test</td>
                                    <td>test@gmail.com</td>
                                    <td>Test@123</td>
                                    <td>
                                        <div className='d-flex gap-1'>
                                            <Button variant="outline-info"><FaEye /></Button>
                                            <Button variant="outline-warning"><FaEdit /></Button>
                                            <Button variant="outline-danger"><MdDeleteOutline /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <CustomModel
                        show={show}
                        handleClose={handleClose}
                    >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </CustomModel>
                </div>
            ) : (
                <div className="d-flex align-items-center flex-column mt-5">
                    <h3>No Users found.</h3>
                    <div className="add-user-btn">
                        <Button variant="primary">Add User <IoIosAdd color='#fff' /></Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users;