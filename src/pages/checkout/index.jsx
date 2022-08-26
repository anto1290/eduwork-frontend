import { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAddress } from '../../api/v1/address';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { formatRupiah, sumPrice } from '../../utils';
import { GLOBAL_ONGKIR } from '../../config';
import { clearItem } from '../../api/actions/cart';
import { createOrder } from '../../api/v1/order';

const AddressData = ({ setAddressData }) => {
    const [address, setAddress] = useState([]);
    const [notSelect, setNotSelect] = useState(true);
    const navigate = useNavigate();
    const handleChange = row => {
        if (row.selectedCount > 0) {
            setAddressData(row.selectedRows[0]);
            setNotSelect(false);
        } else {
            setNotSelect(true);
        }
    }
    useEffect(() => {
        getAddress()
            .then(({ data: { data } }) => setAddress(data));
    }, []);
    return <>
        <DataTable
            columns={[
                {
                    name: 'Nama',
                    selector: row => row.nama
                },
                {
                    name: 'Detail',
                    cell: row => `${row.provinsi}, ${row.kabupaten}, ${row.kecamatan}, ${row.kelurahan}, ${row.detail}`
                }
            ]}
            data={address}
            onSelectedRowsChange={handleChange}
            selectableRows
            selectableRowsSingle={true}
            selectableRowsHighlight={true}
            title="Pilih Alamat Pengiriman"
        />
        <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" size="sm" disabled={notSelect} onClick={_ => navigate('/checkout/confirm')}>Selanjutnya</Button>
        </div>
    </>
}

const Confirmation = ({ data, onClick }) => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const confirm = [
        {
            label: 'Alamat',
            value: <div>{data.nama}
                <br />
                {data.provinsi}, {data.kabupaten}, {data.kecamatan}, {data.kelurahan}
                <br />
                ({data.detail})
            </div>
        },
        { label: 'Sub Total', value: formatRupiah(sumPrice(cart)) },
        { label: 'Ongkir', value: formatRupiah(GLOBAL_ONGKIR) },
        { label: <strong>Total</strong>, value: <strong>{formatRupiah(parseInt(sumPrice(cart)) + parseInt(GLOBAL_ONGKIR))}</strong> }
    ];
    return (<>
        <DataTable
            columns={[
                { selector: row => row.label },
                { cell: row => row.value }
            ]}
            title="Konfirmasi"
            data={confirm}
        />
        <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" size="sm" onClick={_ => navigate('/checkout')}>Sebelumnya</Button>
            <Button variant="success" size="sm" onClick={onClick}>BAYAR</Button>
        </div>
    </>)
}
const Checkout = () => {
    const [selectedAddress, setSelectedAddress] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        let payload = {
            delivery_address: selectedAddress._id,
            delivery_fee: GLOBAL_ONGKIR
        }

        const { data } = await createOrder(payload);
        if (!data.error) {
            dispatch(clearItem());
            navigate(`/invoices/${data._id}`);
        }
    }

    return (
        <Container className="mt-5 p-5">
            <Card>
                <Card.Header>
                    Checkout
                </Card.Header>
                <Card.Body>
                    <Routes>
                        <Route path={`/`} element={<AddressData setAddressData={address => setSelectedAddress(address)} />} />
                        <Route path={`/confirm`} element={<Confirmation data={selectedAddress} onClick={handleCreateOrder} />} />
                    </Routes>
                </Card.Body>
            </Card>

        </Container>
    )
}

export default Checkout