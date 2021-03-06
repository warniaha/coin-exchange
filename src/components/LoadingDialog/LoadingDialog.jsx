import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';

export default function LoadingDialog(props) {
    const loadingMessage = (status) => {
        return status ? "Completed" : "Loading...";
    }
    const balancesStatus = () => {
        const status = Boolean(props.coinBalance);
        return <div>
            {loadingMessage(status)}
        </div>
    }
    const settingsStatus = () => {
        const status = props.settings.feeRate !== undefined;
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
            setSeconds(seconds => seconds + 1);
            if (Boolean(props.coinBalance) &&
                Boolean(props.coinTicker) &&
                props.settings.feeRate !== undefined) {
                props.handleClose();
                setSeconds(0);
            }}, 1000);
            return () => clearInterval(interval);
        }
    }, [props]);
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
                            <th>Settings</th>
                            <td>
                                <div>
                                    {settingsStatus()}
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
