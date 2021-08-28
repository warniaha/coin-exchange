import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { ActionType } from '../ActionType';

export default function SettingsDialog(props) {

    const handleCancel = () => {
        props.handleClose();
    }
    
    const onSave = () => {
        props.handleClose();
        props.handleAction(ActionType.SaveSettings, { feeRate: props.settings.feeRate });
    }
    
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Table className="table table-primary table-borders">
                <tbody>
                    <tr>
                        <th>Simulated fees</th>
                        <td>
                            <input type="text"
                                className="form-control" 
                                id="text-input" 
                                value={props.settings.feeRate}
                                name="input-name"
                                placeholder="Enter percentage that should be collected in fees"
                                onChange={(event) => props.onValidator({feeRate: event.target.value})}/>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="flex-filter">
                {props.inputTitle}
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" size="sm"
                    onClick={onSave}>
                    Save
                </Button>
                <Button variant="info" size="sm"
                    onClick={handleCancel}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
