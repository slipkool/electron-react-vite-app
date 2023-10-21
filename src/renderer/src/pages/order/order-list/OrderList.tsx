import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import DataTable from "@renderer/components/dataTable/DataTable";
import { deleteOrder, fetchOrders } from "@renderer/redux/states/orderSlice";
import { useAppDispatch, useAppSelector } from "@renderer/redux/store";

import "./orderList.scss";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    minWidth: 50,
    maxWidth: 100,
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "client_name",
    type: "string",
    headerName: "Cliente",
    minWidth: 100,
    flex: 1,
    valueGetter: (params) => params.row?.client?.name,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "total",
    type: "number",
    headerName: "Total",
    flex: 1,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "partialPayment",
    type: "number",
    headerName: "Abono",
    flex: 1,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "debt",
    headerName: "Deuda",
    description: "Saldo a deber",
    flex: 1,
    valueGetter: ({ row }): string => {
      return currencyFormatter.format(row.total - row.partialPayment);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellClassName: (params: GridCellParams<any, number>): string => {
      if (params.value == null) {
        return "";
      }

      const temp = params.value.toString().replace(/[^0-9.-]+/g, "");

      return parseFloat(temp) > 0
        ? "font-tabular-nums hot"
        : "font-tabular-nums";
    },
    headerAlign: "left",
    align: "left",
  },
  {
    field: "createdAt",
    headerName: "Fecha Creacion",
    flex: 1,
    type: "dateTime",
    valueFormatter: (params) =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    headerAlign: "center",
    align: "center",
  },
  {
    field: "paid",
    headerName: "Pagado",
    flex: 1,
    type: "boolean",
    headerAlign: "center",
    align: "center",
  },
];

const OrderList = (): React.JSX.Element => {
  const dispatchApp = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();

  useEffect(() => {
    dispatchApp(fetchOrders());
  }, []);

  const onDelete = (id: number): void => {
    dispatchApp(deleteOrder(id));
  };

  const onView = (id: number): void => {
    navigate(`/orders/${id}`);
  };

  const onOpenAdd = (): void => {
    navigate("/orders/add");
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="order">
      <div className="info">
        <h1>Ordenes</h1>
        <button className="btn flex" onClick={onOpenAdd}>
          Agregar orden
        </button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={orders}
        disableToolbar={false}
        disableViewAction={false}
        disableFooterTotalBar={true}
        deleteEvent={onDelete}
        viewEvent={onView}
      />
    </div>
  );
};

export default OrderList;
