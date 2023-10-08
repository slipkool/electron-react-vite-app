import React, { useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '@renderer/components/dataTable/DataTable'
import Add from '@renderer/components/user/add/Add'

import './clients.scss'
import noavatar from '../../assets/images/noavatar.png'
import { userRows } from '../../data'

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
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
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
    headerName: 'Phone',
    flex: 1
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 1,
    type: 'string'
  },
  {
    field: 'verified',
    headerName: 'Verified',
    flex: 1,
    type: 'boolean'
  }
]

const Clients = (): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  const onAdd = (): void => {}

  return (
    <div className="users">
      <div className="info">
        <h1>Usuarios</h1>
        <button className="btn flex" onClick={(): void => setOpen(true)}>
          Agregar usuario
        </button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={userRows}
        disableToolbar={false}
        disableViewAction={false}
        disableFooterTotalBar={true}
      />

      {open && <Add slug="user" columns={columns} setOpen={setOpen} addEvent={onAdd} />}
    </div>
  )
}

export default Clients
