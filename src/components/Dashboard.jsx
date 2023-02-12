import { useContext, useEffect, useRef, useState } from "react"
import api from "../services/api"
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    OrderedList,
    useDisclosure,
  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AppContext } from "../contexts/Context"

export const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const { products, setProducts } = useContext(AppContext)
    const [chart, setChart] = useState([])
    const [visualChart, setVisualChart] = useState([])
    const [filter, setFilter] = useState([])
    const [shipping, setShipping] = useState([])
    const [subtotal, setSubtotal] = useState([])

    useEffect(() => {
        api.get(`products${filter}`)
            .then((response) => {
                setProducts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [filter])

    useEffect(() => {
        const prodSet = new Set(chart)
        const arrayProd = Array.from(prodSet)
        console.log(arrayProd)
        setVisualChart(arrayProd)

        const calculateSubtotal = chart.reduce(
            (acc, curr) => acc + curr.price, 0
        )

        setSubtotal(calculateSubtotal)

        subtotal > 250 ? setShipping(0) : setShipping(chart.length * 10)

        console.log(chart)

    }, [chart, setChart, subtotal])

    const handleOrder = (a) => {
        setFilter(`?ordering=${a}`)
    }

    const addToChart = (event) => {
        const product = products.find(element => element.id === event.target.id)
        setChart([...chart, product])
    }

    const count = (id) => {
        let counter = 0
        chart.forEach(i => {
            if (i.id === id){
                counter += 1
            }
        })
        return counter
    }

    const onRemoveProduct = (id) => {
        const prodIndex = chart.findIndex(elem => elem.id === id)
        chart.splice(prodIndex, 1)
        setChart([...chart])
        console.log(chart)
    }

    const onClearChart = () => {
        setChart([])
    }

    const onBuy = () => {
        console.log(chart)
        let token = localStorage.getItem('@TOKEN')
        const data = {
            order_products: chart
        }
        api.post('orders/', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log(response)
            onClose()
            window.location.reload()
        })
        .catch(error => console.log(error))
    }

    return (
        <Flex flexDir='column' m='4vh' h='80vh' justifyContent='space-between'>
            <Flex flexDir='column'>
                <Menu closeOnSelect={true}>
                    <MenuButton w='20vw' as={Button} rightIcon={<ChevronDownIcon />}>
                        Ordenar
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleOrder('name')}>Nome</MenuItem>
                        <MenuItem onClick={() => handleOrder('price')}>Preço (do menor ao maior)</MenuItem>
                        <MenuItem onClick={() => handleOrder('-price')}>Preço (do maior ao menor)</MenuItem>
                        <MenuItem onClick={() => handleOrder('score')}>Score (do menor ao maior)</MenuItem>
                        <MenuItem onClick={() => handleOrder('-score')}>Score (do maior ao menor)</MenuItem>
                    </MenuList>
                </Menu>
                <OrderedList display='flex' flexWrap='wrap'>
                    {
                        products.map(item => (
                            <ListItem m='15px' key={item.id}>
                                <p>{item.name} </p>
                                <p>Preço: {item.price} </p>
                                <p>Score: {item.score} </p>
                                <Button onClick={addToChart} id={item.id}>Adicionar ao carrinho</Button>
                            </ListItem>
                        ))
                    }
                </OrderedList>
            </Flex>

            <Button w='20vw' ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Carrinho
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Seu carrinho de compras</DrawerHeader>

                <DrawerBody>
                    <OrderedList>
                        {
                            visualChart.map(item =>(
                                <ListItem key={item.id}>
                                    <p>{item.name} </p>
                                    <p>Preço: {item.price} </p>
                                    <p>Quantidade: {count(item.id)} </p>
                                    <Button 
                                        onClick={() => onRemoveProduct(item.id)}
                                        id={item.id}
                                    >Remover do carrinho</Button>
                                </ListItem>
                            ))
                        }
                    </OrderedList>
                </DrawerBody>

                <DrawerFooter flexDirection='column'>
                    <Flex justifyContent='space-between' w='90%'>
                        <Flex flexDirection='column'>
                            <p>Frete: </p>
                            <p>Subtotal: </p>
                            <p>Total: </p>
                        </Flex>
                        <Flex flexDirection='column'>
                            <p> {shipping} </p>
                            <p> {subtotal} </p>
                            <p> {subtotal + shipping} </p>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Button
                            onClick={onClearChart}
                        >
                        Limpar carrinho
                        </Button>
                        <Button 
                            onClick={onBuy}
                            colorScheme='blue'
                        >Finalizar compra</Button>
                    </Flex>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}