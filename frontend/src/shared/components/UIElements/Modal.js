import React from 'react';
import { ReactDOM } from 'react-dom';

import './Modal.css';

const Modal = props => {
    const content = (
        <div className="modal" show={props.show}>
            <header className="modal-header">
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className="modal-content">
                    {props.children}
                </div>
                <footer className="modal-footer">
                    {props.footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;