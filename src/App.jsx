import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('flowzy_token');
    const user = localStorage.getItem('flowzy_user');
    return !!(token && user);
  };

  return (
    <Router>
      <Routes>
        {/* Rota raiz redireciona para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rota de login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Login />
          } 
        />
        
        {/* Rota de registro */}
        <Route 
          path="/register" 
          element={
            isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Register />
          } 
        />
        
        {/* Rota protegida - dashboard */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated() ? 
            <Dashboard /> : 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;