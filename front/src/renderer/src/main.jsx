import React from "react";
import ReactDOM from "react-dom/client";
import TelaLogin from "./pages/TelaLogin/TelaLogin.jsx";
import TelaInicial from "./pages/TelaInicial/TelaInicial.jsx";
import TelaCadastro from "./pages/TelaCadastro/TelaCadastro.jsx";
import TelaRelatorio from "./pages/TelaRelatorio/TelaRelatorio.jsx";
import TelaRecuperacao from "./pages/TelasRedefinicao/TelaRecuperacao.jsx";
import TelaRedefinicao from "./pages/TelasRedefinicao/TelaRedefinicao.jsx";
import TelaCampanha from '../src/pages/TelaCampanha/TelaCampanha.jsx'
import TelaCalendario from "./pages/TelaCalendario/telaCalendario.jsx";

import { RedefinicaoProvider } from "./pages/TelasRedefinicao/redefinicaoContext.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RedefinicaoProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TelaLogin />} />
					<Route path="/inicial" element={<TelaInicial />} />
					<Route path="/tela-cadastro" element={<TelaCadastro />} />
					<Route path="/tela-relatorio" element={<TelaRelatorio />} />
					<Route path="/tela-recuperacao" element={<TelaRecuperacao />} />
					<Route path="/tela-redefinicao" element={<TelaRedefinicao />} />
					<Route path="/tela-campanha" element={<TelaCampanha />} />
					<Route path="/tela-calendario" element={<TelaCalendario />} />

				</Routes>
			</BrowserRouter>
		</RedefinicaoProvider>
	</React.StrictMode>,
);