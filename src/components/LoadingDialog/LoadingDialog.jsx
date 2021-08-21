import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { ActionType } from '../ActionType';

export default function LoadingDialog(props) {
    const loadingMessage = (status) => {
        return status ? "Loading..." : "Completed";
    }
    const balancesStatus = () => {
        const status = Boolean(props.coinBalance);
        return <div>
            {loadingMessage(status)}
        </div>
    }
    const tickersStatus = () => {
        const status = Boolean(props.coinTicker);
        return <div>
            {loadingMessage(status)}
        </div>
    }
    const cashAvailableStatus = () => {
        const status = (props.cashAvailable !== undefined && props.cashAvailable >= 0);
        return <div>
            {loadingMessage(status)}
        </div>
    }
    const handleClose = () => {
        props.handleClose();
    }
    const [seconds, setSeconds] = React.useState(0);
    const [reloadSeconds, setReloadSeconds] = React.useState(5);
    const handleReload = () => {
        props.handleReload();
        setReloadSeconds(seconds + 5);
    }
    const enableReloadButton = seconds >= reloadSeconds;
    React.useEffect(() => {
        if (props.show) {
            const interval = setInterval(() => {
            debugger;
            setSeconds(seconds => seconds + 1);
            if (Boolean(props.coinBalance) &&
                Boolean(props.coinTicker) &&
                (props.cashAvailable !== undefined && props.cashAvailable >= 0)) {
                handleClose();
            }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
        >
            <Modal.Header>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className="table table-primary table-borders">
                    <tbody>
                        <tr>
                            <th>Balances</th>
                            <td>
                                <div>
                                    {balancesStatus()}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Tickers</th>
                            <td>
                                <div>
                                    {tickersStatus()}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Cash Available</th>
                            <td>
                                <div>
                                    {cashAvailableStatus()}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <p>{seconds} seconds have elapsed.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                    disabled={!enableReloadButton}
                    onClick={handleReload}>
                    Attempt to reload
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
