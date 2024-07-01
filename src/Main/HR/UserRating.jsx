import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import UserListComponent from "../../Tables/UserListComponent"
import { useDispatch, useSelector } from "react-redux"
import { getAllRating } from "../../Toolkit/Slices/UserRatingSlice"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import CreateRatingModel from "../../Model/CreateRatingModel"
import { useLocation, useParams } from "react-router-dom"
import { allRatingUsers } from "../../Toolkit/Slices/RatingSlice"
import { EditUserRating } from "../../Model/EditUserRating"
import { Typography } from "antd"
const { Text } = Typography

const UserRating = () => {
  const [hidebox, setHidebox] = useState(true)
  const [ratingDep, setRatingDep] = useState(false)
  const [myobjData, setmyObjData] = useState({})
  const [editRatingDep, setEditRatingDep] = useState(false)

  const dispatch = useDispatch()
  const { serviceid } = useParams()

  useEffect(() => {
    dispatch(allRatingUsers({ id: serviceid }))
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(getAllRating())
  // }, [ratingDep])

  const { allUsersList, allUsersLoading, allUsersError } = useSelector(
    (prev) => prev?.ratingn
  )

  const editRatingUser = (data) => {
    setmyObjData((prev) => ({ ...prev, data }))
    setEditRatingDep(true)
    setHidebox((prev) => !prev)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    { field: "urlsName", headerName: "Service Name", width: 250 },
    {
      field: "user",
      headerName: "Assignee",
      width: 250,
      renderCell: (props) =>
        props.row?.user?.map((item) => <Text style={{margin:'0px 2px'}}>{item?.name},</Text>),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (props) => {
        const arrayOfZeros = Array.from({ length: props?.row?.rating }, () => 0)
        return arrayOfZeros.map((star) => (
          <span className="text-warning ml-1">
            <i className="fa-solid fa-star"></i>
          </span>
        ))
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 250,
      renderCell: (props) => <EditUserRating data={props.row} />,
    },
  ]

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"Rating List"} />
      </div>
      <div>
        {allUsersLoading && <TableScalaton />}
        {allUsersError && <SomethingWrong />}
        {allUsersList && !allUsersLoading && !allUsersError && (
          <UserListComponent
            tableName={""}
            columns={columns}
            row={allUsersList}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default UserRating
