import { Tag, Tooltip, Typography } from "antd"
import React, { useEffect, useState } from "react"
import CommonTable from "../../components/CommonTable"
import "./Accounts.scss"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllLeadsWithLabelId } from "../../Toolkit/Slices/LeadSlice"
import { getAllProjectList } from "../../Toolkit/Slices/ProjectSlice"
import CreateCompanyModal from "../../Model/CreateCompanyModal"
import {
  getAllComapany,
  getAllParentCompany,
} from "../../Toolkit/Slices/CompanySlice"
import TableOutlet from "../../components/design/TableOutlet"
const { Text } = Typography

export const AccountsList = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const allCompany = useSelector((state) => state.company.allCompany)

  useEffect(() => {
    if (userid !== undefined && userid !== null) {
      dispatch(getAllComapany(userid))
    }
    dispatch(getAllLeadsWithLabelId())
    dispatch(getAllProjectList())
    dispatch(getAllParentCompany())
  }, [userid, dispatch])

  const columns = [
    {
      title: "Company name",
      dataIndex: "companyName",
      key: "1",
      fixed: "left",
    },
    {
      title: "Pan",
      dataIndex: "panNo",
      key: "2",
    },
    {
      title: "Gst no.",
      dataIndex: "gstNo",
      key: "3",
    },
    {
      title: "Company age",
      dataIndex: "companyAge",
      key: "4",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "5",
    },
    {
      title: "Lead",
      dataIndex: "lead",
      key: "6",
      render: (_, data) => (
        <Tooltip
          title={data?.lead?.map((item, idx) => (
            <Tag>{item?.leadNameame}</Tag>
          ))}
        >
          <Tag className="lead-tag">{data?.lead?.[0]?.leadNameame}</Tag>
        </Tooltip>
      ),
      // <Text>{data?.lead?.leadNameame}</Text>
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "7",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "8",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "9",
      render: (_, data) => <Text>{data?.assignee?.fullName}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "10",
      render: (_, data) => <Text>{data?.assignee?.status}</Text>,
    },
  ]

  return (
    <TableOutlet>
      <div className="account-table-header">
        <CreateCompanyModal />
      </div>
      <CommonTable columns={columns} data={allCompany} />
    </TableOutlet>
  )
}
