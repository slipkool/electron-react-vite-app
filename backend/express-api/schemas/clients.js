import z from 'zod';

const clientSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre del cliente debe ser texto.',
    required_error: 'Nombre del cliente es requerido.',
  }),
  address: z.string(),
  phone: z.number().int().positive(),
  documentType: z.string(),
  identification: z.string({
    required_error: 'Identificacion del cliente es requerido.',
  }),
  email: z
    .string()
    .min(1, { message: 'El correo es requerido' })
    .email('El correo no es valido'),
})

export function validateClient (input) {
  return clientSchema.safeParse(input)
}

export function validatePartialClient (input) {
  return clientSchema.partial().safeParse(input)
}
