"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";

export function TableGrid<T>({
  data,
  baseColumns,
  loading,
  updateRow,
  deleteRow,
  newRow,
}: {
  data: T[];
  loading: boolean;
  baseColumns: GridColDef[];
  updateRow: (row: GridRowModel) => void;
  deleteRow: (row: GridRowModel) => void;
  newRow: () => void;
}) {
  const [rows, setRows] = React.useState(data as GridRowsProp);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    setRows(data as GridRowsProp);
  }, [data]);

  const columns: GridColDef[] = [
    ...baseColumns,
    {
      field: "actions",
      type: "actions",
      width: 150,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              const row = rows.find((row) => row.id === id);
              if (row) updateRow(row);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              const row = rows.find((row) => row.id === id);
              if (row) deleteRow(row);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        loading={loading}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => newRow()}
              >
                Add record
              </Button>
            </GridToolbarContainer>
          ),
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      />
    </Box>
  );
}
