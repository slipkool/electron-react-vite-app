import z from 'zod'

const orderSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre del cliente debe ser texto.',
    required_error: 'Nombre del cliente es requerido.'
  }),
  price: z.number({
    required_error: 'Precio es requerido.'
  }).int().positive()
})

export function validateOrder (input) {
  return orderSchema.safeParse(input)
}

export function validatePartialOrder (input) {
  return orderSchema.partial().safeParse(input)
}
