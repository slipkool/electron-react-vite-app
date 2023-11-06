import http, { baseURL } from "@renderer/conf/http-common";
import { ORDERS_ENDPOINT } from "../core/appConstants";
import {
  CreateOrderDto,
  GetUploadImageOrderDto,
  UpdateOrderDto,
  UploadImageOrderDto,
} from "../dtos/order.dto";
import { Order } from "../models/order.model";

const getOrderUrl = (id): string => `${ORDERS_ENDPOINT}/${id}`;
const getOrderUploadImageUrl = (id): string =>
  `${ORDERS_ENDPOINT}/upload-image/${id}`;

const responseBody = (response) => response.data;

const fetchOrders = () => {
  return http.get<Order[]>(ORDERS_ENDPOINT).then(responseBody);
};

const fetchOrderById = (id) => {
  return http.get<Order[]>(getOrderUrl(id)).then(responseBody);
};

const deleteOrder = (id) => {
  return http.delete(getOrderUrl(id)).then(responseBody);
};

const addOrder = (order: CreateOrderDto) => {
  return http.post(ORDERS_ENDPOINT, order).then(responseBody);
};

const updateOrder = (id, order: UpdateOrderDto) => {
  return http.patch(getOrderUrl(id), order).then(responseBody);
};

const uploadImageOrder = (uploadImageOrderDto: UploadImageOrderDto) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  return http
    .post(
      getOrderUploadImageUrl(uploadImageOrderDto.id),
      uploadImageOrderDto.formData,
      config,
    )
    .then(responseBody);
};

const fetchUploadImageOrder = (
  getUploadImageOrderDto: GetUploadImageOrderDto,
) => {
  return fetch(
    `${baseURL + getOrderUploadImageUrl(getUploadImageOrderDto.id)}/${
      getUploadImageOrderDto.image
    }`,
  );
};

const OrderService = {
  fetchOrders,
  fetchOrderById,
  deleteOrder,
  addOrder,
  updateOrder,
  uploadImageOrder,
  fetchUploadImageOrder,
};

export default OrderService;
