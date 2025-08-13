import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const BASE = 'http://localhost:8080';

export default function Register({ onBack }){
  const [login,setLogin]=useState('');
  const [senha,setSenha]=useState('');
  const [conf,setConf]=useState('');
  const [mostrar,setMostrar]=useState(false);

  const salvar = async ()=>{
    if (senha !== conf) { Alert.alert('Erro','Senhas diferentes'); return; }
    await fetch(`${BASE}/auth/cadastro`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({login, senha})});
    Alert.alert('OK','Cadastro realizado');
    onBack();
  };

  return (
    <View>
      <Text>Cadastro</Text>
      <TextInput placeholder="Login" value={login} onChangeText={setLogin} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Senha" secureTextEntry={!mostrar} value={senha} onChangeText={setSenha} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Confirmar" secureTextEntry={!mostrar} value={conf} onChangeText={setConf} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <Button title="Salvar" onPress={salvar} />
      <Button title="Voltar" onPress={onBack} />
    </View>
  );
}
