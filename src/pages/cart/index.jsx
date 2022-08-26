import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { BASE_SERVER_URL } from "../../config"
import * as Hi from 'react-icons/hi'
import { addItem, removeItem } from "../../api/actions/cart"
import { useNavigate } from "react-router-dom"
import { formatRupiah } from "../../utils"

const Cart = () => {
    const cartList = useSelector((state) => state.cart);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div>

            <Form>
                <Container>
                    <Row md={1}>
                        <Col>
                            <Card>
                                <Card.Header>Keranjang Anda</Card.Header>
                                {cartList.map(cart => (

                                    <Row md={3}>
                                        <Col>
                                            <Card.Img variant="top" style={{ height: '180px', width: '180px', padding: '2px' }} src={`${BASE_SERVER_URL}/public/images/products/${cart.image_url}`} />
                                        </Col>
                                        <Col>
                                            <Card.Body >
                                                <Row>
                                                    <h3>
                                                        {cart.name}
                                                    </h3>
                                                </Row>
                                                <Row>
                                                    <h4>
                                                        {formatRupiah(cart.price)}
                                                    </h4>
                                                </Row>
                                                <Row md={3} >
                                                    <Col> <Button onClick={() => dispatch(removeItem(cart.product))} variant="primary"><Hi.HiMinus /></Button> </Col>
                                                    <Col>{cart.qty}</Col>
                                                    <Col> <Button onClick={() => dispatch(addItem(cart.product))} variant="primary"><Hi.HiPlus /></Button></Col>
                                                </Row>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                ))}
                            </Card>
                        </Col>
                    </Row>
                    {cartList.length > 0 ?
                        <Button onClick={() => navigate('/checkout')} variant="success">Bayar</Button>
                        : null
                    }
                </Container>

            </Form>

        </div>
    )
}

export default Cart