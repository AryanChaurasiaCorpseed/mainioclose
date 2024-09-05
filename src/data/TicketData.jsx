import { Tag, Typography } from "antd"
import { EditTicketStaus } from "../Model/EditTicketStaus"
import OverFlowText from "../components/OverFlowText"

const { Text } = Typography
export const ticketsColumns = [
  {
    dataIndex: "id",
    title: "S.No",
    width:80,
    render: (_,props,index) => {
      return (
        <Text>
          {index+ 1}
        </Text>
      )
    },
  },
  {
    dataIndex: "subject",
    title: "Subject",
  },
  {
    dataIndex: "description",
    title: "Description",
    render:(_,props)=><OverFlowText>{props?.description}</OverFlowText>
  },
  {
    dataIndex: "createdBy",
    title: "Created By",
    render: (_,props) =>
      props?.createdBy?.fullName ? (
        <Text>{props?.createdBy?.fullName}</Text>
      ) : (
        "N/A"
      ),
  },
  {
    dataIndex: "status",
    title: "Status",
    render: (_,props) => (
      <Tag
        color={
          props?.status === "Re-Open"
            ? "error"
            : props?.status === "Done"
            ? "green"
            : ""
        }
      >
        {props?.status}
      </Tag>
    ),
  },
  {
    dataIndex: "edit",
    title: "Edit",
    render: (_,props) => <EditTicketStaus data={props} />,
  },
]
