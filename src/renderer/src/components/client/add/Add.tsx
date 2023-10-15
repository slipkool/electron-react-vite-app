import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AddProps } from '@renderer/app/core/props'
import { CreateClientDto, UpdateClientDto } from '@renderer/app/dtos/client.dto'
import { Client } from '@renderer/app/models/client.model'
import { useAppDispatch } from '@renderer/redux/store'
import { addClient, updateClient } from '@renderer/redux/states/clientSlice'
import './add.scss'

type AddFormValues = {
  name: string
  documentType: string
  identification: string
  address: string
  phone: number
  email: string
}

const schema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  documentType: yup.string().required('El tipo de documento es requerido'),
  identification: yup.string().required('La identificacion es requerida'),
  address: yup.string().required('La direccion es requerida'),
  phone: yup
    .number()
    .typeError('El valor debe ser un numero')
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser mayor a cero'),
  email: yup.string().required('El correo es requerido').email('No es un correo apropiado')
})

const Add = (props: AddProps<Client>): React.JSX.Element => {
  const dispatchApp = useAppDispatch()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<AddFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: 0
    }
  })
  const documentType = [
    {
      type: 'CC',
      name: 'Cedula'
    },
    {
      type: 'NI',
      name: 'NIT'
    },
    {
      type: 'TI',
      name: 'Tarjeta de identidad'
    }
  ]
  const isAddMode = !props.editObject

  useEffect(() => {
    if (!props.editObject) return
    setValue('name', props.editObject?.name)
    setValue('documentType', props.editObject?.documentType)
    setValue('identification', props.editObject?.identification)
    setValue('address', props.editObject?.address)
    setValue('phone', props.editObject?.phone)
    setValue('email', props.editObject?.email)
  }, [])

  const onSubmit = async (data: AddFormValues, event): Promise<void> => {
    event.preventDefault()

    isAddMode ? create(data) : update(props.editObject?.id, data)

    if (props.saveEvent) props.saveEvent()

    props.setOpen(false)
  }

  const create = async (data: AddFormValues): Promise<void> => {
    const newClient: CreateClientDto = {
      name: data.name,
      documentType: data.documentType,
      identification: data.identification,
      address: data.address,
      phone: data.phone,
      email: data.email
    }

    dispatchApp(addClient(newClient))
  }

  const update = async (id: number | undefined, data: AddFormValues): Promise<void> => {
    if (id) {
      const client: UpdateClientDto = {
        id,
        name: data.name,
        documentType: data.documentType,
        identification: data.identification,
        address: data.address,
        phone: data.phone,
        email: data.email
      }

      dispatchApp(updateClient(client))
    }
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={(): void => props.setOpen(false)}>
          X
        </span>
        <h1>{isAddMode ? 'Nuevo' : 'Editar'} Cliente</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="item">
            <label>Nombre del producto</label>
            <input
              type="text"
              placeholder="Nombre del producto"
              {...register('name', {
                required: { value: true, message: 'Nombre del producto es requerido' },
                minLength: {
                  value: 2,
                  message: 'Nombre debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>
          <div className="item">
            <label>Tipo de documento</label>
            <select {...register('documentType')} defaultValue="">
              <option value="" disabled>
                -- Seleccione --
              </option>
              {documentType.map((element) => (
                <option key={element.type} value={element.type}>
                  {element.name}
                </option>
              ))}
            </select>
            {errors.documentType && (
              <span className="error-message">{errors.documentType.message}</span>
            )}
          </div>
          <div className="item">
            <label>Identificacion</label>
            <input
              type="text"
              placeholder="Identificacion"
              {...register('identification', {
                required: { value: true, message: 'Identificacion es requerido' },
                minLength: {
                  value: 2,
                  message: 'Identificacion debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.identification && (
              <span className="error-message">{errors.identification.message}</span>
            )}
          </div>
          <div className="item">
            <label>Direccion</label>
            <input
              type="text"
              placeholder="Direccion"
              {...register('address', {
                required: { value: true, message: 'Direccion es requerida' },
                minLength: {
                  value: 2,
                  message: 'Direccion debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>
          <div className="item">
            <label>Correo</label>
            <input
              type="email"
              placeholder="Correo"
              {...register('email', {
                required: { value: true, message: 'Correo es requerido' },
                minLength: {
                  value: 2,
                  message: 'Correo debe tener al menos 2 caracteres'
                }
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="item">
            <label>Telefono</label>
            <input
              type="number"
              placeholder="Telefono"
              {...register('phone', {
                required: { value: true, message: 'Precio es requerido' }
              })}
            />
            {errors.phone && <span className="error-message">{errors.phone.message}</span>}
          </div>
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add
