import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function AlertDialog(props) {
    const isAcceptanceButtonPresent = () => {
        return props.alertAcceptHandler !== undefined &&
            props.alertAcceptHandler.handler !== undefined &&
            props.alertButtonAcceptText && props.alertButtonAcceptText.length > 0;
    }
    const getCancelButtonText = () => {
        return isAcceptanceButtonPresent() ? "Cancel" : "Close";
    }
    const getAlertAcceptButton = () => {
        if (isAcceptanceButtonPresent()) {
          return <Button onClick={() => {
              props.handleClose();
              props.alertAcceptHandler.handler();
            }} variant="outline-danger">
            {props.alertButtonAcceptText}
            </Button>
        }
        return <></>;
      }
    
      return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{props.alertHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.alertMessage}
            </Modal.Body>
            <Modal.Footer>
                {getAlertAcceptButton()}
                <Button onClick={() => {
                    props.handleClose();
                    props.alertCancelHandler.handler();
                    }} variant="outline-success">
                    {getCancelButtonText()}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}