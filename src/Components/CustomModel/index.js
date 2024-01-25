import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../CustomButton';

function CustomModel({ show, handleClose, onSubmit, children, modalHeading, modalType = "add", isLoading = false }) {

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            {modalHeading ? <Modal.Header closeButton>
                <Modal.Title>{modalHeading}</Modal.Title>
            </Modal.Header> : null}
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    {children}
                    <Modal.Footer>
                        <CustomButton
                            variant="secondary"
                            onClick={handleClose}
                            text={modalType === 'delete' ? "No" : "Close"}
                        />
                        <CustomButton
                            isLoading={isLoading}
                            variant="primary"
                            type='submit'
                            text={modalType === 'edit' ? "Edit" : modalType === 'delete' ? "Yes" : "Add"}
                        />
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CustomModel;