import React from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Routes } from 'react-router-dom';
import AddAddress from '../../components/addAddress';
import AddProduct from '../../components/addProduct';
import Address from '../../components/address';
import Order from '../../components/order';
import ProductComponent from '../../components/product';
import Profile from '../../components/profile';
import UpdateProduct from '../../components/updateProduct';

const Account = () => {
    const auth = useSelector(state => state.userLogin.userInfo)
    return (
        <Container className="mt-5 p-5">
            <Card>
                <Card.Header>
                    Account
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={3}>
                            <ListGroup>
                                <LinkContainer to="/account">
                                    <ListGroup.Item action>
                                        Profil
                                    </ListGroup.Item>
                                </LinkContainer>
                                <LinkContainer to="/account/orders">
                                    <ListGroup.Item action>
                                        Pemesanan
                                    </ListGroup.Item>
                                </LinkContainer>
                                {auth.user.role === 'admin' && (
                                    <LinkContainer to="/account/product">
                                        <ListGroup.Item action>
                                            Product
                                        </ListGroup.Item>
                                    </LinkContainer>
                                )}
                                <LinkContainer to="/account/address">
                                    <ListGroup.Item action>
                                        Alamat
                                    </ListGroup.Item>
                                </LinkContainer>

                            </ListGroup>
                        </Col>
                        <Col md={9}>
                            <Routes>
                                <Route path={``} element={<Profile />} />
                                <Route path={`product`} element={<ProductComponent />} />
                                <Route path={`add-product`} element={<AddProduct />} />
                                <Route path={`product/:id`} element={<UpdateProduct />} />
                                <Route path={`orders`} element={<Order />} />
                                <Route path={`add-address`} element={<AddAddress />} />
                                <Route path={`address`} element={<Address />} />
                            </Routes>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Account