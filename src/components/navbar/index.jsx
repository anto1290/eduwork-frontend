import React, { useState } from 'react'
import { Badge, Button, Col, Container, Dropdown, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import * as FA from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader';
import Message from '../Message';
import { login } from '../../api/actions/auth'
import { listProducts } from '../../api/actions/product';
import { Link } from 'react-router-dom';
const NavbarComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;
    const cartList = useSelector((state) => state.cart)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const searchHandler = (e) => {
        e.preventDefault()
        dispatch(listProducts(keyword))
    }
    return (
        <Navbar bg="primary" expand="lg">
            <Container fluid>
                <Col>
                    <Row>
                        <Col md='2'>
                            <Nav>

                                <Nav.Link href="/">POS</Nav.Link>

                                <NavDropdown title="Kategori" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="4.1" href='/?category=utama'>Utama</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="4.2" href='/?category=Minuman'>Minuman</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="4.3" href='/?category=Snack'>Snack</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="4.4" href='/?category=Pastry'>Pastry</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Col>
                        <Col md='8'>
                            <div>
                                <Form className="d-flex" onSubmit={searchHandler}>
                                    <Form.Control
                                        onChange={(e) => setKeyword(e.target.value)}
                                        value={keyword}
                                        type="search"
                                        placeholder="Search"
                                        className="me-2 "
                                        aria-label="Search"
                                    />
                                    <Button type='submit' variant="success"><FA.FaSearch></FA.FaSearch></Button>
                                </Form>
                            </div>
                        </Col>
                        <Col md="2">
                            <Row>
                                <Col md="3">
                                    <Link to={'/cart'} >
                                        <Button type="button" className="btn btn-primary position-relative"><Badge className="position-absolute top-0 start-100 translate-middle" bg="danger">{cartList.length}</Badge><FA.FaShoppingCart>
                                        </FA.FaShoppingCart>
                                        </Button>
                                    </Link>
                                </Col>
                                <Col md="5">
                                    {!userInfo && (<Dropdown align='end'>
                                        <Dropdown.Toggle id="dropdown-login" >
                                            Login
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu style={{ padding: '15px', width: '300px' }}>
                                            {loading && <Loader />}
                                            {error && <Message variant='danger' >{error}</Message>}
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Form>
                                            <span>
                                                I don't have account {' '}
                                                <Link to='/singup'>
                                                    singup
                                                </Link>
                                            </span>
                                        </Dropdown.Menu>
                                    </Dropdown>)}
                                    {userInfo && (<Dropdown align='end'>
                                        <Dropdown.Toggle id="dropdown-login" >
                                            <FA.FaUser></FA.FaUser>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item href="/account">Profile</Dropdown.Item>
                                            <Dropdown.Item href="/account/order">Pemesanan</Dropdown.Item>
                                            <Dropdown.Item href="/account/address">Alamat</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item href="/logout">Keluar</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>)}

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Container >
        </Navbar >
    )
}

export default NavbarComponent