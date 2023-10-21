import { CreateOrderDto, UpdateOrderDto } from "../dtos/order.dto";
import { Order } from "./order.model";

export interface OrderService {
  getAll(): Order[] | Promise<Order[]>;
  update(id: Order["id"], changes: UpdateOrderDto): Order | Promise<Order>;
  create(dto: CreateOrderDto): Order | Promise<Order>;
  findOne(id: Order["id"]): Order | undefined | Promise<Order | undefined>;
}
