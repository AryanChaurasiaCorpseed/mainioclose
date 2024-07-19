import { Box } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React from "react"

const UserListComponent = ({ row, columns, tableName, getRowId }) => {
  return (
    <Box sx={{ height: "65vh", width: "100%" }}>
      <h1 className="table-main-heading">{tableName}</h1>
      <DataGrid
        checkboxSelection
        rows={row}
        getRowId={getRowId}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  )
}

export default UserListComponent
