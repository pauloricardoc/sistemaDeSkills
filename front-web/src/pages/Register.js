import React, { useState } from 'react';
import { cadastro } from '../services/api';

export default function RegisterPage({ onBack }){
  const [loginVal,setLoginVal] = useState('');
  const [senha,setSenha] = useState('');
  const [conf,setConf] = useState('');
  const [mostrar,setMostrar] = useState(false);
  const [msg,setMsg] = useState('');

  const salvar = async () => {
    if (senha !== conf) { setMsg('Senhas diferentes'); return; }
    await cadastro(loginVal, senha);
    setMsg('Cadastro realizado com sucesso!');
  };

  return (
    <div>
      <h3>Cadastrar</h3>
      <div><label>Login</label><input className="input" value={loginVal} onChange={e=>setLoginVal(e.target.value)} /></div>
      <div><label>Senha</label><input className="input" type={mostrar?'text':'password'} value={senha} onChange={e=>setSenha(e.target.value)} /></div>
      <div><label>Confirmar Senha</label><input className="input" type={mostrar?'text':'password'} value={conf} onChange={e=>setConf(e.target.value)} /></div>
      <div><label><input type="checkbox" checked={mostrar} onChange={e=>setMostrar(e.target.checked)} /> Mostrar senhas</label></div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button className="btn-primary" onClick={salvar}>Salvar</button>
        <button className="btn-ghost" onClick={onBack}>Voltar</button>
      </div>
      {msg && <div style={{marginTop:8}}>{msg}</div>}
    </div>
  );
}