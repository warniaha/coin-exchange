import './FeesBar.css';
import { formatPrice } from '../../functions/formatPrice'

const feesFilename = 'PaperFees';

export const resetFees = () => {
    localStorage.removeItem(feesFilename);
}

export const saveFees = (fees) => {
  localStorage.setItem(resetFees, JSON.stringify(fees));
}

export const readFees = (setFees) => {
  const fees = JSON.parse(localStorage.getItem(resetFees));
  setFees(fees ?? 0);
}

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