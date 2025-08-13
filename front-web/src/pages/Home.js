import React, { useEffect, useState } from 'react';
import { catalogo, listarSkills, adicionarSkill, atualizarSkill, excluirSkill } from '../services/api';

export default function HomePage({ token, usuarioId }){
  const [minhas, setMinhas] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [skillEscolhida, setSkillEscolhida] = useState('');
  const [level, setLevel] = useState('Básico');

  const load = async () => {
    const c = await catalogo();
    setCatalog(c);
    const m = await listarSkills(usuarioId, token);
    setMinhas(m);
  };

  useEffect(()=>{ load(); }, []);

  const salvar = async () => {
    await adicionarSkill({ usuarioId: Number(usuarioId), skillId: Number(skillEscolhida), level }, token);
    setModalOpen(false);
    load();
  };

  const handleLevelChange = async (id, novo) => {
    await atualizarSkill(id, novo, token);
    load();
  };

  const handleExcluir = async id => {
    await excluirSkill(id, token);
    load();
  };

  return (
    <div>
      <h3>Home - Minhas Skills</h3>
      <div style={{marginBottom:12}}>
        <button className="btn-primary" onClick={()=>setModalOpen(true)}>Adicionar Skill</button>
      </div>

      {minhas.length === 0 && <div>Nenhuma skill</div>}
      {minhas.map(us => (
        <div className="skill-card" key={us.id}>
          <img className="skill-img" src={us.skill.imagemUrl || 'https://via.placeholder.com/48'} alt="img"/>
          <div style={{flex:1}}>
            <div style={{fontWeight:600}}>{us.skill.nome}</div>
            <div style={{fontSize:13}}>{us.skill.descricao}</div>
          </div>
          <div>
            <select value={us.level} onChange={e=>handleLevelChange(us.id, e.target.value)} className="input">
              <option>Básico</option><option>Intermediário</option><option>Avançado</option>
            </select>
          </div>
          <div><button className="btn-ghost" onClick={()=>handleExcluir(us.id)}>Excluir</button></div>
        </div>
      ))}

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Adicionar Skill</h4>
            <div>
              <select className="input" onChange={e=>setSkillEscolhida(e.target.value)}>
                <option value="">-- escolha --</option>
                {catalog.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>
            <div style={{marginTop:8}}>
              <label>Level</label>
              <select className="input" value={level} onChange={e=>setLevel(e.target.value)}>
                <option>Básico</option><option>Intermediário</option><option>Avançado</option>
              </select>
            </div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className="btn-primary" onClick={salvar}>Salvar</button>
              <button className="btn-ghost" onClick={()=>setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}