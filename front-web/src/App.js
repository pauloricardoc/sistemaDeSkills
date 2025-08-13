import React, { useState, useEffect } from 'react';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';

function App(){
  const [page, setPage] = useState('login'); // 'login' | 'register' | 'home'
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [usuarioId, setUsuarioId] = useState(localStorage.getItem('usuarioId') || null);

  useEffect(()=> {
    if (token) setPage('home');
  }, [token]);

  const doLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    setToken(null);
    setUsuarioId(null);
    setPage('login');
  };

  return (
    <div className="app">
      <header>
        <h2>Sistema Skill</h2>
        {token && <button className="btn-ghost" onClick={doLogout}>Logout</button>}
      </header>

      {page === 'login' && <LoginPage onRegister={()=>setPage('register')} onLogin={(t, id)=>{ setToken(t); setUsuarioId(id); localStorage.setItem('token', t); localStorage.setItem('usuarioId', id); }} />}
      {page === 'register' && <RegisterPage onBack={()=>setPage('login')} />}
      {page === 'home' && <HomePage token={token} usuarioId={usuarioId} />}
    </div>
  );
}

export default App;