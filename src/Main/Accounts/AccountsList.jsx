import { Input, Tag, Tooltip, Typography } from "antd"
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
import MainHeading from "../../components/design/MainHeading"
import OverFlowText from "../../components/OverFlowText"
import { Icon } from "@iconify/react"
const { Text } = Typography

export const AccountsList = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const allCompany = useSelector((state) => state.company.allCompany)
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (userid !== undefined && userid !== null) {
      // dispatch(getAllComapany(userid))
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
      width: 300,
      render: (_, data) => <OverFlowText>{data?.companyName}</OverFlowText>,
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
          overlayStyle={{ maxWidth: "750px" }}
          title={data?.lead?.map((item, idx) => (
            <Tag color="gray" key={`${idx}leads`}>
              {item?.leadNameame}
            </Tag>
          ))}
          arrow={false}
        >
          <Tag className="lead-tag">{data?.lead?.[0]?.leadNameame}</Tag>
        </Tooltip>
      ),
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

  useEffect(() => {
    setFilteredData(allCompany)
  }, [allCompany])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = allCompany?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={`Account list`} />
        <CreateCompanyModal />
      </div>
      <div className="flex-verti-center-hori-start mt-2">
        <Input
          value={searchText}
          size="small"
          onChange={handleSearch}
          style={{ width: "220px" }}
          placeholder="search"
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      
      <CommonTable
        columns={columns}
        data={filteredData}
        scroll={{ x: 1500, y: 520 }}
      />
    </TableOutlet>
  )
}
