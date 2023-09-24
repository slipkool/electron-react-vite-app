import React, { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DataTable from '@renderer/components/dataTable/DataTable'
import { createOrder, updateOrder } from '@renderer/app/store/features/orders/orderSlice'
import { useAppDispatch } from '@renderer/app/store/store'

import { AddProps } from '@renderer/app/props/props'
import { Product } from '@renderer/app/models/product.model'
import { CreateOrderDto, UpdateOrderDto } from '@renderer/app/dtos/order.dto'
import { optionsClients, optionsProducts } from '@renderer/data'

import './add.scss'

type AddFormValues = {
  client: string
  patient: string
  paid: boolean
  partialPayment: number
}

const schema = yup.object({
  client: yup.string().required('Por favor seleccione un cliente'),
  patient: yup.string().required('El paciente es requerido'),
  paid: yup.bool().required('El pago es requerido'),
  partialPayment: yup
    .number()
    .typeError('El valor debe ser un numero')
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser mayor a cero')
})

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex: 1 },
  {
    field: 'description',
    type: 'string',
    headerName: 'Prueba',
    minWidth: 400,
    flex: 1
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Valor',
    minWidth: 100,
    flex: 1,
    valueFormatter: ({ value }) => new Intl.NumberFormat().format(value)
  }
]

const Add = (props: AddProps): React.JSX.Element => {
  const dispatchApp = useAppDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<AddFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      partialPayment: 0
    }
  })

  const [productSelected, setProductSelected] = useState('')
  const [total, setTotal] = useState(0)
  const [customErrors, setCustomErrors] = useState<string | null>('')
  const [productListSelected, setProductListSelected] = useState<Product[]>([])
  const { order } = props

  const isAddMode = !order

  useEffect(() => {
    if (isAddMode) return
    setValue('client', order.client.id.toString())
    setValue('patient', order?.patient)
    setValue('paid', order?.paid)
    setValue('partialPayment', order?.partialPayment)
    setProductListSelected(order?.products)
  }, [])

  useEffect(() => {
    const total = productListSelected.map((item) => item.price).reduce((a, b) => a + b, 0)
    setTotal(total)
  }, [productListSelected])

  const onChange = (event): void => {
    const test = optionsProducts.find((test) => {
      return test.id === +event.target.value
    })

    if (test === undefined) {
      return
    }

    setProductListSelected((prevArray) => [...prevArray, test])
    setProductSelected('')
  }

  const onSubmit = (data: AddFormValues, event): void => {
    event.preventDefault()

    if (!isValidOrder(data)) {
      return
    }

    isAddMode ? create(data) : update(order.id, data)

    props.setOpen(false)
    props.saveEvent()
  }

  const isValidOrder = (data: AddFormValues): boolean => {
    if (productListSelected.length === 0) {
      setCustomErrors('Debe seleccional al menos una prueba a realizar')
      return false
    }

    if (data.partialPayment > total) {
      setCustomErrors('El valor del abono no puede ser mayor al valor total de las pruebas')
      return false
    }
    return true
  }

  const create = (data: AddFormValues): void => {
    const createOrderDto: CreateOrderDto = {
      patient: data.patient,
      clientId: +data.client,
      productsIds: productListSelected.map((product) => product.id),
      paid: data.paid,
      total: total,
      partialPayment: data.partialPayment,
      images: [],
      createdAt: new Date(),
      updateAt: new Date()
    }
    dispatchApp(createOrder(createOrderDto))
  }

  const update = (id: number, data: AddFormValues): void => {
    const updateOrderDto: UpdateOrderDto = {
      id,
      patient: data.patient,
      clientId: +data.client,
      productsIds: productListSelected.map((product) => product.id),
      paid: data.paid,
      total: total,
      partialPayment: data.partialPayment,
      images: [],
      updateAt: new Date()
    }
    dispatchApp(updateOrder(updateOrderDto))
  }

  const onDelete = (data: number): void => {
    const newItems = productListSelected.filter((item) => item.id !== data)
    setProductListSelected(newItems)
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={(): void => props.setOpen(false)}>
          X
        </span>
        <h1>Nueva {props.slug}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item">
            <label>Nombre del cliente</label>
            <select {...register('client')}>
              <option value="">--Seleccione--</option>
              {optionsClients.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.client && <span className="error-message">{errors.client.message}</span>}
          </div>
          <div className="item">
            <label>Nombre del paciente</label>
            <input
              type="text"
              placeholder="Nombre del paciente"
              {...register('patient', {
                required: { value: true, message: 'Nombre del paciente es requerido' },
                minLength: {
                  value: 2,
                  message: 'Nombre debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.patient && <span className="error-message">{errors.patient.message}</span>}
          </div>
          <div className="item">
            <label>Abono</label>
            <input type="number" placeholder="Abono" {...register('partialPayment')} />
            {errors.partialPayment && (
              <span className="error-message">{errors.partialPayment.message}</span>
            )}
          </div>
          <div className="item">
            <label>Pagado</label>
            <input type="checkbox" {...register('paid')} />
          </div>
          <div className="item">
            <label>Listado de pruebas</label>
            <select onChange={onChange} value={productSelected}>
              <option value="">--Seleccione--</option>
              {optionsProducts.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </select>
          </div>
          <div className="item-grid">
            <label>Pruebas a realizar</label>
            <DataTable
              slug="users"
              columns={columns}
              rows={productListSelected}
              disableToolbar={true}
              disableViewAction={true}
              disableFooterTotalBar={false}
              total={total}
              deleteEvent={onDelete}
            />
            {customErrors && <span className="error-message">{customErrors}</span>}
          </div>
          <button className="btn">Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default Add
