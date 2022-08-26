import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../../api/v1/product';
import { CategoryFormSelect } from '../CustomFormSelect/category';
import { TagsFormSelect } from '../CustomFormSelect/tags';
import { useParams } from 'react-router';
import { BASE_SERVER_URL } from '../../config';





const schema = yup.object().shape({
    nama: yup.string().required('Nama product harus diisi'),
    description: yup.string().required('description harus di isi'),
    image: yup.mixed().required('File is required'),
    price: yup.number().positive().integer().required('Detail product harus diisi'),
    category: yup.object().required('category porduct harus di isi').nullable(),
    tags: yup.array().nullable()
});
const UpdateProduct = () => {
    const { id } = useParams();
    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm({
        resolver: yupResolver(schema)
    });
    const [imageOld, setImageOld] = useState('');
    const [status, setStatus] = useState('idle');
    const navigate = useNavigate();
    const updateValue = (field, value) => setValue(field, value, { shouldValidate: true, shouldDirty: true });
    useEffect(() => {
        getProduct(id).then(res => res.data.data).then(data => {
            const tags = []
            data.tags.map((tag) => tags.push({ value: tag.name, label: tag.name }))
            setValue('nama', data.name)
            setValue('description', data.description)
            setValue('price', data.price)
            setValue('image', data.image_url)
            setImageOld(data.image_url)
            setValue('category', { label: data.category.name, value: data.category.name })
            setValue('tags', tags)
        });
    }, [id, setValue])

    let options = [];
    const onSubmit = async formData => {
        let tagsDummy = [];
        formData.tags.map(tag => tagsDummy.push(tag.value));
        const payload = {
            id: id,
            name: formData.nama,
            description: formData.description,
            category: formData.category.value,
            price: formData.price,
            tags: tagsDummy,
            image: formData.image,
        }

        setStatus('process');
        const { data } = await updateProduct(payload);
        if (!data.error) {
            setStatus('success');
            navigate('/account/product');
        }
    }
    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="nama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukan nama product"
                                isInvalid={errors.nama}
                                {...register('nama')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nama?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nama">
                            <Form.Label>description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Masukan description product"
                                isInvalid={errors.description}
                                style={{ height: '100px' }}

                                {...register('description')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Category">
                            <Form.Label>Category</Form.Label>
                            <CategoryFormSelect
                                onChange={value => setValue('category', value)}
                                isInvalid={errors.category}
                                value={getValues()?.category}
                                name="category"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.provinsi?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <div>
                                <Image width='80vw' height='80vw' src={`${BASE_SERVER_URL}/public/images/products/${imageOld}`} />
                            </div>
                            <Form.Control type="file" accept="image/*" {...register('image')} isInvalid={errors.image} />
                            <Form.Control.Feedback type="invalid">
                                {errors.image?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Masukan Harga product"
                                isInvalid={errors.nama}
                                {...register('price')}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <TagsFormSelect

                                onChange={value => {
                                    value.map((v) => options.push(v));
                                    updateValue('tags', options)
                                }}
                                isInvalid={errors.tags}
                                value={getValues()?.tags}
                                name="tags"
                            />
                        </Form.Group>

                    </Col>
                </Row>

                <div className="d-grid gap-2">
                    <Button type="submit" variant="danger" disabled={status === 'process'}>
                        {status === 'process' ? 'Memproses...' : 'Update'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default UpdateProduct