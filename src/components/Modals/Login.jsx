import { Button, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import api from "../../services/api"

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = () => setShow(!show)

  const onChangeUsername = (event) => setUsername(event.target.value)
  const onChangePassword = (event) => setPassword(event.target.value)

  const login = () => {
    api.post('login/', {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response)
      localStorage.setItem("@TOKEN", response.data.access)
      window.location.reload()
      onClose()
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
  <>
    <Button w='90%' onClick={onOpen}>Login</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Faça seu login</ModalHeader>
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
          
        <Button onClick={login}>Login</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}