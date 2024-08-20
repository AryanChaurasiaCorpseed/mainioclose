import React, { Suspense, useEffect, useState } from "react"
import { putQueryNoData } from "../../API/PutQueryWithoutData"
import MainHeading from "../../components/design/MainHeading"
import { deactivateUserListCol } from "../../data/Userdata"
import { useDispatch, useSelector } from "react-redux"
import { allDeactivateUserFun } from "../../Toolkit/Slices/UsersSlice"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import TableScalaton from "../../components/TableScalaton"
import { Button } from "antd"

const CommonTable = React.lazy(() => import(`../../components/CommonTable`))

const AllDeactivateUser = () => {
  const [deactiveDep, setDeactiveDep] = useState(false)
  const dispatch = useDispatch()

  const { allDeactivateUsers, userDeactivateError } = useSelector(
    (state) => state?.user
  )

  const userCount = allDeactivateUsers.length

  useEffect(() => {
    dispatch(allDeactivateUserFun())
  }, [dispatch, deactiveDep])

  const activateUserFun = async (id) => {
    if (window.confirm("Are you sure to Activate this User?") === true) {
      try {
        await putQueryNoData(
          `/securityService/api/auth/activateUser?userId=${id}`
        )
        await putQueryNoData(`/leadService/api/v1/users/activateUser?id=${id}`)
        setDeactiveDep((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const columns = [
    ...deactivateUserListCol,
    {
      dataIndex: "Action",
      title: "Action",
      render: (_, props) => {
        return (
          <Button onClick={() => activateUserFun(props?.id)}>Activate</Button>
        )
      },
    },
  ]

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`Deactivate users (${userCount})`} />
      </div>
      <div className="mt-3">
        {userDeactivateError && <SomethingWrong />}
        {!userDeactivateError && (
          <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={allDeactivateUsers}
              columns={columns}
              scroll={{ y: 600, x: 1500 }}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default AllDeactivateUser
