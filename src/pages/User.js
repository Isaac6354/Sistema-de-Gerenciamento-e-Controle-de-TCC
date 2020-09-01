import React, {useRef} from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup from 'yup';
import { Container, Row, Col } from 'reactstrap';
import '../styles/User.css'
import Input from '../components/Form/input';
import Select from '../components/Form/select';
import DatePicker from '../components/Form/date';
import Radio from '../components/Form/radio';

const optionsPerfil = [
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
        perfil: Yup.string().required("Selecione um Perfil"),
        nome: Yup.string().required('O nome é obrigatório'),
        sexo: Yup.string().required("Selecione o sexo"),
        matricula: Yup.number("Número inválido").positive("Número inválido").integer("Número inválido").required('O número da matricula é obrigatório'),
        curso: Yup.string().required("O curso é obrigatório"),
        tel: Yup.number("Número inválido").positive("Número inválido").integer("Número inválido").optional(),
        dtaNascimento: Yup.date().required("A data de nascimento é obrigatória"),
        endereco: Yup.object().shape({
          cidade: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória')
        }),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório')
        
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
      <Container>
        <h1 >Cadastro Usuário</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Row>
            <Col lg="4">
              <Select name="perfil" options={optionsPerfil} label="Selecione o Perfil: " />
            </Col>
            <Col lg="auto" style={{display: "inline-flex"}}>
              <Radio 
                name="pfPJ"
                className="Radio" 
                id="radio"
                options={[{id: "pf", label: "Pessoa Física "}, {id: "pj", label: "Pessoa Jurídica "}]}
              />
            </Col>
          </Row>
          <Input name="nome" label="Nome Completo: " />
          <Row>
            <Col lg="4">
              <Input name="cpfCnpj" label="CPF ou CNPJ: " />
            </Col>
            <Col lg="3">
              <Select name="sexo" options={optionsSexo} label="Sexo: " />
            </Col>
            <Col>
              <Input name="matricula" label="Matrícula: " />
            </Col>
          </Row>
          <Input name="curso" label="Curso: " />
          <Row>
            <Col lg="5">
              <Input name="tel" type="tel" label="Telefone: " />
            </Col>
            <Col lg={{size: 4, offset: 3}}>
              <DatePicker 
                name="dtaNascimento" 
                dateFormat="dd/MM/yyyy" 
                placeholderText="Selecione uma data" label="Data Nascimento:" 
              />
            </Col>
          </Row>
          <Scope path='endereco'>
            <Row>
              <Col lg="9">
                <Input name="rua" label="Logradouro: " placeholder="Avenida/Rua/Alameda" />
              </Col>
              <Col>
                <Input name="numero" label="Número: " />
              </Col>
            </Row>
            <Row>
              <Col lg="5">
                <Input name="bairro" label="Bairro: " />
              </Col>
              <Col lg="5">
                <Input name="cidade" label="Cidade: " />
              </Col>
              <Col lg="2">
                <Input name="estado" label="UF: " placeholder="MG" />
              </Col>
            </Row>
          </Scope>
          <Input name="email" type='email' label="E-mail: " placeholder="nome@email.com" />
          <Row>
            <Col>
              <Input name="password" type='password' label="Senha: " />
            </Col>
            <Col>
              <Input name="confimPassword" type='password' label="Confirmar Senha: " />
            </Col>
          </Row>
          
          <button type='submit'>Cadastrar</button>
        </Form>
      </Container>
    </div>
  );
}

export default User;
