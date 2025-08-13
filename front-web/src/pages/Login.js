import React, { useState, useEffect } from 'react';
import { login } from '../services/api';

export default function LoginPage({ onRegister, onLogin }){
  const [loginVal, setLoginVal] = useState(localStorage.getItem('remember_login') || '');
  const [senha, setSenha] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [lembrar, setLembrar] = useState(!!localStorage.getItem('remember_login'));
  const [erro, setErro] = useState('');

  useEffect(()=> {
    if (!lembrar) localStorage.removeItem('remember_login');
  }, [lembrar]);

  const submit = async () => {
    try {
      const data = await login(loginVal, senha);
      if (lembrar) localStorage.setItem('remember_login', loginVal);
      else localStorage.removeItem('remember_login');
      onLogin(data.token, data.usuarioId);
    } catch(e){
      setErro('Login ou senha inválidos');
    }
  };

  return (
    <div>
      <h3>Login</h3>
      {erro && <div style={{color:'red'}}>{erro}</div>}
      <div style={{marginBottom:8}}>
        <label>Login</label>
        <input className="input" value={loginVal} onChange={e=>setLoginVal(e.target.value)} />
      </div>
      <div style={{marginBottom:8}}>
        <label>Senha</label>
        <div style={{display:'flex', gap:8}}>
          <input className="input" type={mostrar?'text':'password'} value={senha} onChange={e=>setSenha(e.target.value)} />
          <button className="btn-ghost" onClick={()=>setMostrar(!mostrar)}>{mostrar?'Ocultar':'Mostrar'}</button>
        </div>
      </div>
      <div style={{marginBottom:8}}>
        <label><input type="checkbox" checked={lembrar} onChange={e=>setLembrar(e.target.checked)} /> Gravar senha</label>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn-primary" onClick={submit}>Entrar</button>
        <button className="btn-ghost" onClick={onRegister}>Cadastrar-se</button>
      </div>
    </div>
  );
}
