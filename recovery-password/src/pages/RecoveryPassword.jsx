import api from '../services/api'
import './estilo.css'
import { Input,Flex,Box,FormControl,FormLabel,VStack,Button } from '@chakra-ui/react'
import {Alert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
import { useState } from 'react'

function RecoveryPassword() {

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
  })
  const [value, setValue] = useState({
    email: ""
  })
  const[estado, setEstado] = useState(false)

  const handleChange = e =>{
     setValue({
      ...value,
      [e.target.name] : e.target.value
  
    })
  }


  const formSubmit = async event =>{
    event.preventDefault()
    setEstado(false)

    setStatus({loading: true})
    console.log(value)
    
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    await api.put('/user/recovery', value, headers)
    .then((response)=>{
        setStatus({
          type: "success",
          mensagem: response.data.mensagem,
          loading: false
        })
        setValue({
          email: ""
        })
    }).catch((err)=>{
      if(err.response.data){
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem,
          loading: false
        })
        setEstado(true)
      }else{
        setStatus({
          type: 'error',
          mensagem: 'Erro: tente mais tarde',
          loading: false
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
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" value={value.email} onChange={handleChange} _hover={{borderColor: '#000'}} placeholder='Digite seu email' borderColor="gray.600" isInvalid={estado} variant="outline"/>
                  </FormControl>
                  <Button isLoading={status.loading}loadingText='Enviando' colorScheme='purple' variant='solid' type="submit" w="50%">
                    Enviar
                  </Button>
                  
                </VStack>
                  
                  
              </Box>
                
            </Flex>
                
              
                
          
  
  );
  
}

export default RecoveryPassword;