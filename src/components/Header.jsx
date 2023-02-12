import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { AppContext } from '../contexts/Context'
import { LoginModal } from './Modals/Login'
import { UserOrdersModel } from './Modals/Orders'
import { RegisterModal } from './Modals/Register'

export const Header = () => {
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        let token = localStorage.getItem('@TOKEN')

        token ? setUser(token) : setUser('')
    },[user, setUser])

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <Flex m='4vh'>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {
                     user ? 'Perfil' : 'Entre/Cadastre-se'
                    }                    
                </MenuButton >

                {
                    user ? (
                        <MenuList display='flex' flexDirection='column' alignItems='center'>
                            <Button onClick={logout} w='90%'> Sair </Button>                   
                            <UserOrdersModel w='100%' />                            
                        </MenuList>
                    ) : (
                        <MenuList display='flex' flexDirection='column' alignItems='center'>
                            <LoginModal w='100%' />                    
                            <RegisterModal w='100%' />
                        </MenuList>
                    )
                }                
            </Menu>
        </Flex>
    )
}