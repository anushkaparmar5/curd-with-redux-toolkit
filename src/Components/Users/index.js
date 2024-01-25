import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { IoIosAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import CustomModel from '../CustomModel';
import CustomInput from '../CustomInput';
import { toast } from 'react-toastify';
import { titleCase } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser, getLoading, selectUsers, getToastMessage, resetMessage, resetLoading } from '../../userSlice';
import CustomButton from '../CustomButton';

const Users = () => {
    const initialUserData = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: 'Test@123',
        mobile: '1234567890',
        country: 'india',
        dateOfBirth: '2024-02-25',
        gender: 'male',
        hobbies: ['reading'],
    };

    const users = useSelector(selectUsers);
    const isLoading = useSelector(getLoading);
    const message = useSelector(getToastMessage);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('firstName');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(initialUserData);
    const [modalType, setModalType] = useState("add");
    const [show, setShow] = useState(false);

    const handleEditUser = (user) => {
        setModalType("edit");
        setFormData(user);
        handleShow();
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDeleteUser = (user) => {
        setModalType("delete");
        setFormData(user);
        handleShow();
    };

    const handleClose = () => {
        setShow(false);
        setModalType("add");
        setFormData(initialUserData);
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedData = {
            ...formData,
            [name]: type === 'checkbox' ? (checked ? [...new Set([...formData[name], value])] : formData[name].filter(item => item !== value)) : value,
        }
        setFormData(updatedData);
        validateField(name, value, updatedData);
    };

    const validateFormData = (data) => {
        const newErrors = {};
        Object.keys(data).forEach((name) => {
            validateField(name, data[name]);
            if (errors[name]) {
                newErrors[name] = errors[name];
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors)?.length ? true : false;
    };

    const validateField = (name, value, updatedData) => {
        let error = '';
        switch (name) {
            case 'firstName':
                error = value ? '' : 'First Name is required';
                break;
            case 'lastName':
                error = value ? '' : 'Last Name is required';
                break;
            case 'email':
                error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
                break;
            case 'password':
                error = value.length >= 6 ? '' : 'Password must be at least 6 characters';
                break;
            case 'mobile':
                error = /^\d{10}$/.test(value) ? '' : 'Mobile must be 10 digits';
                break;
            case 'country':
                error = value ? '' : 'Country is required';
                break;
            case 'dateOfBirth':
                error = value ? '' : 'Date of Birth is required';
                break;
            case 'gender':
                error = value ? '' : 'Gender is required';
                break;
            case 'hobbies':
                error = updatedData?.hobbies?.length > 0 ? '' : 'At least one hobby is required';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (!validateFormData(formData)) {
            if (modalType === 'add') {
                dispatch(addUser(formData));
            } else if (modalType === 'edit') {
                dispatch(editUser(formData));
            }
            else {
                dispatch(deleteUser(formData?.id));
            }
            setTimeout(() => {
                handleClose();
                dispatch(resetLoading())
            }, 250);
        } else {
            toast.error("All field are required.");
        }
    };

    const handleSort = (field) => {
        setSortField(field);
        setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    };

    const sortedUsers = [...users].sort((a, b) => {
        const fieldA = a[sortField].toLowerCase();
        const fieldB = b[sortField].toLowerCase();

        if (fieldA < fieldB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (fieldA > fieldB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter((user) => {
        const searchTerm = searchQuery.toLowerCase();
        return Object.values(user).some(
            (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        );
    });

    if (message && Object?.keys(message)?.length) {
        toast(message.text, { type: message.type });
        dispatch(resetMessage());
    }

    return (
        <React.Fragment>
            <div>
                {users?.length ? (
                    <div className="main-body">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="count">Total Users: <span className='fw-bold'>{users?.length}</span></div>
                            <div className="search-input">
                                <CustomInput
                                    isRequired={false}
                                    name="searchQuery"
                                    id="searchQuery"
                                    value={searchQuery}
                                    placeholder="Search..."
                                    type={"search"}
                                    onChange={handleSearch}
                                />
                            </div>
                            <div className="add-user-btn">
                                <CustomButton
                                    onClick={handleShow}
                                    text={"Add User"}
                                    icon={<MdAdd />}
                                />
                            </div>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={() => handleSort('firstName')}>
                                        First Name  {sortField === 'firstName' && (
                                            <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => handleSort('lastName')}>
                                        Last Name  {sortField === 'lastName' && (
                                            <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </th>
                                    <th onClick={() => handleSort('email')}>
                                        Email  {sortField === 'email' && (
                                            <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                        )}
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers?.length ? filteredUsers?.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{titleCase(user?.firstName)}</td>
                                        <td>{titleCase(user?.lastName)}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            <div className='d-flex gap-1'>
                                                <CustomButton
                                                    variant="outline-warning"
                                                    onClick={() => handleEditUser(user)}
                                                    icon={<FaEdit />}
                                                />
                                                <CustomButton
                                                    variant="outline-danger"
                                                    onClick={() => handleDeleteUser(user)}
                                                    icon={<MdDeleteOutline />}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5}>
                                            No User Found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="d-flex align-items-center flex-column mt-5">
                        <h3>No Users found.</h3>
                        <div className="add-user-btn">
                            <CustomButton
                                onClick={handleShow}
                                icon={<IoIosAdd color='#fff' />}
                                text={"Add User "}
                            />
                        </div>
                    </div>
                )}
            </div>
            <CustomModel
                modalType={modalType}
                modalHeading={modalType === 'edit' ? "Edit User" : modalType === 'delete' ? "Delete User" : "Add User"}
                show={show}
                handleClose={handleClose}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            >
                {modalType === "delete" ? (
                    <div className=''>
                        <h3> Are you sure?</h3>
                    </div>
                ) : (
                    <>
                        <CustomInput
                            name="firstName"
                            id="firstName"
                            value={formData['firstName']}
                            placeholder={"Enter First Name"}
                            label={"First Name"}
                            type={"text"}
                            onChange={handleChange}
                            error={errors["firstName"]}
                            autoFocus
                        />
                        <CustomInput
                            name="lastName"
                            id="lastName"
                            value={formData['lastName']}
                            placeholder={"Enter Last Name"}
                            label={"Last Name"}
                            type={"text"}
                            onChange={handleChange}
                            error={errors["lastName"]}
                        />
                        <CustomInput
                            name="email"
                            id="email"
                            value={formData['email']}
                            placeholder={"Enter Email"}
                            label={"Email"}
                            type={"email"}
                            onChange={handleChange}
                            error={errors["email"]}
                        />
                        <CustomInput
                            name="password"
                            id="password"
                            value={formData['password']}
                            placeholder={"Enter Password"}
                            label={"Password"}
                            type={"password"}
                            onChange={handleChange}
                            error={errors["password"]}
                        />
                        <CustomInput
                            name="mobile"
                            id="mobile"
                            value={formData['mobile']}
                            placeholder={"Enter Mobile"}
                            label={"Mobile"}
                            type={"number"}
                            onChange={handleChange}
                            error={errors["mobile"]}
                        />
                        <CustomInput
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={formData['dateOfBirth']}
                            placeholder={"Enter Date of Birth"}
                            label={"Date of Birth"}
                            type={"date"}
                            onChange={handleChange}
                            error={errors["dateOfBirth"]}
                        />
                        <CustomInput
                            name="country"
                            id="country"
                            value={formData['country']}
                            label={"Country"}
                            type={"select"}
                            options={[
                                {
                                    label: "India",
                                    value: "india",
                                },
                                {
                                    label: "US",
                                    value: "us",
                                },
                                {
                                    label: "Canada",
                                    value: "canada",
                                }
                            ]}
                            onChange={handleChange}
                            error={errors["country"]}
                        />
                        <CustomInput
                            name="gender"
                            id="gender"
                            value={formData['gender']}
                            label={"Gender"}
                            type={"radio"}
                            options={[
                                {
                                    label: "Male",
                                    value: "male",
                                },
                                {
                                    label: "Female",
                                    value: "female",
                                }
                            ]}
                            onChange={handleChange}
                            error={errors["gender"]}
                        />
                        <CustomInput
                            name="hobbies"
                            id="hobbies"
                            value={formData['hobbies']}
                            label={"Hobbies"}
                            type={"checkbox"}
                            options={[
                                {
                                    label: "Reading",
                                    value: "reading",
                                },
                                {
                                    label: "Traveling",
                                    value: "traveling",
                                }
                            ]}
                            onChange={handleChange}
                            error={errors["hobbies"]}
                        />
                    </>)}
            </CustomModel>
        </React.Fragment >
    )
}

export default Users;