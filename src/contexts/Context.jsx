import { createContext, useState } from "react";

export const AppContext = createContext();

export const Provider = ({children}) => {
    const [user, setUser] = useState('')
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])


    return (
        <AppContext.Provider
            value={{user, setUser, products, setProducts, orders, setOrders}}
        >
            {children}
        </AppContext.Provider>
    )
}