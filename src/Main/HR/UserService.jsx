import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import UserListComponent from "../../Tables/UserListComponent"
import { useDispatch, useSelector } from "react-redux"
import { getAllRating } from "../../Toolkit/Slices/UserRatingSlice"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import CreateRatingModel from "../../Model/CreateRatingModel"
import { getAllSlugAction } from "../../Toolkit/Slices/LeadSlugSlice"
import { Link } from "react-router-dom"

const UserService = () => {
  const [hidebox, setHidebox] = useState(true)
  const [ratingDep, setRatingDep] = useState(false)
  const [myobjData, setmyObjData] = useState({})
  const [editRatingDep, setEditRatingDep] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSlugAction(0))
  }, [dispatch])

  const { allLeadUrl, allLeadUrlLoading, allLeadUrlError } = useSelector(
    (prev) => prev?.leadurls
  )

  console.log("all urls", allLeadUrl)

  // useEffect(() => {
  //   dispatch(getAllRating())
  // }, [ratingDep])

 

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
    {
      field: "urlsName",
      headerName: "Url's Name",
      width: 250,
      renderCell: (props) => {
        return <Link to={`${props?.row?.id}`}>{props?.row?.urlsName}</Link>
      },
    },
    { field: "quality", headerName: "Quality", width: 250 },
  ]

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All Service"} />
        <button
          className="team-edit-button create-user-btn"
          onClick={() => setHidebox((prev) => !prev)}
        >
          <i className="fa-solid mr-1 fa-circle-plus"></i>
        </button>
      </div>
      <CreateRatingModel
        editRatingDep={editRatingDep}
        myobjData={myobjData}
        hidebox={hidebox}
        setRatingDep={setRatingDep}
      />
      <div>
        {allLeadUrlLoading && <TableScalaton />}
        {allLeadUrlError && <SomethingWrong />}
        {allLeadUrl && !allLeadUrlLoading && !allLeadUrlError && (
          <UserListComponent
            tableName={""}
            columns={columns}
            row={allLeadUrl}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default UserService
