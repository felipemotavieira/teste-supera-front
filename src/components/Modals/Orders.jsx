import { Button, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, UnorderedList, useDisclosure } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../contexts/Context"
import api from "../../services/api"
import jwt_decode from "jwt-decode";


export const UserOrdersModel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { orders, setOrders } = useContext(AppContext)

    let token = localStorage.getItem('@TOKEN')
    let decoded = jwt_decode(token)
    useEffect(() => {
        api.get("orders/")
            .then((response) => {
                const userOrders = response.data.filter(elem => elem.buyer.id === decoded.user_id)
                setOrders(userOrders)
                console.log(orders)
            })

            .catch((error) => {
                console.log(error);
            })
    },[])


    return (
        <>
            <Button w='90%' onClick={onOpen}>Seus pedidos</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Seus pedidos</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <UnorderedList>
                        {
                            orders.map(item => (
                                <ListItem m='15px' key={item.id}>
                                    Código do pedido: {item.id}
                                    <UnorderedList>
                                        {
                                            item.order_products.map(prod => (
                                                <ListItem key={prod.id} >
                                                    <p>Jogo: {prod.name} </p>
                                                    <p>Preço: {prod.price} </p>
                                                </ListItem>
                                            ))
                                        }
                                    </UnorderedList>
                                </ListItem>
                            ))
                        }
                    </UnorderedList>

                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}