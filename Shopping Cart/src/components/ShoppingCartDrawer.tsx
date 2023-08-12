import { Offcanvas, Stack } from 'react-bootstrap';

import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utils';
import CartItem from './CartItem';

type ShoppingCartDrawerProps = {
	isOpen: boolean;
};

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({ isOpen }) => {
	const { cartItems, closeCart } = useShoppingCart();

	const totalPrice = cartItems.reduce((sum, cartItem) => {
		const item = storeItems.find((i) => i.id === cartItem.id);
		return sum + (item?.price || 0) * cartItem.quantity;
	}, 0);

	return (
		<>
			<Offcanvas show={isOpen} onHide={closeCart} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Cart</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Stack gap={3}>
						{cartItems.map((item) => (
							<CartItem key={item.id} {...item} />
						))}
						{totalPrice ? (
							<div className="ms-auto fw-bold fs-5">Total: {formatCurrency(totalPrice)}</div>
						) : (
							<div className="m-auto fw-bold fs-5">No Items in Cart !!</div>
						)}
					</Stack>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
export default ShoppingCartDrawer;
