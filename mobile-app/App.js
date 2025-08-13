import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';

export default function App(){
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(null);
  const [usuarioId, setUsuarioId] = useState(null);

  const doLogin = (t, id) => { setToken(t); setUsuarioId(id); setPage('home'); };
  const doLogout = () => { setToken(null); setUsuarioId(null); setPage('login'); };

  return (
    <SafeAreaView style={{flex:1,padding:16}}>
      <View style={{flex:1}}>
        {page === 'login' && <Login onRegister={()=>setPage('register')} onLogin={doLogin} />}
        {page === 'register' && <Register onBack={()=>setPage('login')} />}
        {page === 'home' && <Home token={token} usuarioId={usuarioId} onLogout={doLogout} />}
      </View>
    </SafeAreaView>
  );
}
