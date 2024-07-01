import { Tag, Typography } from "antd"
import { EditTicketStaus } from "../Model/EditTicketStaus"

const { Text } = Typography
export const ticketsColumns = [
  {
    field: "id",
    headerName: "S.No",
    width: 80,
    filterable: false,
    renderCell: (props) => {
      return (
        <p className="mb-0">
          {props.api.getRowIndexRelativeToVisibleRows(props?.row?.id) + 1}
        </p>
      )
    },
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 250,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 200,
    renderCell: (props) =>
      props?.row?.createdBy?.fullName ? (
        <Text>{props?.row?.createdBy?.fullName}</Text>
      ) : (
        "N/A"
      ),
  },
  {
    field: "status",
    headerName: "Edit",
    width: 100,
    renderCell: (props) => (
      <Tag
        color={
          props.row?.status === "Re-Open"
            ? "error"
            : props.row?.status === "Done"
            ? "green"
            : ""
        }
      >
        {props?.row?.status}
      </Tag>
    ),
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 100,
    renderCell: (props) => <EditTicketStaus data={props?.row} />,
  },
]
