import React, { Suspense, useEffect, useState } from "react"
import MainHeading from "../../components/design/MainHeading"
import TableCMPadding from "../../components/design/TableCMPadding"
import { allManagerUser } from "../../Toolkit/Slices/UsersSlice"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { ApproveduserByManager } from "../../Toolkit/Slices/ApprovedStatus"
import { allManagerCol } from "../../data/Userdata"

const CommonTable = React.lazy(() => import(`../../components/CommonTable`))

const AllManagerApprovals = () => {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const [approverdUserDep, setApproverdUserDep] = useState(false)

  const { allManagerUsers: hrApprovalUser, userManagerError } = useSelector(
    (state) => state?.user
  )

  useEffect(() => {
    dispatch(allManagerUser(currentUserId))
  }, [dispatch, approverdUserDep, currentUserId])

  const columns = [
    ...allManagerCol,
    {
      dataIndex: "Action",
      title: "Action",
      width: 260,
      render: (_, props) => {
        return (
          <>
            <button
              className="common-btn-one mr-2"
              onClick={() => approvedUserManagerFun(props.id)}
            >
              Approved
              <i className="fa-solid ml-2 fa-check"></i>
            </button>
            <button
              className="common-btn-one mr-2"
              onClick={() => rejectedUserManagerFun(props.id)}
            >
              Rejected
              <i className="fa-solid ml-2 fa-check"></i>
            </button>
          </>
        )
      },
    },
  ]

  const approvedUserManagerFun = (id) => {
    const userId = { ids: id }
    if (window.confirm("Are you sure you want to Approved This User")) {
      dispatch(
        ApproveduserByManager({ currid: currentUserId, userid: userId.ids })
      )
      setApproverdUserDep((prev) => !prev)
    }
  }

  const rejectedUserManagerFun = (id) => {
    const userId = { ids: id }
    if (window.confirm("Are you sure you want to Rejected This User")) {
      dispatch(
        ApproveduserByManager({ currid: currentUserId, userid: userId.ids })
      )
      setApproverdUserDep((prev) => !prev)
    }
  }

  return (
    <>
      <MainHeading data={`All users for Approvals`} />
      <TableCMPadding>
        {userManagerError && <SomethingWrong />}
        {!userManagerError && (
          <Suspense fallback={<TableScalaton />}>
            {/* <UserListComponent
              tableName={""}
              columns={columns}
              row={hrApprovalUser}
            /> */}
            <CommonTable
              data={hrApprovalUser}
              columns={columns}
              scroll={{ y: 520, x: 1800 }}
            />
          </Suspense>
        )}
      </TableCMPadding>
    </>
  )
}

export default AllManagerApprovals
