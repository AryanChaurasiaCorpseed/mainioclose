import React, { useEffect, useState } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import { useDispatch, useSelector } from "react-redux"
import {
  getProjectAction,
  handleNext,
  handlePrev,
} from "../../../Toolkit/Slices/ProjectSlice"
import ColComp from "../../../components/small/ColComp"
import CommonTable from "../../../components/CommonTable"
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"
import { Input } from "antd"

const ProjectPage = () => {
  const dispatch = useDispatch()

  const currUserId = useSelector((prev) => prev?.auth?.currentUser?.id)
  const { allProject, loadingProject, errorProject, page } = useSelector(
    (prev) => prev?.project
  )

  useEffect(() => {
    dispatch(getProjectAction({ id: currUserId, page }))
  }, [currUserId, dispatch, page])

  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(allProject)
  }, [allProject])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = allProject?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 50,
      fixed: "left",
    },
    {
      dataIndex: "client",
      title: "Client",
      fixed: "left",
      render: (_, props) => <OverFlowText>{props?.client}</OverFlowText>,
    },
    {
      dataIndex: "leadNane",
      title: "Lead name",
      fixed: "left",
      render: (_, props) => <OverFlowText>{props?.leadName}</OverFlowText>,
    },
    {
      dataIndex: "projectName",
      title: "Project name",
      render: (_, props) => <OverFlowText>{props?.projectName}</OverFlowText>,
    },
    {
      dataIndex: "amount",
      title: "Amount",
      render: (_, props) => <OverFlowText>{props?.amount}</OverFlowText>,
    },
    {
      dataIndex: "assigneeName",
      title: "Assignee name",
      render: (_, props) => <OverFlowText>{props?.assigneeName}</OverFlowText>,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, data) => <ColComp data={data?.status} />,
    },
    {
      dataIndex: "pAddress",
      title: "Primary address",
      render: (_, record) => <OverFlowText>{record?.pAddress}</OverFlowText>,
    },
    {
      dataIndex: "pCity",
      title: "Primary city",
      render: (_, record) => <OverFlowText>{record?.pCity}</OverFlowText>,
    },
    {
      dataIndex: "pState",
      title: "Primary state",
      render: (_, record) => <OverFlowText>{record?.pState}</OverFlowText>,
    },
    {
      dataIndex: "pCountry",
      title: "Primary country",
      render: (_, record) => <OverFlowText>{record?.pCountry}</OverFlowText>,
    },
    {
      dataIndex: "pPinCode",
      title: "Primary pincode",
      render: (_, record) => <OverFlowText>{record?.pPinCode}</OverFlowText>,
    },
    {
      dataIndex: "sAddress",
      title: "Secondary address",
      render: (_, record) => <OverFlowText>{record?.sAddress}</OverFlowText>,
    },
    {
      dataIndex: "sCity",
      title: "Secondary city",
      render: (_, record) => <OverFlowText>{record?.sCity}</OverFlowText>,
    },
    {
      dataIndex: "sState",
      title: "Secondary state",
      render: (_, record) => <OverFlowText>{record?.sState}</OverFlowText>,
    },
    {
      dataIndex: "sCountry",
      title: "Secondary country",
      render: (_, record) => <OverFlowText>{record?.sCountry}</OverFlowText>,
    },
    {
      dataIndex: "sPinCode",
      title: "Secondary pincode",
      render: (_, record) => <OverFlowText>{record?.sPinCode}</OverFlowText>,
    },
  ]

  return (
    <TableOutlet>
      <MainHeading data={`All projects`} />
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
      <div className="mt-3">
        {loadingProject && <TableScalaton />}
        {errorProject && <SomethingWrong />}
        {allProject && !loadingProject && !errorProject && (
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ y: 500, x: 2500 }}
            pagination={true}
            nextPage={handleNext}
            prevPage={handlePrev}
            nextDisable={allProject?.length < 50 ? true : false}
            prevDisable={page === 0 ? true : false}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default ProjectPage
