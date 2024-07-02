import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTickets } from "../../Toolkit/Slices/TicketSlice"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import { ticketsColumns } from "../../data/TicketData"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"

const UserListComponent = React.lazy(() =>
  import(`../../Tables/UserListComponent`)
)

const AllTickets = () => {
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const dispatch = useDispatch()

  useEffect(() => {     
    dispatch(getAllTickets(currentUserId))
  }, [dispatch,currentUserId
    
  ])

  const {
    allTickets: ticketsData,
    TicketsLoading: ticketsLoading,
    TicketsError,
  } = useSelector((state) => state?.tickets)

  const ticketCount = ticketsData.length


  return (
    <>
      <MainHeading data={`All Tickets (${ticketCount})`} />
      <div className="py-2">
        {TicketsError && <SomethingWrong />}
        {!TicketsError && (
          <Suspense fallback={<TableScalaton />}>
            <UserListComponent
              tableName={""}
              columns={ticketsColumns}
              row={ticketsData}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default AllTickets
