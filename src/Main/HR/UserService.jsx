import React, { useEffect } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import CreateRatingModel from "../../Model/CreateRatingModel"
import { getAllSlugAction } from "../../Toolkit/Slices/LeadSlugSlice"
import CommonTable from "../../components/CommonTable"
import { getAllUsers } from "../../Toolkit/Slices/UsersSlice"
import { getAllUrlAction } from "../../Toolkit/Slices/LeadUrlSlice"
import OverFlowText from "../../components/OverFlowText"
import { Typography } from "antd"
const { Text } = Typography

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
      render: (_, props) => (
        <OverFlowText linkText={true} to={`${props?.id}`}>
          {props?.urlsName}
        </OverFlowText>
      ),
    },
    {
      dataIndex: "quality",
      title: "Quality",
      render: (_, data) => <Text>{data?.quality ? "True" : "False"}</Text>,
    },
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
            scroll={{ y: 520 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default UserService
