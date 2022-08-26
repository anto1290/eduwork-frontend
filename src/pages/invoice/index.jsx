
import { useCallback, useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getInvoiceByOrderId } from '../../api/v1/order';
import { BANK, Contact, OWNER, REG_BANK } from '../../config';
import { formatRupiah } from '../../utils';

export default function Invoices() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const auth = useSelector(state => state.userLogin.userInfo);

    const builderData = useCallback(data => {
        return [
            { label: 'Status', value: data.payment_status },
            { label: 'Order ID', value: `#${data.order.order_number}` },
            { label: 'Total Amount', value: formatRupiah(data.total) },
            {
                label: 'Billed to', value: <div>
                    <br />
                    <strong>{auth.user.full_name}</strong>
                    <br />
                    {auth.user.email}
                    <br />
                    <br />
                    {data.delivery_address.provinsi}, {data.delivery_address.kabupaten}, {data.delivery_address.kecamatan}, {data.delivery_address.kelurahan}
                    <br />
                    ({data.delivery_address.detail})
                    <br />
                    <br />
                </div>
            },
            {
                label: 'Payment to', value: <div>
                    <br />
                    {OWNER}
                    <br />
                    {Contact}
                    <br />
                    {BANK}
                    <br />
                    {REG_BANK}
                    <br />
                </div>
            },
        ]
    }, [auth.user.full_name, auth.user.email]);

    useEffect(() => {
        setIsFetching(true);
        getInvoiceByOrderId(id)
            .then(({ data }) => setInvoice(builderData(data)))
            .finally(_ => setIsFetching(false));
    }, [id, builderData]);

    return (
        <Container className="mt-5 p-5">
            <Card>
                <Card.Header>
                    Invoices
                </Card.Header>
                <Card.Body>
                    {!isFetching ?
                        <DataTable
                            data={invoice}
                            columns={[
                                { selector: row => row.label },
                                { cell: row => row.value },
                            ]}
                        /> : null
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}