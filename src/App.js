import React from 'react';
import {Form} from '@unform/web';
import './App.css';
import Input from './components/FormUser/input';

function App() {
  function handleSubmit(data) {
    console.log(data)
  }
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Form onSubmit={handleSubmit}>
        <Input name="nome" />
        <Input name="cpfCnpj" />
        <Input name="matricula" />
        <Input name="curso" />
        <Input type='password' name="password" />
        
        <button type='submit'>Cancelar</button>
        <button type='submit'>Cadastrar</button>
      </Form>
    </div>
  );
}

export default App;
