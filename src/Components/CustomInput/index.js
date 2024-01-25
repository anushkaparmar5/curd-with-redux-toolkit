import React from 'react';
import { Form } from 'react-bootstrap';

const CustomInput = ({ label, type, value, id, name, placeholder, onChange, onBlur, error, options, isRequired = true, ...rest }) => {
    if (type === "radio" || type === "checkbox") {
        return (
            <Form.Group className="mb-3" controlId={`${id}-ControlInput1`}>
                <Form.Label htmlFor="inputPassword5">{label} {isRequired ? <span className='text-danger'>*</span> : null}</Form.Label>
                <div className=" d-flex gap-2 flex-wrap">
                    {options.map((option, index) => (
                        <Form.Check
                            onChange={onChange}
                            key={index}
                            defaultChecked={option?.value === value}
                            type={type}
                            id={`${id}-${index}`}
                            name={name}
                            label={option?.label}
                            value={option?.value}
                        />
                    ))}
                </div>
                {error ?
                    <div class="form-text text-danger">{error}</div>
                    : null}
            </Form.Group>)
    }
    else if (type === "select") {
        return (
            <Form.Group className="mb-3" controlId={`${id}-ControlInput1`}>
                <Form.Label htmlFor="inputPassword5">{label} {isRequired ? <span className='text-danger'>*</span> : null}</Form.Label>
                <Form.Select defaultValue={value} name={name} id={id} onChange={onChange} {...rest}>
                    <option value={null}>Select option</option>
                    {options.map((option, index) => (
                        <option key={index} value={option?.value}>{option?.label}</option>
                    ))}
                </Form.Select>
                {error ?
                    <div class="form-text text-danger">{error}</div>
                    : null}
            </Form.Group>
        )
    }
    else {
        return (
            <Form.Group className="mb-3" controlId={`${id}-ControlInput1`}>
                <Form.Label htmlFor="inputPassword5">{label} {isRequired ? <span className='text-danger'>*</span> : null}</Form.Label>
                <Form.Control
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                />
                {error ?
                    <div class="form-text text-danger">{error}</div>
                    : null}
            </Form.Group>
        )
    }
}

export default CustomInput