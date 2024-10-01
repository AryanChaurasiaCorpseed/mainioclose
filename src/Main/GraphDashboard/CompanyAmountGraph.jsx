import { Bar } from "@ant-design/plots"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCompanyAmountGrapgh } from "../../Toolkit/Slices/DasboardSlice"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import { DatePicker, Flex, Select } from "antd"
import { rangePresets } from "../Common/Commons"
const { RangePicker } = DatePicker

const CompanyAmountGraph = ({ expandedBox }) => {
  const dispatch = useDispatch()
  const { userid } = useParams()

  const dataList = useSelector((state) => state.dashboard.companyAmountList)
  const allUsers = useSelector((state) => state.user.allUsers)
  const [filteredData, setFilteredData] = useState({
    userId: userid,
    serviceName: null,
    toDate: null,
    fromDate: null,
  })

  useEffect(() => {
    dispatch(getAllCompanyAmountGrapgh(filteredData))
  }, [dispatch])

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From   out: ", dateStrings[0], ", to: ", dateStrings[1])
      dispatch(
        getAllCompanyAmountGrapgh({
          ...filteredData,
          toDate: dateStrings[0],
          fromDate: dateStrings[1],
        })
      )
      setFilteredData((prev) => ({
        ...prev,
        toDate: dateStrings[0],
        fromDate: dateStrings[1],
      }))
    } else {
      console.log("Clear")
    }
  }

  const config = {
    data: dataList?.slice(0, 10),
    xField: "name",
    yField: "value",
    colorField: "name",
    height: expandedBox === 0 || expandedBox >= 1 ? 650 : 300,
    width: expandedBox === 0 || expandedBox >= 1 ? 1200 : 600,
    legend: {
      color: {
        maxRows: 1,
      },
    },
  }
  return (
    <>
      <Flex gap={8}>
        <Select
          showSearch
          allowClear
          style={{ minWidth: "150px" }}
          placeholder="Select user"
          value={Number(filteredData?.userId)}
          options={
            allUsers?.length > 0
              ? allUsers?.map((item) => ({
                  label: item?.fullName,
                  value: item?.id,
                }))
              : []
          }
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
          onChange={(e) => {
            if (e) {
              dispatch(
                getAllCompanyAmountGrapgh({ ...filteredData, userId: e })
              )
              setFilteredData((prev) => ({ ...prev, userId: e }))
            }
          }}
          onClear={() =>
            dispatch(
              getAllCompanyAmountGrapgh({ ...filteredData, userId: userid })
            )
          }
        />
        <RangePicker
          presets={rangePresets}
          value={[
            filteredData?.fromDate ? dayjs(filteredData?.fromDate) : dayjs(),
            filteredData?.toDate ? dayjs(filteredData?.toDate) : dayjs(),
          ]}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
          onChange={onRangeChange}
        />
      </Flex>
      <Bar {...config} />
    </>
  )
}

export default CompanyAmountGraph