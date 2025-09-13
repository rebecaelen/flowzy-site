import React from 'react';
import './Login.css';
// REMOVA o useAuth por enquanto até corrigirmos o AuthContext
// import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  // REMOVA esta linha até o AuthContext estar correto:
  // const { login } = useAuth();

  const handleLogin = () => {
    console.log('Login clicado');
    // Simular login manualmente por enquanto
    const userData = { name: 'Usuário Teste', email: 'teste@email.com' };
    localStorage.setItem('flowzy_user', JSON.stringify(userData));
    localStorage.setItem('flowzy_token', 'token123');
    window.location.href = '/dashboard';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <h1>Flowzy</h1>
          </div>
          <p>Página de Login - Funcionando!</p>
        </div>
        
        <div style={{ padding: '20px' }}>
          <button 
            style={{
              padding: '12px 24px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;