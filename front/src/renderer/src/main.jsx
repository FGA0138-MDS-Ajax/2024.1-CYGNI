import React from "react";
import ReactDOM from "react-dom/client";
import TelaLogin from "./pages/TelaLogin/TelaLogin.jsx";
import TelaInicial from "./pages/TelaInicial/TelaInicial.jsx";
import TelaCadastro from "./pages/TelaCadastro/TelaCadastro.jsx";
import TelaRelatorio from "./pages/TelaRelatorio/TelaRelatorio.jsx";
import TelaRecuperacao from "./pages/TelasRedefinicao/TelaRecuperacao.jsx";
import TelaRedefinicao from "./pages/TelasRedefinicao/TelaRedefinicao.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RedefinicaoProvider } from "./pages/TelasRedefinicao/redefinicaoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<RedefinicaoProvider>
				<Routes>
					<Route path="/" element={<TelaLogin />} />
					<Route path="/inicial" element={<TelaInicial />} />
					<Route path="/tela-cadastro" element={<TelaCadastro />} />
					<Route path="/tela-relatorio" element={<TelaRelatorio />} />
					<Route path="/tela-recuperacao" element={<TelaRecuperacao />} />
					<Route path="/tela-redefinicao" element={<TelaRedefinicao />} />
				</Routes>
			</RedefinicaoProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
