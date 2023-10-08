import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AddProps } from '@renderer/app/props/props'
import { CreateProductDto } from '@renderer/app/dtos/product.dto'
import { addProduct } from '@renderer/app/services/product.service'
import './add.scss'

type AddFormValues = {
  price: number
  name: string
}

const schema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  price: yup
    .number()
    .typeError('El valor debe ser un numero')
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser mayor a cero')
})

const Add = (props: AddProps): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: 0
    }
  })

  const onSubmit = async (data: AddFormValues, event): Promise<void> => {
    event.preventDefault()

    const newProduct: CreateProductDto = {
      name: data.name,
      price: data.price
    }
    const response = await addProduct(newProduct)
    console.log(response)

    if (props.saveEvent) props.saveEvent()

    props.setOpen(false)
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={(): void => props.setOpen(false)}>
          X
        </span>
        <h1>Nuevo Producto</h1>
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
            <label>Precio</label>
            <input
              type="number"
              placeholder="Precio"
              {...register('price', {
                required: { value: true, message: 'Precio es requerido' }
              })}
            />
            {errors.price && <span className="error-message">{errors.price.message}</span>}
          </div>
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add
