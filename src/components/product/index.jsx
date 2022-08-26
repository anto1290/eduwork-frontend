import { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../api/actions/product';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { BASE_SERVER_URL } from '../../config';
import Message from '../Message';
import Loader from '../Loader';
import * as Fa from 'react-icons/fa'
import { formatRupiah } from '../../utils';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct } from '../../api/v1/product';
const ProductComponent = () => {
    const MySwal = withReactContent(Swal)


    const keyword = '';
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, count } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(keyword, skip, limit))
    }, [dispatch, limit, skip, keyword])
    const handlePerRowsChange = async (newPerPage, page) => setLimit(newPerPage)
    const handlePageChange = page => {
        let minPage = page - 1;
        setSkip((limit * minPage));
    }
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    const handleDelete = async (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await deleteProduct(id);
                if (!data.error) {
                    dispatch(listProducts(keyword, skip, limit))
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your file has been deleted.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Your file fail been deleted.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })

    }
    return (
        <div>
            <LinkContainer to='/account/add-product'>
                <Button variant='primary'><Fa.FaPlusCircle />Tambah Product</Button>
            </LinkContainer>
            {error && <Message variant='danger'>{error}</Message>}
            <DataTable
                columns={
                    [
                        { name: 'Nama Barang', cell: row => row.name },
                        { name: 'Gambar', cell: row => <Image width='40vw' height='40vw' src={`${BASE_SERVER_URL}/public/images/products/${row.image_url}`} /> },
                        { name: 'Harga', cell: row => formatRupiah(row.price) },
                        {
                            name: 'Opsi', cell: row => (
                                <>
                                    <LinkContainer to={`/account/product/${row._id}`}>
                                        <Button size='sm' className='me-2' variant='warning'><Fa.FaTools /> Edit</Button>
                                    </LinkContainer>
                                    <Button size='sm' className='me-2' onClick={() => handleDelete(row._id)} variant='danger'><Fa.FaTrash /> Delete</Button>
                                </>
                            )
                        },
                    ]

                }
                data={products}
                progressPending={loading}
                progressComponent={<Loader />}
                pagination
                paginationServer
                paginationTotalRows={count}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    )
}

export default ProductComponent