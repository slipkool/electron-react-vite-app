import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "@renderer/redux/store";
import { fetchClients } from "@renderer/redux/states/clientSlice";
import { fetchProducts } from "@renderer/redux/states/productSlice";
import { Product } from "@renderer/app/models/product.model";
import DataTable from "@renderer/components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "@renderer/components/dropzone/Dropzone";
import {
  CreateOrderDto,
  GetUploadImageOrderDto,
  UpdateOrderDto,
  UploadImageOrderDto,
} from "@renderer/app/dtos/order.dto";
import {
  addOrder,
  fetchOrderById,
  fetchUploadImageOrder,
  updateOrder,
  uploadImageOrder,
} from "@renderer/redux/states/orderSlice";
import { Order } from "@renderer/app/models/order.model";
import Alert from "@mui/material/Alert";

import "./orderForm.scss";

type AddFormValues = {
  client: number;
  patient: string;
  paid: boolean;
  partialPayment: number;
};

const schema = yup.object({
  client: yup.number().required("Por favor seleccione un cliente"),
  patient: yup.string().required("El paciente es requerido"),
  paid: yup.bool().required("El pago es requerido"),
  partialPayment: yup
    .number()
    .typeError("El valor debe ser un numero")
    .required("Ingrese un valor")
    .min(0, "El valor debe ser mayor a cero"),
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 50, maxWidth: 100, flex: 1 },
  {
    field: "name",
    type: "string",
    headerName: "Prueba",
    minWidth: 400,
    flex: 1,
  },
  {
    field: "price",
    type: "string",
    headerName: "Valor",
    minWidth: 100,
    flex: 1,
    valueFormatter: ({ value }) => new Intl.NumberFormat().format(value),
  },
];

