import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap';
import * as BS from 'react-icons/bs'
import { BASE_SERVER_URL } from '../../config';
import { formatRupiah } from '../../utils';
const CardComponent = (props) => {
    const { product, onAddToCart } = props;
    return (
        <Card style={{ width: '18vw' }}>
            <Card.Img variant="top" height={'180px'} src={`${BASE_SERVER_URL}/public/images/products/${product.image_url}`} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.category.name}</Card.Subtitle>
                <Card.Text className='d-flex'>
                    {product.tags.map((tag, index) => (
                        <Badge className='me-1' key={index} pill bg="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </Card.Text>
                <Card.Text>
                    {formatRupiah(product.price)}

                </Card.Text>

                <Button variant="primary" onClick={() => onAddToCart()}><BS.BsCartPlusFill></BS.BsCartPlusFill></Button>
            </Card.Body>
        </Card>
    )
}

export default CardComponent