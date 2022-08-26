import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { formatRupiah, sumPrice } from '../../utils';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getOrders } from '../../api/v1/order';

export default function Order() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders().then(({ data: { data } }) => setOrders(data))
    }, [])


    return (
        <div>
            <DataTable
                columns={[
                    { name: 'Order ID', cell: row => `#${row.order_number}` },
                    { name: 'Total', cell: row => formatRupiah(sumPrice(row.order_items)) },
                    { name: 'Status', cell: row => row.status },
                    { name: 'Invoice', cell: row => <LinkContainer to={`/invoices/${row._id}`}><Button variant="success" size="sm">Invoices</Button></LinkContainer> },
                ]}
                data={orders}
                expandableRows
                expandableRowsComponent={OrderItem}
            />
        </div>
    )
}

const OrderItem = ({ data }) => {
    return <>
        <DataTable
            columns={[
                { name: 'Barang', selector: row => row.name },
                { name: 'Jumlah', selector: row => row.qty },
                { name: 'Total Harga', cell: row => formatRupiah(row.qty * row.price) },
            ]}
            data={data.order_items}
        />
    </>
} 