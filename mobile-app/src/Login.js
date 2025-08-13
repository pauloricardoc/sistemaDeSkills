import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, Alert } from 'react-native';

const BASE = 'http://localhost:8080';

export default function Login({ onRegister, onLogin }){
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  const doLogin = async () => {
    try {
      const res = await fetch(`${BASE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({login, senha})});
      if (!res.ok) { Alert.alert('Erro','Login inválido'); return; }
      const data = await res.json();
      if (lembrar) { /* armazenar AsyncStorage se quisesse */ }
      onLogin(data.token, data.usuarioId);
    } catch(e){
      Alert.alert('Erro','Falha ao conectar');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Login" value={login} onChangeText={setLogin} style={{borderWidth:1,padding:8,marginBottom:8}}/>
      <Text>Senha</Text>
      <TextInput placeholder="Senha" secureTextEntry={!mostrar} value={senha} onChangeText={setSenha} style={{borderWidth:1,padding:8,marginBottom:8}}/>
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:8}}>
        <Switch value={mostrar} onValueChange={setMostrar} />
        <Text> Mostrar</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:8}}>
        <Switch value={lembrar} onValueChange={setLembrar} />
        <Text> Gravar senha</Text>
      </View>
      <Button title="Entrar" onPress={doLogin} />
      <Button title="Cadastrar-se" onPress={onRegister} />
    </View>
  );
}
