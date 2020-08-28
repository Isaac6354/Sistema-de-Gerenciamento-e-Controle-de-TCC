import React, {useRef} from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup from 'yup';
import '../styles/User.css'
import Input from '../components/Form/input';

const initialData = {
  address: {
    city: 'Belo Horizonte',
    state: 'MG'
  }
}

function User() {
  const formRef = useRef(null)

  async function handleSubmit(data, {reset}) {
    try{
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo três caracteres')
            .required('A cidade é obrigatória')
        })
        
      })
      await schema.validate(data, {
        abortEarly: false,
      })
  
      console.log(data)
      reset()
      
    }catch(err) {
      if(err instanceof Yup.ValidationError) {
        //console.log(err)
        const errorMessages = {}
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })
      }
    }
  }
  return (
    <div className="User">
      <h1>Cadastro Usuário</h1>
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input name="cpfCnpj" />
        <Input name="sexo" />
        <Input name="matricula" />
        <Input name="curso" />
        <Input name="tel" />
        <Scope path='address'>
          <Input name="street" />
          <Input name="number" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
        </Scope>
        <Input type='email' name="email" />
        <Input type='password' name="password" />
        <Input type='password' name="confimPassword" />
        
        <button type='submit'>Cadastrar</button>
      </Form>
    </div>
  );
}

export default User;
