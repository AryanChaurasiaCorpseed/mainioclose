import React, { useEffect } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { useParams } from "react-router-dom"
import { allRatingUsers } from "../../Toolkit/Slices/RatingSlice"
import { EditUserRating } from "../../Model/EditUserRating"
import { Typography } from "antd"
import CommonTable from "../../components/CommonTable"
const { Text } = Typography

const UserRating = () => {
  const dispatch = useDispatch()
  const { serviceid } = useParams()

  useEffect(() => {
    dispatch(allRatingUsers({ id: serviceid }))
  }, [dispatch, serviceid])

  const { allUsersList, allUsersLoading, allUsersError } = useSelector(
    (prev) => prev?.ratingn
  )

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 80,
    },
    { dataIndex: "urlsName", title: "Service name", width: 250 },
    {
      dataIndex: "user",
      title: "Assignee",
      render: (_, props) => (
        props?.user?.map((item) => <Text style={{margin:'0px 2px'}}>{item?.name},</Text>)
      )
    },
    {
      dataIndex: "rating",
      title: "Rating",
      render: (_, props) => {
        const arrayOfZeros = Array.from({ length: props?.rating }, () => 0)
        return arrayOfZeros.map((star) => (
          <span className="text-warning ml-1">
            <i className="fa-solid fa-star"></i>
          </span>
        ))
      },
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_,props) => <EditUserRating data={props} />,
    },
  ]

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"Rating list"} />
      </div>
      <div>
        {allUsersLoading && <TableScalaton />}
        {allUsersError && <SomethingWrong />}
        {allUsersList && !allUsersLoading && !allUsersError && (
          <CommonTable
            data={allUsersList}
            columns={columns}
            scroll={{ y: 510 }}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default UserRating
