import api from '../services/api'
import { useState } from 'react';
import {Flex,Box,VStack, Alert,FormLabel,AlertIcon,AlertTitle,
  AlertDescription,FormControl,Button,Input} from '@chakra-ui/react'

function UpdatePassword() {
  
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
    loading: false
  })
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpass: "",
    code : ""
  })
  const handleChange = (e)=>{
    setValues({
      ...values,
      [e.target.name] : e.target.value
    })
  }

  const formSubmit = async (e)=>{
    e.preventDefault()
    setStatus({loading: true})
    const headers = {
      'headers' : 'Content-Type : aplication/json'
    }
    await api.put('/user/updatepassword', values, headers)
    .then((response)=>{
      setStatus({
        type: 'success',
        mensagem: response.data.mensagem,
        loading: false
      })
      setValues({
        email: "",
        password: "",
        confirmpass: "",
        code : ""
      })
    })
    .catch((err)=>{
        if(err.response.data){
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem,
            loading: false
          })
        }
        else{
          setStatus({
            type: 'error',
            mensagem: 'Erro: tente mais tarde'
          })
        }

    })

  }
  
  
  return ( 
    <Flex  w="100vw" h="100vh" align="center" justify="center">
      <Box  onSubmit={formSubmit} as="form"  p="30" bg="gray.300" w="400px" borderRadius={8} >
        <VStack spacing="5">
          {status.type &&(
          <Alert status={status.type} variant='solid'>
            <AlertIcon />
            <AlertDescription>{status.mensagem}</AlertDescription>
          </Alert>
          )}
          {/* //Email */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={values.email} onChange={handleChange} _hover={{borderColor: '#000'}} placeholder='Digite seu email' borderColor="gray.600"  variant="outline"/>
          </FormControl>
          {/* Senha  */}
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input name="password" value={values.password} type="password" onChange={handleChange} _hover={{borderColor: '#000'}} placeholder='Digite a nova senha' borderColor="gray.600"  variant="outline"/>
          </FormControl>
          {/* Confirmação de senha  */}
          <FormControl>
            <FormLabel>Confirmação de senha</FormLabel>
            <Input name="confirmpass" value={values.confirmpass} type="password" onChange={handleChange} _hover={{borderColor: '#000'}} placeholder='Confirme a sua senha' borderColor="gray.600"  variant="outline"/>
          </FormControl>
          {/* Código  */}
          <FormControl>
            <FormLabel>Código</FormLabel>
            <Input name="code" value={values.code} onChange={handleChange} _hover={{borderColor: '#000'}} placeholder='Digite o código verificador' borderColor="gray.600"  variant="outline"/>
          </FormControl>
          
          
          <Button 
            isLoading={status.loading}
            loadingText='Enviando' 
            colorScheme='purple'
            w="100%"               
            variant='solid' type="submit">
                  
              Enviar
          </Button>
          
          
        </VStack>
          
          
      </Box>
      
  </Flex>
  );
  
}

export default UpdatePassword;