import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Criar o contexto
const AuthContext = createContext();

// 2. Criar o Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const storedUser = localStorage.getItem('flowzy_user');
    const storedToken = localStorage.getItem('flowzy_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('flowzy_user', JSON.stringify(userData));
    localStorage.setItem('flowzy_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flowzy_user');
    localStorage.removeItem('flowzy_token');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Criar o hook useAuth - ✅ ISSO ESTAVA FALTANDO!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// 4. Exportar o contexto também (opcional)
export default AuthContext;