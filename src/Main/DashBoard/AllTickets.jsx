import React, { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTickets } from "../../Toolkit/Slices/TicketSlice"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import { ticketsColumns } from "../../data/TicketData"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { Icon } from "@iconify/react"
import { Input } from "antd"

const CommonTable = React.lazy(() =>
  import(`../../components/CommonTable`)
)

const AllTickets = () => {
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    dispatch(getAllTickets(currentUserId))
  }, [dispatch, currentUserId])

  const {
    allTickets: ticketsData,
    TicketsLoading: ticketsLoading,
    TicketsError,
  } = useSelector((state) => state?.tickets)

  const ticketCount = ticketsData.length

  useEffect(() => {
    setFilteredData(ticketsData)
  }, [ticketsData])

  const handleSearch = (e) => {
    const value = e.target.value.trim()
    setSearchText(value)
    const filtered = ticketsData?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  return (
    <>
      <MainHeading data={`All tickets (${ticketCount})`} />
      <div className="py-2">
        <div className="flex-verti-center-hori-start mt-2">
          <Input
            placeholder="search"
            size="small"
            value={searchText}
            onChange={handleSearch}
            style={{ width: "250px" }}
            prefix={<Icon icon="fluent:search-24-regular" />}
          />
        </div>
        {TicketsError && <SomethingWrong />}
        {!TicketsError && (
          <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={filteredData}
              columns={ticketsColumns}
              scroll={{ y: 550 }}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default AllTickets
