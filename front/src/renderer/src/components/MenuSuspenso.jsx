import React from 'react';

const MenuSuspenso = ({texto, opcoes}) => {
    return (
        <div className="menu-suspenso">
        <span>{texto}</span>
            <select>
                {opcoes.map((opcao, index) => 
                    <option key={index} value={index+1}>{opcao}</option>
                )}
            </select>
        </div>
    )
}

export default MenuSuspenso;