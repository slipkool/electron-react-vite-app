import { Client } from "../models/client.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { ClientDto, clientDtoToClientModel } from "./client.dto";
import { ProductDto, productDtoToProductModelList } from "./product.dto";

export interface OrderDto {
  id: number;
  cliente: ClientDto;
  paciente: string;
  pagado: boolean;
  productos: ProductDto[];
  total: number;
  abono: number;
  imagenes: string;
}

export interface CreateOrderDto
  extends Omit<Order, "id" | "client" | "products"> {
  clientId: Client["id"];
  productsIds: Product["id"][];
}

export interface UpdateOrderDto extends Partial<CreateOrderDto> {
  id: number;
}

export const orderDtoToOrderModel = (orderDto: OrderDto): Order => {
  const order: Order = {
    id: +orderDto.id,
    client: clientDtoToClientModel(orderDto.cliente),
    patient: orderDto.paciente,
    paid: orderDto.pagado,
    products: productDtoToProductModelList(orderDto.productos),
    total: orderDto.total,
    partialPayment: orderDto.abono,
    images: orderDto.imagenes?.split(", "),
  };
  return order;
};

export const orderDtoToOrderModelList = (orderDtoList: OrderDto[]): Order[] => {
  return orderDtoList.map((orderDto) => orderDtoToOrderModel(orderDto));
};

export interface UploadImageOrderDto {
  id: number;
  formData: FormData;
}

export interface GetUploadImageOrderDto {
  id: number;
  image: string;
}
