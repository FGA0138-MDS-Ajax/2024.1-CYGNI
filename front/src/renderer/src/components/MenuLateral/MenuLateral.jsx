import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FiHome, FiCalendar, FiClipboard, FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import Logo from "../../assets/img/IconeAGIS.svg";

import "./MenuLateral.css";

const MenuLateral = () => {
	const location = useLocation();

	const menuItems = [
		{ icon: <FiHome />, text: "Início", path: "/inicial" },
		{ icon: <FiCalendar />, text: "Relatório", path: "/tela-relatorio" },
		{ icon: <FiClipboard />, text: "Campanha", path:'/tela-campanha' },
		{ icon: <FiUser />, text: "Admins", path: "/tela-adm" },
	];

	const logoutItem = { icon: <BiLogOut />, text: "Sair", path: "/" };

	return (
		<div className="menu-lateral">
			<div className="logo">
				<img src={Logo} alt="logo" />
			</div>
			<div className="link-paginas">
				<ul>
					{menuItems.map((item, index) => (
						<li key={index} className={location.pathname === item.path ? "active" : ""}>
							{location.pathname === item.path && <span className="active-span">{item.text}</span>}
							<button type="button" className={location.pathname === item.path ? "active" : ""}>
								<Link to={item.path} className={location.pathname === item.path ? "active-link" : ""}>
									{React.cloneElement(item.icon, {
										color: location.pathname === item.path ? "#032026" : "white",
										size: 24,
									})}
								</Link>
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className="sair-conteiner">
				<button type="button" className="botao-sair">
					<Link to={logoutItem.path} className="link-sair">
						{React.cloneElement(logoutItem.icon, {
							color: "#032026",
							size: 24,
						})}
					</Link>
				</button>
			</div>
		</div>
	);
};

export default MenuLateral;
