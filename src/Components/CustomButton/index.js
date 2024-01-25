import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const CustomButton = ({ variant = "outline-primary", onClick, text, icon, type = "button", isLoading = false, disabled = false, ...rest }) => {
    return (
        <Button
            variant={variant}
            className='d-flex align-items-center justify-content-center gap-1'
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            {...rest}
        >
            {text} {icon}
            {isLoading ?
                <Spinner size="sm" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : null}
        </Button>
    )
}

export default CustomButton