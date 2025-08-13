const BASE = "http://localhost:8080";
export async function login(login, senha){
  const res = await fetch(`${BASE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({login, senha})});
  if (!res.ok) throw new Error('Login inválido');
  return await res.json();
}
export async function cadastro(login, senha){
  const res = await fetch(`${BASE}/auth/cadastro`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({login, senha})});
  return res;
}
export async function catalogo(){
  const res = await fetch(`${BASE}/skills/catalogo`);
  return res.json();
}
export async function listarSkills(usuarioId, token){
  const res = await fetch(`${BASE}/skills/listar/${usuarioId}`, { headers:{ Authorization:`Bearer ${token}` }});
  return res.json();
}
export async function adicionarSkill(payload, token){
  const res = await fetch(`${BASE}/skills/adicionar`, { method:'POST', headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${token}` }, body:JSON.stringify(payload) });
  return res.json();
}
export async function atualizarSkill(id, level, token){
  const res = await fetch(`${BASE}/skills/atualizar/${id}`, { method:'PUT', headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${token}` }, body:JSON.stringify({level}) });
  return res.json();
}
export async function excluirSkill(id, token){
  const res = await fetch(`${BASE}/skills/excluir/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` }});
  return res.json();
}