import { useEffect, useState } from 'react'
import { ButtonToolbar, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Buttag from '../../components/buttag'
import CardComponent from '../../components/card'
import { listProducts } from '../../api/actions/product'
import PaginationComponent from '../../components/pagnation'
import Loader from '../../components/Loader'
import MessageComponent from '../../components/Message'
import { useParams, useSearchParams, } from 'react-router-dom'
import { listTags } from '../../api/actions/tags'
import { addItem } from '../../api/actions/cart'
const Product = () => {
    const [searchParams] = useSearchParams();
    const [tagsIn, setTegsIn] = useState([])
    const category = searchParams.get('category') || ''
    const { keyword, skip } = useParams();
    const limit = 10;
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, count } = productList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const listTag = useSelector((state) => state.tagsList)
    const { tags } = listTag
    useEffect(() => {
        dispatch(listProducts(keyword, skip, limit, category, tagsIn))
        dispatch(listTags())
    }, [dispatch, skip, keyword, category, tagsIn]);
    const onSetTags = (value) => {
        if (tagsIn.includes(value)) {
            setTegsIn(tagsIn.filter(item => item !== value))
        } else {
            setTegsIn([...tagsIn, value]);
        }
    }

    return (
        <Container fluid>
            <ButtonToolbar aria-label="Toolbar with button groups">
                <h4>Tag :</h4>
                {''}
                {tags.map((tag, index) => (
                    <div key={index}>
                        <Buttag id={tag._id} title={tag.name} className={tagsIn.includes(tag.name) && 'btn btn-warning'} value={tag.name} onChange={(e) => onSetTags(e.target.value)} />
                    </div>
                ))}

            </ButtonToolbar>
            <Row md={5}>
                {loading && <Loader />}
                {error && <MessageComponent variant={'danger'}> {error} </MessageComponent>}
                {products.map((product, index) => {
                    return (
                        <Col key={index} className="mt-2">
                            <CardComponent product={product} onAddToCart={() => {
                                if (userInfo) {
                                    dispatch(addItem(product))
                                } else {
                                    alert('Oops Login dulu lah')
                                }
                            }} />
                        </Col>
                    )
                })}
            </Row>
            <Row>
                <PaginationComponent total={count} />
            </Row>
        </Container>
    )
}

export default Product