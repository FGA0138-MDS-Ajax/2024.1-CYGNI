import React from 'react';
import '../styles/Campo.css';

const Campo = ({texto, tipo, id}) => {
    return (
        <div>
            <span>{texto}</span>
            <input  id={id} type={tipo}/> 
        </div>
    )
}

export default Campo
