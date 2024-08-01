import React, { useEffect } from "react"
import MainHeading from "../../components/design/MainHeading"
import TableScalaton from "../../components/TableScalaton"
import CommonTable from "../../components/CommonTable"
import CompanyFormModal from "./CompanyFormModal"
import TableOutlet from "../../components/design/TableOutlet"
import { useDispatch, useSelector } from "react-redux"
import { getAllLeadCompanyies } from "../../Toolkit/Slices/CompanySlice"
import { Button, notification, Tooltip, Typography } from "antd"
import { updateStatusById } from "../../Toolkit/Slices/LeadSlice"
import { Icon } from "@iconify/react"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"
const { Text } = Typography

const CompanyForm = () => {
  const dispatch = useDispatch()
  const leadCompanyList = useSelector(
    (state) => state.company.allLeadCompanyList
  )
  useEffect(() => {
    dispatch(getAllLeadCompanyies())
  }, [dispatch])
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      fixed: "left",
      width:50
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      fixed: "left",
    },
    {
      title: "Pan number",
      dataIndex: "panNo",
    },
    {
      title: "Gst no.",
      dataIndex: "gstNo",
    },
    {
      title: "Company age",
      dataIndex: "companyAge",
    },
    // {
    //   title:'Assignee',
    //   dataIndex:'assignee',
    //   render:(_,data)=><Text></Text>
    // },
    {
      title: "Address",
      dataIndex: "address",
      render: (_, value) => <Text>{value?.lead?.primaryAddress}</Text>,
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, data) =>
        data.status === "approved" ? (
          <Text>Approved</Text>
        ) : data.status === "disapproved" ? (
          <Text>Dispproved</Text>
        ) : (
          "Initiated"
        ),
    },
    {
      title: "Approved / Disapproved",
      dataIndex: "status",
      render: (_, value) => {
        return (
          <>
            <Tooltip title={<Text>Approved</Text>} color="#fff">
              <Button
                size="small"
                type="text"
                onClick={() => {
                  dispatch(
                    updateStatusById({ status: "approved", id: value?.id })
                  )
                    .then((resp) => {
                      if (resp.meta.requestStatus === "fulfilled") {
                        notification.success({
                          message: "Status update successfully",
                        })
                      } else {
                        notification.error({ message: "Something went wrong" })
                      }
                    })
                    .catch(() => {
                      notification.error({ message: "Something went wrong" })
                    })
                }}
              >
                <Icon
                  icon="fluent:thumb-like-20-regular"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                  color={value?.status === "approved" ? "green" : ""}
                />
              </Button>
            </Tooltip>
            <Tooltip title={<Text>Disapproved</Text>} color="#fff">
              <Button
                size="small"
                type="text"
                onClick={() => {
                  dispatch(
                    updateStatusById({ status: "disapproved", id: value?.id })
                  )
                    .then((resp) => {
                      if (resp.meta.requestStatus === "fulfilled") {
                        notification.success({
                          message: "Status update successfully",
                        })
                      } else {
                        notification.error({ message: "Something went wrong" })
                      }
                    })
                    .catch(() => {
                      notification.error({ message: "Something went wrong" })
                    })
                }}
              >
                <Icon
                  icon="fluent:thumb-dislike-20-regular"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                  color={value?.status === "disapproved" ? "red" : ""}
                />
              </Button>
            </Tooltip>
          </>
        )
      },
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"Company list"} />
        {/* <CompanyFormModal /> */}
      </div>
      <div className="mt-3">
        {/* {userHRLoading && <TableScalaton />}
        {userHRError && <SomethingWrong />} */}
        <CommonTable
          data={leadCompanyList}
          columns={columns}
          scroll={{ x: 1500, y: 550 }}
          rowSelection={true}
        />
      </div>
    </TableOutlet>
  )
}

export default CompanyForm
