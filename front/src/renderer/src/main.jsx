import React from "react";
import ReactDOM from "react-dom/client";
import TelaLogin from "./pages/TelaLogin/TelaLogin.jsx";
import TelaInicial from "./pages/TelaInicial/TelaInicial.jsx";
import TelaCadastro from "./pages/TelaCadastro/TelaCadastro.jsx";
import TelaRelatorio from "./pages/TelaRelatorio/TelaRelatorio.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TelaLogin />} />
				<Route path="/inicial" element={<TelaInicial />} />
				<Route path="/tela-cadastro" element={<TelaCadastro />} />
				<Route path="/tela-relatorio" element={<TelaRelatorio />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
