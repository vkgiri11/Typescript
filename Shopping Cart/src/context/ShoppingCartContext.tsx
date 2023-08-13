import { createContext, ReactNode, useContext, useState } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import ShoppingCartDrawer from '../components/ShoppingCartDrawer';

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type ShoppingCartContextProps = {
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	openCart: () => void;
	closeCart: () => void;
	cartQuantity: number;
	cartItems: CartItem[];
};

type CartItem = {
	id: number;
	quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	const openCart = () => setIsDrawerOpen(true);

	const closeCart = () => setIsDrawerOpen(false);

	const getItemQuantity = (id: number) => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};

	const increaseCartQuantity = (id: number) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id) === undefined) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) return { ...item, quantity: item.quantity + 1 };
					else return item;
				});
			}
		});
	};

	const decreaseCartQuantity = (id: number) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id)?.quantity === 1)
				return currItems.filter((item) => item.id !== id);
			else
				return currItems.map((item) => {
					if (item.id === id) return { ...item, quantity: item.quantity - 1 };
					else return item;
				});
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems((currItems) => currItems.filter((item) => item.id !== id));
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				openCart,
				closeCart,
				cartItems,
				cartQuantity,
			}}>
			{children}
			<ShoppingCartDrawer isOpen={isDrawerOpen} />
		</ShoppingCartContext.Provider>
	);
};
