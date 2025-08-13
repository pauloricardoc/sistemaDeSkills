import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, Picker, Alert } from 'react-native';

const BASE = 'http://localhost:8080';

export default function Home({ token, usuarioId, onLogout }){
  const [minhas, setMinhas] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [adding, setAdding] = useState(false);
  const [skillId, setSkillId] = useState(null);
  const [level, setLevel] = useState('Básico');

  const load = async () => {
    const c = await fetch(`${BASE}/skills/catalogo`).then(r=>r.json());
    setCatalog(c);
    const m = await fetch(`${BASE}/skills/listar/${usuarioId}`, { headers:{ Authorization:`Bearer ${token}` } }).then(r=>r.json());
    setMinhas(Array.isArray(m)?m:[]);
  };

  useEffect(()=>{ load(); }, []);

  const adicionar = async ()=>{
    await fetch(`${BASE}/skills/adicionar`, { method:'POST', headers:{ 'Content-Type':'application/json','Authorization':`Bearer ${token}` }, body:JSON.stringify({ usuarioId: Number(usuarioId), skillId: Number(skillId), level }) });
    setAdding(false); load();
  };

  const excluir = async (id) => { await fetch(`${BASE}/skills/excluir/${id}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` } }); load(); };

  return (
    <View>
      <Text>Minhas Skills</Text>
      <Button title="Logout" onPress={onLogout} />
      <Button title="Adicionar" onPress={()=>setAdding(true)} />
      <FlatList data={minhas} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <View style={{flexDirection:'row',alignItems:'center',marginVertical:8}}>
          <Image source={{uri:item.skill.imagemUrl || 'https://via.placeholder.com/48'}} style={{width:48,height:48}} />
          <View style={{flex:1,marginLeft:8}}><Text>{item.skill.nome}</Text><Text>{item.skill.descricao}</Text></View>
          <Picker selectedValue={item.level} style={{width:120}} onValueChange={v=>{/* update */
            fetch(`${BASE}/skills/atualizar/${item.id}`,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({level:v})}).then(()=>load());
          }}>
            <Picker.Item label="Básico" value="Básico" />
            <Picker.Item label="Intermediário" value="Intermediário" />
            <Picker.Item label="Avançado" value="Avançado" />
          </Picker>
          <Button title="Excluir" onPress={()=>excluir(item.id)} />
        </View>
      )} />
      {adding && (
        <View>
          <Text>Escolher skill</Text>
          <Picker selectedValue={skillId} onValueChange={v=>setSkillId(v)}>
            <Picker.Item label="--" value={null} />
            {catalog.map(s=> <Picker.Item key={s.id} label={s.nome} value={s.id} />)}
          </Picker>
          <Picker selectedValue={level} onValueChange={v=>setLevel(v)}>
            <Picker.Item label="Básico" value="Básico" />
            <Picker.Item label="Intermediário" value="Intermediário" />
            <Picker.Item label="Avançado" value="Avançado" />
          </Picker>
          <Button title="Salvar" onPress={adicionar} />
          <Button title="Cancelar" onPress={()=>setAdding(false)} />
        </View>
      )}
    </View>
  );
}