const OrderForm = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatchApp = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clients);
  const { products } = useAppSelector((state) => state.products);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      partialPayment: 0,
    },
  });
  const [total, setTotal] = useState(0);
  const [productSelected, setProductSelected] = useState("");
  const [productListSelected, setProductListSelected] = useState<Product[]>([]);
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [customErrors, setCustomErrors] = useState<string | null>(null);
  const [openModalImage, setOpenModalImage] = useState(false);
  const routeParams = useParams();
  const id = routeParams.id ?? 0;
  const isAddMode = !id;
  const [orderSelected, setOrderSelected] = useState<Order | null>(null);
  const [messageService, setMessageService] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    dispatchApp(fetchClients());
    dispatchApp(fetchProducts());
    if (id) {
      dispatchApp(fetchOrderById(+id)).then((result) => {
        if (result.payload) setOrderSelected(result.payload as Order);
      });
    }
  }, []);

  useEffect(() => {
    const total = productListSelected
      .map((item) => item.price)
      .reduce((a, b) => a + b, 0);
    setTotal(total);
    const partialPayment = getValues("partialPayment");
    setValue("paid", +partialPayment === total);
  }, [productListSelected]);

  useEffect(() => {
    if (orderSelected) {
      setValue("patient", orderSelected.patient);
      setValue("partialPayment", orderSelected.partialPayment);
      setValue("client", orderSelected.client.id);
      setProductListSelected(orderSelected.products);

      const fetchImages = async (order: Order): Promise<void> => {
        if (!order.images) {
          return;
        }
        for (const image of order.images) {
          const imagesPath = image.split("\\");
          const getUploadImageOrderDto: GetUploadImageOrderDto = {
            id: order.id,
            image: imagesPath[imagesPath.length - 1],
          };
          const data = await dispatchApp(
            fetchUploadImageOrder(getUploadImageOrderDto),
          ).unwrap();
          const contentType = data.headers.get("content-type");
          const blob = await data.blob();
          const file = new File([blob], imagesPath[imagesPath.length - 1], {
            contentType,
          });
          setFiles((prev) => [...prev, Object.assign(file, { preview: "" })]);
        }
      };
      fetchImages(orderSelected).catch(console.error);
    }
  }, [orderSelected]);

  const onChangePartialPayment = (event): void => {
    setValue("paid", +event.target.value === total);
  };

  const onChangeProductSelected = (event): void => {
    const product = products.find((item) => {
      return item.id === +event.target.value;
    });

    if (product === undefined) {
      return;
    }

    const existProduct = productListSelected.find((item) => {
      return item.id === +event.target.value;
    });
    if (!existProduct) {
      setProductListSelected((prevArray) => [...prevArray, product]);
    }
    setProductSelected("");
  };

  const onDelete = (data: number): void => {
    const newItems = productListSelected.filter((item) => item.id !== data);
    setProductListSelected(newItems);
  };

  const onSubmit = (data: AddFormValues, event): void => {
    event.preventDefault();
    setCustomErrors(null);

    if (!isValidOrder(data)) {
      return;
    }

    isAddMode ? create(data) : update(parseInt(id), data);
  };

  const create = async (data: AddFormValues): Promise<void> => {
    const newOrder: CreateOrderDto = {
      clientId: +data.client,
      paid: data.paid,
      partialPayment: data.partialPayment,
      patient: data.patient,
      productsIds: productListSelected.map((product) => product.id),
      images: [],
      total,
    };

    try {
      const result = await dispatchApp(addOrder(newOrder)).unwrap();
      await dispatchApp(uploadImageOrder(createFormData(result.id))).unwrap();
      navigate("/orders");
    } catch (error) {
      setMessageService(error.message);
      setOpenDialog(true);
    }
  };

  const update = async (id: number, data: AddFormValues): Promise<void> => {
    if (id) {
      const order: UpdateOrderDto = {
        id,
        clientId: +data.client,
        paid: data.paid,
        partialPayment: data.partialPayment,
        patient: data.patient,
        productsIds: productListSelected.map((product) => product.id),
        images: [],
        total,
      };

      try {
        await dispatchApp(updateOrder(order)).unwrap();
        await dispatchApp(uploadImageOrder(createFormData(id))).unwrap();
        navigate("/orders");
      } catch (error) {
        setMessageService(error.message);
        setOpenDialog(true);
      }
    }
  };

  const createFormData = (id: number): UploadImageOrderDto => {
    const formData = new FormData();
    files.forEach((images, index) => {
      formData.append(`files`, images);
    });
    const uploadImageOrderDto: UploadImageOrderDto = {
      id,
      formData,
    };
    return uploadImageOrderDto;
  };

  const isValidOrder = (data: AddFormValues): boolean => {
    if (productListSelected.length === 0) {
      setCustomErrors("Debe seleccional al menos una prueba a realizar");
      return false;
    }

    if (data.partialPayment > total) {
      setCustomErrors(
        "El valor del abono no puede ser mayor al valor total de las pruebas",
      );
      return false;
    }
    return true;
  };

  const handleClose = (): void => {
    setOpenDialog(false);
  };

  return (
    <div className="order">
      <h1>{isAddMode ? "Nueva" : "Editar"} Orden</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="item">
          <label>Nombre del cliente</label>
          <select {...register("client")} defaultValue="">
            <option value="" disabled>
              -- Seleccione --
            </option>
            {clients.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {errors.client && (
            <span className="error-message">{errors.client.message}</span>
          )}
        </div>
        <div className="item">
          <label>Nombre del paciente</label>
          <input
            type="text"
            placeholder="Nombre del paciente"
            {...register("patient", {
              required: {
                value: true,
                message: "Nombre del paciente es requerido",
              },
              minLength: {
                value: 2,
                message: "Nombre debe tener al menos 2 caracteres",
              },
            })}
          />
          {errors.patient && (
            <span className="error-message">{errors.patient.message}</span>
          )}
        </div>
        <div className="item">
          <label>Abono</label>
          <input
            type="number"
            placeholder="Abono"
            {...register("partialPayment")}
            onChange={onChangePartialPayment}
          />
          {errors.partialPayment && (
            <span className="error-message">
              {errors.partialPayment.message}
            </span>
          )}
        </div>
        <div className="item">
          <label>Listado de pruebas</label>
          <select onChange={onChangeProductSelected} value={productSelected}>
            <option value="" disabled>
              -- Seleccione --
            </option>
            {products.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label>Imagenes</label>
          <button
            className="btn flex transparent"
            type="button"
            onClick={(): void => setOpenModalImage(true)}
          >
            Agregar Imagenes
          </button>
        </div>
        <div className="item-grid">
          <label>Pruebas a realizar</label>
          <DataTable
            slug="users"
            columns={columns}
            rows={productListSelected}
            disableToolbar={true}
            disableViewAction={true}
            disableFooterTotalBar={false}
            total={total}
            deleteEvent={onDelete}
          />
          {customErrors && (
            <span className="error-message">{customErrors}</span>
          )}
        </div>
        <button className="btn">Guardar</button>
      </form>
      {openModalImage && (
        <Dropzone
          setOpen={setOpenModalImage}
          setFiles={setFiles}
          files={files}
        />
      )}

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Informacion!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="error">{messageService}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="btn_dialog" onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderForm;
