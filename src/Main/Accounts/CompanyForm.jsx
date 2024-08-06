import React, { useEffect, useState } from "react"
import MainHeading from "../../components/design/MainHeading"
import CommonTable from "../../components/CommonTable"
import TableOutlet from "../../components/design/TableOutlet"
import { useDispatch, useSelector } from "react-redux"
import { getAllCompanyByStatus } from "../../Toolkit/Slices/CompanySlice"
import { Button, notification, Select, Tooltip, Typography } from "antd"
import { updateStatusById } from "../../Toolkit/Slices/LeadSlice"
import { Icon } from "@iconify/react"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"
import { useParams } from "react-router-dom"
import OverFlowText from "../../components/OverFlowText"
import ColComp from "../../components/small/ColComp"
const { Text } = Typography

const CompanyForm = ({ role }) => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const leadCompanyList = useSelector(
    (state) => state.company.allLeadCompanyList
  )
  const [selectedFilter, setSelectedFilter] = useState("initiated")
  useEffect(() => {
    dispatch(getAllCompanyByStatus({ id: userid, status: selectedFilter }))
  }, [dispatch, selectedFilter,userid])
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      fixed: "left",
      width: 50,
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      fixed: "left",
    },
    {
      title: "Pan number",
      dataIndex: "panNo",
      render: (_, data) => <ColComp data={data?.panNo} />,
    },
    {
      title: "Gst type",
      dataIndex: "gstType",
      render: (_, data) => <ColComp data={data?.gstType} />,
    },
    {
      title: "Gst no.",
      dataIndex: "gstNo",
      render: (_, data) => <ColComp data={data?.gstNo} />,
    },
    {
      title: "Company age",
      dataIndex: "companyAge",
      render: (_, data) => <ColComp data={data?.companyAge} />,
    },
    // {
    //   title:'Assignee',
    //   dataIndex:'assignee',
    //   render:(_,data)=><Text>{data?.assignee?.fullName}</Text>
    // },
    {
      title: "Contact number",
      dataIndex: "contactNo",
      render: (_, data) => <ColComp data={data?.contactNo} />,
    },
    {
      title: "Contact whatsapp",
      dataIndex: "contactWhatsappNo",
      render: (_, data) => <ColComp data={data?.contactWhatsappNo} />,
    },
    {
      title: "Contact email",
      dataIndex: "contactEmails",
      render: (_, data) => <ColComp data={data?.contactEmails} />,
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (_, value) => (
        <OverFlowText>{value?.lead?.primaryAddress}</OverFlowText>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      render: (_, data) => <ColComp data={data?.city} />,
    },
    {
      title: "State",
      dataIndex: "state",
      render: (_, data) => <ColComp data={data?.state} />,
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, data) => <ColComp data={data?.country} />,
    },
    {
      title: "Pin code",
      dataIndex: "primaryPinCode",
      render: (_, data) => <ColComp data={data?.primaryPinCode} />,
    },
    {
      title: "SContact number",
      dataIndex: "secondaryContactNo",
      render: (_, data) => <ColComp data={data?.secondaryContactNo} />,
    },
    {
      title: "SContact whatsapp",
      dataIndex: "secondaryContactWhatsappNo",
      render: (_, data) => <ColComp data={data?.secondaryContactWhatsappNo} />,
    },
    {
      title: "SContact email",
      dataIndex: "secondaryContactEmails",
      render: (_, data) => <ColComp data={data?.secondaryContactEmails} />,
    },
    {
      title: "Secondary address",
      dataIndex: "sAddress",
      render: (_, value) => (
        <OverFlowText>
          {value?.lead?.primaryAddress ? value?.lead?.primaryAddress : "NA"}
        </OverFlowText>
      ),
    },
    {
      title: "Secondary city",
      dataIndex: "sCity",
      render: (_, data) => <ColComp data={data?.sCity} />,
    },
    {
      title: "Secondary state",
      dataIndex: "sState",
      render: (_, data) => <ColComp data={data?.sState} />,
    },
    {
      title: "Secondary sountry",
      dataIndex: "sCountry",
      render: (_, data) => <ColComp data={data?.sCountry} />,
    },
    {
      title: "Secondary pincode",
      dataIndex: "secondaryPinCode",
      render: (_, data) => <ColComp data={data?.secondaryPinCode} />,
    },
    {
      title: "Updated by",
      dataIndex: "updatedBy",
      render: (_, data) => <ColComp data={data?.updatedBy?.fullName} />,
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
    ...(role !== "sales"
      ? [
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
                      disabled={value?.status === "approved"}
                      onClick={() => {
                        dispatch(
                          updateStatusById({
                            status: "approved",
                            id: value?.id,
                            userid: userid,
                          })
                        )
                          .then((resp) => {
                            if (resp.meta.requestStatus === "fulfilled") {
                              notification.success({
                                message: "Status update successfully",
                              })
                            } else {
                              notification.error({
                                message: "Something went wrong",
                              })
                            }
                          })
                          .catch(() => {
                            notification.error({
                              message: "Something went wrong",
                            })
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
                      disabled={value?.status === "disapproved"}
                      onClick={() => {
                        dispatch(
                          updateStatusById({
                            status: "disapproved",
                            id: value?.id,
                            userid: userid,
                          })
                        )
                          .then((resp) => {
                            if (resp.meta.requestStatus === "fulfilled") {
                              notification.success({
                                message: "Status update successfully",
                              })
                            } else {
                              notification.error({
                                message: "Something went wrong",
                              })
                            }
                          })
                          .catch(() => {
                            notification.error({
                              message: "Something went wrong",
                            })
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
      : []),
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"Company list"} />
      </div>
      <div className="mt-3">
        <div>
          <Select
            style={{ width: "200px" }}
            showSearch
            value={selectedFilter}
            options={[
              { label: "Initiated", value: "initiated" },
              { label: "Approved", value: "approved" },
              { label: "Disapproved", value: "disapproved" },
            ]}
            onChange={(e) => setSelectedFilter(e)}
          />
        </div>
        <CommonTable
          data={leadCompanyList}
          columns={columns}
          scroll={{ x: 4000, y: 550 }}
          rowSelection={true}
        />
      </div>
    </TableOutlet>
  )
}

export default CompanyForm
