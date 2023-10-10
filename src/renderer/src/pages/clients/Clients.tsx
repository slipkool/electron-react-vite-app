import React, { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '@renderer/components/dataTable/DataTable'
import Add from '@renderer/components/client/add/Add'

import noavatar from '../../assets/images/noavatar.png'
import './clients.scss'
import { useAppDispatch, useAppSelector } from '@renderer/redux/store'
import { deleteClient, fetchClients } from '@renderer/redux/states/clientSlice'
import { Client } from '@renderer/app/models/client.model'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 1 },
  {
    field: 'img',
    headerName: 'Avatar',
    flex: 1,
    renderCell: (params): React.JSX.Element => {
      return <img src={params.row.img || noavatar} alt="" />
    }
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Nombre',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'documentType',
    type: 'string',
    headerName: 'Tipo de documento',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'identification',
    type: 'string',
    headerName: 'Identificacion',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'address',
    type: 'string',
    headerName: 'Direccion',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Telefono',
    flex: 1
  }
]

const Clients = (): React.JSX.Element => {
  const dispatchApp = useAppDispatch()
  const { clients, loading } = useAppSelector((state) => state.clients)
  const [open, setOpen] = useState(false)
  const [client, setClient] = useState<Client | null>()

  useEffect(() => {
    dispatchApp(fetchClients())
  }, [])

  const onSave = (): void => {
    setClient(null)
  }

  const onDelete = (id: number): void => {
    dispatchApp(deleteClient(id))
  }

  const onView = (data: number): void => {
    console.log(data)
    const clientSelected = clients.find((client) => client.id === data)
    if (clientSelected) {
      setClient(clientSelected)
      setOpen(true)
    } else {
      throw new Error('Cliente no existe')
    }
  }

  if (loading) {
    return <h2>Loading</h2>
  }

  return (
    <div className="client">
      <div className="info">
        <h1>Clientes</h1>
        <button className="btn flex" onClick={(): void => setOpen(true)}>
          Agregar cliente
        </button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={clients}
        disableToolbar={false}
        disableViewAction={false}
        disableFooterTotalBar={true}
        deleteEvent={onDelete}
        viewEvent={onView}
      />

      {open && <Add columns={columns} setOpen={setOpen} saveEvent={onSave} editObject={client} />}
    </div>
  )
}

export default Clients
