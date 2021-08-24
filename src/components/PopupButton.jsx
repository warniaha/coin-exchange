import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';

export default function PopupButton (props) {
    const divStyle = props.disabled ? {display: 'inline-block', cursor: 'not-allowed'} : {};
    const buttonStyle = props.disabled ? {pointerEvents : 'none'} : {};
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
            {/* <div style={{display: 'inline-block', cursor: 'not-allowed'}}> */}
            <div style={divStyle}>
                <Button 
                    onClick={props.onClick} 
                    style={buttonStyle} 
                    disabled={props.disabled} 
                    variant={props.variant}>
                    {props.text}
                </Button>
            </div>
        </OverlayTrigger>
    );
}
