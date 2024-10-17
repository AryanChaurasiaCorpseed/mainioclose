import { Bar } from "@ant-design/plots"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCompanyAmountGrapgh } from "../../Toolkit/Slices/DasboardSlice"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import { Button, DatePicker, Flex, Select } from "antd"
import { rangePresets } from "../Common/Commons"
import { Icon } from "@iconify/react"
const { RangePicker } = DatePicker

const CompanyAmountGraph = ({ expandedBox }) => {
  const dispatch = useDispatch()
  const { userid } = useParams()

  const dataList = useSelector((state) => state.dashboard.companyAmountList)
  const allUsers = useSelector((state) => state.user.allUsers)
  const [filteredData, setFilteredData] = useState({
    userId: null,
    serviceName: null,
    toDate: null,
    fromDate: null,
  })
  const [pagination, setPagination] = useState({ prev: 0, next: 10 })
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getAllCompanyAmountGrapgh(filteredData))
  }, [dispatch])

  useEffect(() => {
    let tempdata = [...dataList]
    let res = tempdata?.slice(pagination?.prev, pagination?.next)
    setData(res)
  }, [dataList, pagination])

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      dispatch(
        getAllCompanyAmountGrapgh({
          ...filteredData,
          toDate: dateStrings[1],
          fromDate: dateStrings[0],
        })
      )
      setFilteredData((prev) => ({
        ...prev,
        toDate: dateStrings[1],
        fromDate: dateStrings[0],
      }))
    } else {
      dispatch(
        getAllCompanyAmountGrapgh({
          ...filteredData,
          toDate: null,
          fromDate: null,
        })
      )
      setFilteredData((prev) => ({
        ...prev,
        toDate: null,
        fromDate: null,
      }))
    }
  }

  const config = {
    data: data,
    xField: "name",
    yField: "value",
    colorField: "name",
    height: expandedBox === 0 || expandedBox >= 1 ? 550 : 250,
    width: expandedBox === 0 || expandedBox >= 1 ? 1000 : 550,
    legend: {
      color: {
        maxRows: 1,
      },
    },
  }

  const handleprev = () => {
    setPagination((data) => ({
      prev: data?.prev - 10,
      next: data?.prev,
    }))
  }

  const handleNext = () => {
    setPagination((prev) => ({
      prev: prev?.next,
      next: prev?.next + 10,
    }))
  }

  return (
    <>
      <Flex gap={8}>
        <Select
          size="small"
          showSearch
          allowClear
          style={{ minWidth: "150px" }}
          placeholder="Select user"
          value={
            Number(filteredData?.userId) === 0
              ? ""
              : Number(filteredData?.userId)
          }
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
          size="small"
          allowClear={true}
          presets={rangePresets}
          value={[
            filteredData?.fromDate ? dayjs(filteredData?.fromDate) : "",
            filteredData?.toDate ? dayjs(filteredData?.toDate) : "",
          ]}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
          onChange={onRangeChange}
        />

        <Flex gap={4}>
          <Button
            size="small"
            disabled={pagination?.prev === 0}
            onClick={handleprev}
          >
            <Icon icon="fluent:chevron-left-24-regular" />
          </Button>
          <Button
            size="small"
            disabled={pagination?.next >= dataList?.length ? true : false}
            onClick={handleNext}
          >
            <Icon icon="fluent:chevron-right-24-regular" />
          </Button>
        </Flex>
      </Flex>
      <Bar {...config} />
    </>
  )
}

export default CompanyAmountGraph
