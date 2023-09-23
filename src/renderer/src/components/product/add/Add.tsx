import React, { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '../../dataTable/DataTable'
import { useForm } from 'react-hook-form'

import './add.scss'
import { Product } from '@renderer/app/models/product.model'
import { AddProps } from '@renderer/app/props/props'

type AddFormValues = {
  client: number
  patient: string
  paid: boolean
}

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
    flex: 1
  }
]

const Add = (props: AddProps): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddFormValues>()

  const [selectedTest, setSelectedTest] = useState('')
  const [total, setTotal] = useState(0)
  const [customErrors, setCustomErrors] = useState<string | null>('')
  const [selectedTestList, setSelectedTestList] = useState<Product[]>([])
  const options: Product[] = [
    {
      id: 0,
      description: '--Seleccione--',
      price: 0
    },
    {
      id: 1,
      description: 'Test 1',
      price: 100000
    },
    {
      id: 2,
      description: 'Test 2',
      price: 200000
    },
    {
      id: 3,
      description: 'Test 3',
      price: 300000
    },
    {
      id: 4,
      description: 'Test 4',
      price: 400000
    }
  ]

  useEffect(() => {
    const total = selectedTestList.map((item) => item.price).reduce((a, b) => a + b, 0)
    setTotal(total)
  }, [selectedTestList])

  const handleChange = (event): void => {
    const test = options.find((test) => {
      return test.id === parseInt(event.target.value, 10)
    })

    if (test === undefined) {
      return
    }

    setSelectedTestList((prevArray) => [...prevArray, test])
    setSelectedTest('')
  }

  const onSubmit = (data: AddFormValues, event): void => {
    event.preventDefault()

    props.setOpen(false)
  }

  const onDelete = (data: number): void => {
    const newItems = selectedTestList.filter((item) => item.id !== data)
    setSelectedTestList(newItems)
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={(): void => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item">
            <label>Nombre del cliente</label>
            <input
              type="text"
              placeholder="Nombre del cliente"
              {...register('client', {
                required: { value: true, message: 'Nombre del cliente es requerido' },
                minLength: {
                  value: 2,
                  message: 'Nombre debe tener al menos 2 caracteres'
                }
              })}
            />
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
            <label>Listado de pruebas</label>
            <select onChange={handleChange} value={selectedTest}>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>Pagado</label>
            <input type="checkbox" {...register('paid')} />
          </div>
          <div className="item-grid">
            <label>Pruebas a realizar</label>
            <DataTable
              slug="users"
              columns={columns}
              rows={selectedTestList}
              disableToolbar={true}
              disableViewAction={true}
              disableFooterTotalBar={false}
              total={total}
              deleteEvent={onDelete}
            />
            {customErrors && <span className="error-message">{customErrors}</span>}
          </div>
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add
