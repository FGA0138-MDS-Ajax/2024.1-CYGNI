import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaLogin from './pages/TelaLogin';
import TelaInicial from './pages/TelaInicial';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />}></Route>
        {/* <Route path="/" element={<TelaLogin />}></Route>  */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)