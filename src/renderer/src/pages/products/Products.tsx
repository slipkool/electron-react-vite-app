import React, { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '@renderer/components/dataTable/DataTable'
import Add from '@renderer/components/product/add/Add'

import { Product } from '@renderer/app/models/product.model'
import { deleteProduct, fetchProducts } from '@renderer/app/store/features/products/productSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/store/store'
import './products.scss'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 1 },
  {
    field: 'name',
    type: 'string',
    headerName: 'Nombre',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Precio',
    minWidth: 100,
    flex: 1,
    valueFormatter: ({ value }) => new Intl.NumberFormat().format(value)
  }
]

const Products = (): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const dispatchApp = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)
  const [product, setProduct] = useState<Product | null>()

  useEffect(() => {
    dispatchApp(fetchProducts())
  }, [])

  const onSave = (): void => {
    setProduct(null)
  }

  const onDelete = (id: number): void => {
    dispatchApp(deleteProduct(id))
  }

  const onView = (data: number): void => {
    console.log(data)
    const productSelected = products.find((product) => product.id === data)
    if (productSelected) {
      setProduct(productSelected)
      setOpen(true)
    } else {
      throw new Error('Producto no existe')
    }
  }

  if (loading) {
    return <h2>Loading</h2>
  }

  return (
    <div className="users">
      <div className="info">
        <h1>Productos</h1>
        <button className="btn flex" onClick={(): void => setOpen(true)}>
          Agregar producto
        </button>
      </div>
      <div>
        <DataTable
          slug="users"
          columns={columns}
          rows={products}
          disableToolbar={false}
          disableViewAction={false}
          disableFooterTotalBar={true}
          deleteEvent={onDelete}
          viewEvent={onView}
        />
      </div>

      {open && <Add setOpen={setOpen} saveEvent={onSave} editObject={product} />}
    </div>
  )
}

export default Products
