import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import CreateRatingModel from "../../Model/CreateRatingModel"
import { getAllSlugAction } from "../../Toolkit/Slices/LeadSlugSlice"
import { Link } from "react-router-dom"
import CommonTable from "../../components/CommonTable"
import { getAllUsers } from "../../Toolkit/Slices/UsersSlice"
import { getAllUrlAction } from "../../Toolkit/Slices/LeadUrlSlice"

const UserService = () => {
  const dispatch = useDispatch()
  const { allLeadUrl, allLeadUrlLoading, allLeadUrlError } = useSelector(
    (prev) => prev?.leadurls
  )
  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllUrlAction(0))
    dispatch(getAllSlugAction(0))
  }, [dispatch])

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "urlsName",
      title: "Url's name",
      renderCell: (props) => {
        return <Link to={`${props?.row?.id}`}>{props?.row?.urlsName}</Link>
      },
    },
    { dataIndex: "quality", title: "Quality" },
  ]

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All service"} />
        <CreateRatingModel />
      </div>

      <div>
        {allLeadUrlLoading && <TableScalaton />}
        {allLeadUrlError && <SomethingWrong />}
        {allLeadUrl && !allLeadUrlLoading && !allLeadUrlError && (
          <CommonTable
            data={allLeadUrl}
            columns={columns}
            scroll={{ y: 470 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default UserService
