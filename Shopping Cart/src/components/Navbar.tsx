import { NavLink } from 'react-router-dom';
import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';

import { useShoppingCart } from '../context/ShoppingCartContext';
import CartSVG from '../assets/CartSVG';

const Navbar = () => {
	const { openCart, cartQuantity } = useShoppingCart();

	return (
		<>
			<NavbarBs sticky="top" className="bg-white shadow-lg mb-3">
				<Container>
					<Nav className="me-auto">
						<Nav.Link to="/" as={NavLink}>
							Home
						</Nav.Link>
						<Nav.Link to="/store" as={NavLink}>
							Store
						</Nav.Link>
						<Nav.Link to="/about" as={NavLink}>
							About
						</Nav.Link>
					</Nav>
					<Button
						onClick={openCart}
						disabled={!cartQuantity}
						variant="outline-primary"
						className="rounded-circle"
						style={{ width: '3rem', height: '3rem', position: 'relative' }}>
						<CartSVG />
						{!!cartQuantity && (
							<div
								className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
								style={{
									color: '#fff',
									width: '1.5rem',
									height: '1.5rem',
									position: 'absolute',
									bottom: 0,
									right: 0,
									transform: 'translate(25%, 25%)',
								}}>
								{cartQuantity}
							</div>
						)}
					</Button>
				</Container>
			</NavbarBs>
		</>
	);
};
export default Navbar;
