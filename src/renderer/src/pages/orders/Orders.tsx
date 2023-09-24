import React, { useState } from 'react'
import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import DataTable from '@renderer/components/dataTable/DataTable'
import Add from '@renderer/components/order/add/Add'
import { Order } from '@renderer/app/models/order.model'
import { removeOrder } from '@renderer/app/store/features/orders/orderSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/store/store'

import noavatar from '../../assets/images/noavatar.png'
import './orders.scss'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 50,
    maxWidth: 100,
    flex: 1,
    headerAlign: 'left',
    align: 'left'
  },
  {
    field: 'img',
    headerName: 'Avatar',
    flex: 1,
    disableExport: true,
    renderCell: (params): React.JSX.Element => {
      return <img src={params.row.img || noavatar} alt="" />
    },
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'client',
    type: 'string',
    headerName: 'Cliente',
    minWidth: 100,
    flex: 1,
    valueGetter: (params) => params.row?.client?.name,
    headerAlign: 'left',
    align: 'left'
  },
  {
    field: 'total',
    type: 'number',
    headerName: 'Total',
    flex: 1,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
    headerAlign: 'left',
    align: 'left'
  },
  {
    field: 'partialPayment',
    type: 'number',
    headerName: 'Abono',
    flex: 1,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
    headerAlign: 'left',
    align: 'left'
  },
  {
    field: 'Deuda',
    headerName: 'Deuda',
    description: 'Saldo a deber',
    flex: 1,
    valueGetter: ({ row }): string => {
      return currencyFormatter.format(row.total - row.partialPayment)
    },
    cellClassName: (params: GridCellParams<any, number>): string => {
      if (params.value == null) {
        return ''
      }

      const temp = params.value.toString().replace(/[^0-9.-]+/g, '')

      return parseFloat(temp) > 0 ? 'font-tabular-nums hot' : 'font-tabular-nums'
    },
    headerAlign: 'left',
    align: 'left'
  },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    flex: 1,
    type: 'dateTime',
    valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY hh:mm A'),
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'paid',
    headerName: 'Pagado',
    flex: 1,
    type: 'boolean',
    headerAlign: 'center',
    align: 'center'
  }
]

const Orders = (): React.JSX.Element => {
  const dispatchApp = useAppDispatch()
  const [orderSelected, setOrderSelected] = useState<Order>()
  const [open, setOpen] = useState(false)
  const orderList = useAppSelector((state) => state.orders)

  const onSaveEvent = (): void => {
    //setOrderList(orderService.getAll())
  }

  const onDelete = (id: number): void => {
    dispatchApp(removeOrder(id))
  }

  const onView = (data: number): void => {
    const order = orderList.find((item) => item.id === data)
    setOrderSelected(order)
    setOpen(true)
  }

  const onOpenAdd = (): void => {
    setOrderSelected(undefined)
    setOpen(true)
  }

  return (
    <div className="users">
      <div className="info">
        <h1>Ordenes</h1>
        <button className="btn flex" onClick={onOpenAdd}>
          Agregar orden
        </button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={orderList}
        disableToolbar={false}
        disableViewAction={false}
        disableFooterTotalBar={true}
        deleteEvent={onDelete}
        viewEvent={onView}
      />

      {open && (
        <Add
          slug="orden"
          columns={columns}
          setOpen={setOpen}
          saveEvent={onSaveEvent}
          order={orderSelected}
        />
      )}
    </div>
  )
}

export default Orders
