import {
  DataGrid,
  GridColDef,
  GridFooter,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import React from "react";
/* import { Link } from 'react-router-dom' */
import { DatagridProps } from "@renderer/app/core/props";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import imgView from "../../assets/images/view.svg";
import CustomFooterTotalComponent from "./CustomFooterTotalComponent";
import imgDelete from "../../assets/images/delete.svg";

import { tokens } from "../../theme";
import "./dataTable.scss";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    total: number;
  }
}

const DataTable = (props: DatagridProps): React.JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = (id: number): void => {
    if (props.deleteEvent) props.deleteEvent(id);
  };

  const handleView = (id: number): void => {
    if (props.viewEvent) props.viewEvent(id);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Acción",
    minWidth: 100,
    flex: 1,
    disableExport: true,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* {!props.disableViewAction && (
            <Link to={`/${props.slug}/${params.row.id}`}>
              <img src={imgView} alt="Ver" title="Ver" />
            </Link>
          )} */}
          {!props.disableViewAction && (
            <div
              className="delete"
              onClick={(): void => handleView(params.row.id)}
            >
              <img src={imgView} alt="Ver" title="Ver" />
            </div>
          )}

          <div
            className="delete"
            onClick={(): void => handleDelete(params.row.id)}
          >
            <img src={imgDelete} alt="Eliminar" title="Eliminar" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <Box
        m="40px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: `#384256`,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: `#384256`,
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .hot": {
            backgroundColor: "#ff090975",
            color: "#ffffff",
          },
          overflowX: "scroll",
        }}
      >
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            toolbar: props.disableToolbar ? null : GridToolbar,
            footer: props.disableFooterTotalBar
              ? GridFooter
              : CustomFooterTotalComponent,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              csvOptions: {
                delimiter: ";",
                fileName: "dataBase",
                utf8WithBom: true,
              },
            },
            footer: { total: props.total },
          }}
          localeText={{
            // Export selector toolbar button text
            toolbarExport: "Exportar",
            toolbarExportLabel: "Exportar",
            toolbarExportCSV: "Descargar como CSV",
            toolbarExportPrint: "Imprimir",
            toolbarExportExcel: "Descargar como Excel",
            // Quick filter toolbar field
            toolbarQuickFilterPlaceholder: "Buscar…",
            toolbarQuickFilterLabel: "Buscar",
            toolbarQuickFilterDeleteIconLabel: "Limpiar",
            // Filters toolbar button text
            toolbarFilters: "Filtros",
            toolbarFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count} filtros activos`
                : `${count} filtro activo`,
            // Filter panel text
            filterPanelColumns: "Columnas",
            filterPanelOperator: "Operador",
            filterPanelInputLabel: "Valor",
            filterPanelDeleteIconLabel: "Eliminar",
            // Filter operators text
            filterOperatorContains: "contenga",
            filterOperatorEquals: "igual",
            filterOperatorStartsWith: "empiece con",
            filterOperatorEndsWith: "termine con",
            filterOperatorIsEmpty: "es vacio",
            filterOperatorIsNotEmpty: "no este vacio",
            filterOperatorIsAnyOf: "es uno de",
            filterOperatorIs: "sea",
            filterOperatorNot: "no sea",
            filterOperatorAfter: "es despues",
            filterOperatorOnOrAfter: "es ahora o despues",
            filterOperatorBefore: "es antes",
            filterOperatorOnOrBefore: "es ahora o antes",
            // Filter values text
            filterValueAny: "cualquiera",
            filterValueTrue: "verdadero",
            filterValueFalse: "falso",
          }}
          pageSizeOptions={[5, 10]}
          /* checkboxSelection */
          disableRowSelectionOnClick
          /* disableColumnFilter */
          disableDensitySelector
          disableColumnSelector
        />
      </Box>
    </div>
  );
};

export default DataTable;
