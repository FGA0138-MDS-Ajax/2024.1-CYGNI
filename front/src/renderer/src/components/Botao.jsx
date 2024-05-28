import react from "react";

const Botao = ({ icone, texto, cor, largura  }) => {
    return (
        <button style={{ fontSize: "16", color: "white", backgroundColor: cor, width: largura,
                 display: "flex", justifyContent: "center", alignItems: "center" }}>
            {icone}
            {texto}
        </button>
    )
}

export default Botao;