import z from "zod";

const orderSchema = z.object({
  patient: z.string({
    invalid_type_error: "El nombre del paciente debe ser texto.",
    required_error: "Nombre del paciente es requerido.",
  }),
  clientId: z
    .number({
      required_error: "El cliente es requerido.",
    })
    .int()
    .nonnegative(),
  total: z
    .number({
      required_error: "El valor total es requerido.",
    })
    .int()
    .nonnegative(),
  partialPayment: z.number().int().nonnegative(),
  productsIds: z.array(z.number()).nonempty(),
  paid: z.boolean(),
  images: z.string().optional().array()
})

export function validateOrder(input) {
  return orderSchema.safeParse(input);
}

export function validatePartialOrder(input) {
  return orderSchema.partial().safeParse(input);
}
