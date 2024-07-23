import React, { useEffect, useMemo, useCallback } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import ActionsCellRenderer from "../components/ActionsCellRenderer";
import {
  selectBistros,
  setBistrosAction,
  deleteBistroAction,
} from "../store/bistroSlice";
import { api } from "../constants";

const Bistros = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location");

  const gridRef = React.createRef<AgGridReact>();

  const bistros = useSelector(selectBistros);

  const deleteBistro = useCallback(
    async (id: string) => {
      let toDelete = window.confirm(
        "Are you sure you want to delete this bistro?"
      );
      if (toDelete) {
        try {
          await axios.delete(`${api.bistros}${id}`);
          dispatch(deleteBistroAction(id));
          window.alert(`Bistro deleted successfully`);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [dispatch]
  );

  const columnDefs: ColDef[] = useMemo(() => {
    return [
      { field: "name", resizable: true },
      { field: "description", resizable: true },
      {
        field: "employees",
        resizable: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <Button component="a" href={`/employees?bistro=${params.data._id}`}>
              {params.data.employees} employees
            </Button>
          );
        },
      },
      {
        field: "location",
        resizable: true,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <Button
              onClick={() =>
                setSearchParams({ location: params.data.location })
              }
            >
              {params.data.location}
            </Button>
          );
        },
      },
      {
        field: "actions",
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <ActionsCellRenderer
              editLink={`/bistros/${params.data._id}`}
              onClickDelete={async () => {
                await deleteBistro(params.data._id);
              }}
            />
          );
        },
      },
    ];
  }, [deleteBistro, setSearchParams]);

  const defaultColDef = useMemo(
    () => ({
      sortable: false,
    }),
    []
  );

  useEffect(() => {
    axios
      .get(`${api.bistros}${location ? `?location=${location}` : ""}`)
      .then((res) => {
        dispatch(setBistrosAction(res.data));
      })
      .catch((err) => console.error(err));
  }, [dispatch, location]);

  return (
    <Box>
      <Typography variant="h4">Bistros</Typography>

      <Button
        variant="contained"
        sx={{ my: 2 }}
        component="a"
        href="/bistros/new"
      >
        Add new bistro
      </Button>

      <Box>
        {location && (
          <Chip
            label={`Location: ${location}`}
            sx={{ my: 2 }}
            onDelete={() => {
              setSearchParams({});
            }}
          />
        )}
      </Box>

      <div className="ag-theme-alpine" style={{ width: "100%", height: 800 }}>
        <AgGridReact
          ref={gridRef}
          rowData={bistros}
          rowHeight={64}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
        />
      </div>
    </Box>
  );
};

export default Bistros;
