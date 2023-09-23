import React, { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { useAppSelector, useAppDispatch } from '../../app/hooks/hooks'
import DataTable from '@renderer/components/dataTable/DataTable'
import Add from '@renderer/components/order/add/Add'
import { Order } from '@renderer/app/models/order.model'

import noavatar from '../../assets/images/noavatar.png'
import './orders.scss'
import { removeOrder } from '@renderer/features/orders/orderSlice'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 1 },
  {
    field: 'img',
    headerName: 'Avatar',
    flex: 1,
    disableExport: true,
    renderCell: (params): React.JSX.Element => {
      return <img src={params.row.img || noavatar} alt="" />
    }
  },
  {
    field: 'client',
    type: 'string',
    headerName: 'Cliente',
    minWidth: 100,
    flex: 1,
    valueGetter: (params) => params.row?.client?.name
  },
  {
    field: 'total',
    type: 'string',
    headerName: 'Total',
    flex: 1,
    valueFormatter: ({ value }) => new Intl.NumberFormat().format(value)
  },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    flex: 1,
    type: 'dateTime',
    valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY hh:mm A')
  },
  {
    field: 'paid',
    headerName: 'Pagado',
    flex: 1,
    type: 'boolean'
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
