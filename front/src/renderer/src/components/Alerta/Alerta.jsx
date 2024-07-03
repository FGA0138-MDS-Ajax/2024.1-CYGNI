import React from "react"; 
import "./Alerta.css"; 

const Alert = ({ message, type, onClose }) => (
    <div className={`alert alert-${type}`}>
        {message} 
        <button className="close-btn" onClick={onClose}>
            X 
        </button>
    </div>
);

export default Alert; 