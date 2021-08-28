import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

export default function PopupDiv (props) {
    const divStyle = props.disabled ? {display: 'inline-block', cursor: 'not-allowed'} : {};
    return (
        <OverlayTrigger
            placement="top"
            trigger={["hover", "focus"]}
            overlay={(
                <Popover>
                    <Popover.Title>
                        {props.popup}
                    </Popover.Title>
                </Popover>
            )}>
            <div style={divStyle}>
                {props.text}
            </div>
        </OverlayTrigger>
    );
}
