import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import CreateRatingModel from "../../Model/CreateRatingModel"
import CommonTable from "../../components/CommonTable"
import OverFlowText from "../../components/OverFlowText"
import { Icon } from "@iconify/react"
import { Input, Typography } from "antd"
import { getAllUrlList } from "../../Toolkit/Slices/LeadUrlSlice"
const { Text } = Typography

const UserService = () => {
  const dispatch=useDispatch()
  const { allLeadUrlLoading, allLeadUrlError, allUrlList } = useSelector(
    (prev) => prev?.leadurls
  )
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(()=>{
    dispatch(getAllUrlList())
  },[dispatch])

  useEffect(() => {
    setFilteredData(allUrlList)
  }, [allUrlList])
  


  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = allUrlList?.filter((item) =>
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
      width:100
    },
    {
      dataIndex: "urlsName",
      title: "Url's name",
      render: (_, props) => (
        <OverFlowText linkText={true} to={`${props?.id}`}>
          {props?.urlsName}
        </OverFlowText>
      ),
    },
    {
      dataIndex: "quality",
      title: "Quality",
      width:100,
      render: (_, data) => <Text>{data?.quality ? "True" : "False"}</Text>,
    },
  ]

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All service"} />
        <CreateRatingModel />
      </div>

      <div>
        <Input
          placeholder="search"
          value={searchText}
          onChange={handleSearch}
          style={{ width: "250px" }}
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
        {allLeadUrlLoading && <TableScalaton />}
        {allLeadUrlError && <SomethingWrong />}
        {allUrlList && !allLeadUrlLoading && !allLeadUrlError && (
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ y: 450 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default UserService
