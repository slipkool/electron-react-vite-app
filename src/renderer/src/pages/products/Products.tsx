import React, { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '@renderer/components/dataTable/DataTable'
import Add from '@renderer/components/product/add/Add'

//import useFetchAndLoad from '@renderer/app/hooks/useFetchAndLoad'
import { deleteProduct, fetchProducts } from '@renderer/app/services/product.service'
//import { useAsync } from '@renderer/app/hooks/asyncComponentClean.hook'
import './products.scss'
//import { productDtoToProductModelList } from '@renderer/app/dtos/product.dto'
import { Product } from '@renderer/app/models/product.model'
import { productDtoToProductModelList } from '@renderer/app/dtos/product.dto'

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
  //const { loading, callEndpoint } = useFetchAndLoad()
  const [products, setProducts] = useState<Product[]>([])
  /* const getApiData = async () => await callEndpoint(fetchProducts())

  const adaptResponse = (data: any): void => {
    setProducts(productDtoToProductModelList(data))
  }

  useAsync(getApiData, adaptResponse, () => {}, []) */

  const getData = async (): Promise<void> => {
    try {
      const response = await fetchProducts()
      setProducts(productDtoToProductModelList(response))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSave = (): void => {
    getData()
  }

  const onDelete = async (data: number): Promise<void> => {
    const result = await deleteProduct(data)
    console.log(result)
    getData()
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
        />
      </div>

      {open && <Add setOpen={setOpen} saveEvent={onSave} />}
    </div>
  )
}

export default Products
