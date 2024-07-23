import { Product } from '@/types/product';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

export type CartItem = {
    product: Product;
    quantity: number;
}

export type CartContext = {
    cart: CartItem[];
    addItemToCart: (item: CartItem) => void;
    deleteItemFromCart: (product: Product) => void;
    clearCart: () => void;
    cartTotal: number;
};

const Context = createContext({} as CartContext);

export const useCart = () => useContext(Context);

export const CartProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = useCallback(
        (incomingItem: CartItem) => {
            const withAddedItem = [...(cart || [])];

            const itemIndex = cart.findIndex((item) => item.product.id === incomingItem.product.id);

            if (itemIndex === -1) {
                withAddedItem.push(incomingItem);
            } else {
                withAddedItem[itemIndex] = {
                    ...withAddedItem[itemIndex],
                    quantity: incomingItem.quantity
                }
            }

            setCart(withAddedItem);
        },
        [cart]
    );

    const deleteItemFromCart = useCallback((incomingProduct: Product) => {
        setCart(cart.filter(item => item.product.id !== incomingProduct.id))
    }, [cart]);

    const clearCart = useCallback(() => {
        setCart([])
    }, [])

    useEffect(() => {
        setCartTotal(cart.reduce((total, item) => total + item.product.amountCents * item.quantity, 0));
    }, [cart]);

    return (
        <Context.Provider
            value={{
                cart,
                addItemToCart,
                deleteItemFromCart,
                clearCart,
                cartTotal
            }}
        >
            {children && children}
        </Context.Provider>
    );

};
