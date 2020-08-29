import React, {useRef} from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup from 'yup';
import '../styles/User.css'
import Input from '../components/Form/input';
import Select from '../components/Form/select';
import DatePicker from '../components/Form/date';
import Radio from '../components/Form/radio';

const optionsPeril = [
  {value: "aluno", label: "Aluno"},
  {value: "professor", label: "Professor"}
]
const optionsSexo = [
  {value: "masculino", label: "Masculino"},
  {value: "feminino", label: "Feminino"},
  {value: "outros", label: "Outros"}
]

function User() {
  const formRef = useRef(null)

  async function handleSubmit(data, {reset}) {
    try{
      const schema = Yup.object().shape({
        nome: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        endereco: Yup.object().shape({
          cidade: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
        
      })
      await schema.validate(data, {
        abortEarly: false,
      })
  
      console.log(data)
      formRef.current.setErrors({})
      reset()
      
    }catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errorMessages = {}
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }
  return (
    <div className="User">
      <h1>Cadastro Usuário</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select name="perfil" options={optionsPeril} label="Selecione o Perfil" />
        <Radio name="pfPJ" id="radio" options={[{id: "pf", label: "Pessoa Física"}, {id: "pj", label: "Pessoa Jurídica"}]}/>
        <Input name="nome" label="Nome Completo" />
        <Input name="cpfCnpj" label="CPF ou CNPJ" />
        <Select name="sexo" options={optionsSexo} label="Sexo" />
        <Input name="matricula" label="Matrícula" />
        <Input name="curso" label="Curso" />
        <Input name="tel" type="tel" label="Telefone" />
        <DatePicker name="dtaNascimento" dateFormat="dd/MM/yyyy" placeholderText="Selecione uma data" label="Data Nascimento" />
        <Scope path='endereco'>
          <Input name="rua" label="Logradouro" placeholder="Avenida/Rua/Alameda" />
          <Input name="numero" label="Número" />
          <Input name="bairro" label="Bairro" />
          <Input name="cidade" label="Cidade" />
          <Input name="estado" label="UF" placeholder="MG" />
        </Scope>
        <Input name="email" type='email' label="E-mail" placeholder="nome@email.com" />
        <Input name="password" type='password' label="Senha" />
        <Input name="confimPassword" type='password' label="Confirmar Senha" />
        
        <button type='submit'>Cadastrar</button>
      </Form>
    </div>
  );
}

export default User;
