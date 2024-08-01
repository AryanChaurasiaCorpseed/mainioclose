import React, { useEffect } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import { getCompanyAction } from "../../../Toolkit/Slices/CompanySlice"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import ColComp from "../../../components/small/ColComp"
import UserListComponent from "../../../Tables/UserListComponent"
import { Link } from "react-router-dom"
import CommonTable from "../../../components/CommonTable"

const MainCompanyPage = () => {
  const dispatch = useDispatch()

  const currUserId = useSelector((prev) => prev?.auth?.currentUser?.id)

  useEffect(() => {
    dispatch(getCompanyAction({ id: currUserId }))
  }, [])

  const { allCompnay, loadingCompany, errorCompany } = useSelector(
    (prev) => prev?.company
  )

  const columns = [
    {
      dataIndex: "companyId",
      title: "Id",
      fixed: "left",
      width: 50,
    },
    {
      dataIndex: "companyName",
      title: "Company name",
      fixed: "left",
      render: (_, props) => (
        <Link className="link-heading" to={`${props?.companyId}/details`}>{props?.companyName}</Link>
      ),
    },
    {
      dataIndex: "assignee",
      title: "Assignee",
      render: (_, props) => (
        <ColComp data={props?.assignee?.fullName} />
      ),
    },
    {
      dataIndex: "gstNo",
      title: "GST number",
      render: (_, props) => <ColComp data={props?.gstNo} />,
    },
    {
      dataIndex: "gstType",
      title: "GST type",
      render: (_, props) => <ColComp data={props?.gstType} />,
    },
    {
      dataIndex: "address",
      title: "Address",
      render: (_, props) => <ColComp data={props?.address} />,
    },
    {
      dataIndex: "city",
      title: "City",
      render: (_, props) => <ColComp data={props?.city} />,
    },
    {
      dataIndex: "state",
      title: "State",
      render: (_, props) => <ColComp data={props?.state} />,
    },

    {
      dataIndex: "country",
      title: "Country",
      render: (_, props) => <ColComp data={props?.country} />,
    },
    {
      dataIndex: "secAddress",
      title: "Secondary address",
      render: (_, props) => <ColComp data={props?.secAddress} />,
    },
    {
      dataIndex: "secCity",
      title: "Secondary city",
      render: (_, props) => <ColComp data={props?.secCity} />,
    },
    {
      dataIndex: "secState",
      title: "Secondary state",
      render: (_, props) => <ColComp data={props?.secState} />,
    },
    {
      dataIndex: "seCountry",
      title: "Secondary country",
      render: (_, props) => <ColComp data={props?.seCountry} />,
    }
  ]

  return (
    <TableOutlet>
      <MainHeading data={`ALL company`} />
      <div className="mt-3">
        {loadingCompany && <TableScalaton />}
        {errorCompany && <SomethingWrong />}
        {allCompnay && !loadingCompany && !errorCompany && (
          <CommonTable
            data={allCompnay}
            columns={columns}
            scroll={{ x: 2200, y: 520 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default MainCompanyPage
