import React from "react";
import ReactDOM from "react-dom/client";
import TelaLogin from "./pages/TelaLogin";
import TelaInicial from "./pages/TelaInicial";
import TelaCadastro from "./pages/TelaCadastro";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TelaLogin />} />
				<Route path="/inicial" element={<TelaInicial />} />
				<Route path="/tela-cadastro" element={<TelaCadastro />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);