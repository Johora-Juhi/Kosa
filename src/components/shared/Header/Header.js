import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import logo from '../../../../src/Images/HomePage/Logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const cart = useSelector(state => state.cart);
    const cartLength = (cart.cart.length);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Navbar className='navBarColor' collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home" className='logoImg'>
                        <img src={logo} alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='navSpace'>
                        <Nav className="me-auto middleLink">
                            <Nav.Link as={Link} to="/" className='navName'>HOME</Nav.Link>
                            <Nav.Link as={Link} to="/about" className='navName'>ABOUT</Nav.Link>
                            <Nav.Link as={Link} to="/shop" className='navName'>SHOP</Nav.Link>
                            <Nav.Link as={Link} to="/blogs" className='navName'>BLOG</Nav.Link>
                            <Nav.Link as={Link} to="/contact" className='navName'>CONTACT</Nav.Link>
                        </Nav>
                        <Nav className='align-items-center'>
                            {cartLength > 0 &&
                                <Link to="/cart"><FaShoppingCart style={{ color: "black",fontSize: '50px', marginRight: '20px', border: '1px solid black', padding: '15px', cursor: 'pointer' }}></FaShoppingCart></Link>
                            }
                            {
                                user?.uid ?
                                    <>
                                        <div className="dropdown bg-white">
                                            <button className="bookBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user?.displayName}
                                            </button>
                                            <ul className="dropdown-menu py-0 rounded-none">
                                                <li><NavLink to="/dashboard"><button style={{ width: '100%', paddingTop: '8px', paddingBottom: '8px', border: 'none', borderBottom: '1px solid gray', backgroundColor: '#fff' }}>Dashboard</button></NavLink> </li>
                                                <li><button onClick={handleLogOut} style={{ width: '100%', paddingTop: '8px', paddingBottom: '8px', border: 'none', backgroundColor: '#fff' }}>Sign Out</button></li>
                                            </ul>
                                        </div>
                                    </> :
                                    <><NavLink to="/login"><button className='bookBtn'>LOGIN</button></NavLink></>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;