import { Button, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import api from "../../services/api"


export const RegisterModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
  
    const handleClick = () => setShow(!show)
  
    const onChangeUsername = (event) => setUsername(event.target.value)
    const onChangePassword = (event) => setPassword(event.target.value)
    const onChangeEmail = (event) => setEmail(event.target.value)
    const onChangeCpf = (event) => setCpf(event.target.value)
  
    const login = () => {
        api.post('users/', {
            username: username,
            password: password,
            email: email,
            cpf: cpf
        })
        .then(response => {
            console.log(response)
            onClose()
        })
        .catch(error => {
          console.log(error)
        })
    }

    return (
        <>
          <Button w='90%' onClick={onOpen}>Cadastre-se</Button>
      
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Faça seu Cadastro</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input 
                  placeholder="Username"
                  onChange={onChangeUsername}
                />
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Senha'
                    onChange={onChangePassword}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Esconder' : 'Mostrar'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Input 
                  placeholder="E-mail"
                  onChange={onChangeEmail}
                />

                <Input 
                  placeholder="CFP"
                  onChange={onChangeCpf}
                />

              <Button onClick={login}>Cadastre-se</Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
    )
}