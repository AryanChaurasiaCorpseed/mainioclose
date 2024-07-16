import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React from "react"
import { useSelector } from "react-redux"

const UserLeadComponent = ({ row, columns, tableName, getRowId }) => {
  const currentUserRoles = useSelector((state) => state?.auth?.roles)

  const adminRole = currentUserRoles.includes("ADMIN")

  return (
    <Box sx={{ height: 485, width: "100%" }}>
      <h1 className="table-main-heading">{tableName}</h1>
      <DataGrid
        // checkboxSelection
        disableRowSelectionOnClick
        rows={row}
        getRowId={getRowId}
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            overflow: "scroll",
          },
        }}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={
          adminRole
            ? {
                toolbar: {
                  showQuickFilter: true,
                },
              }
            : {
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
              }
        }
      />
    </Box>
  )
}

export default UserLeadComponent
