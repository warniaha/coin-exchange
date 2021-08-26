import './FeesBar.css';
import { formatPrice } from '../../functions/formatPrice'

export default function FeesBar (props) {
    return (
        <div className="fees-bar">
            <div>Simulated Fees:</div>
            <div>
                <div>Fees rate: {props.feeRate}</div>
            </div>
            <div>
                <div>Fees collected: ${formatPrice(props.feesCollected)}</div>
            </div>
        </div>
    );
}