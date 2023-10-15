import z from 'zod'

const productSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre del cliente debe ser texto.',
    required_error: 'Nombre del cliente es requerido.'
  }),
  price: z.number({
    required_error: 'Precio es requerido.'
  }).int().positive()
})

export function validateProduct (input) {
  return productSchema.safeParse(input)
}

export function validatePartialProduct (input) {
  return productSchema.partial().safeParse(input)
}
