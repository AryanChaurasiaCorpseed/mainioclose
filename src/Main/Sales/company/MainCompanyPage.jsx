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
      fixed:'left',
      width:50
    },
    {
      dataIndex: "companyName",
      title: "Company name",
      fixed:'left',
      render: (_,props) => (
        <Link to={`${props?.companyId}/details`}>
          {props?.companyName}
        </Link>
      ),
    },
    {
      dataIndex: "gstNo",
      title: "GST number",
      renderCell: (_,props) => <ColComp data={props?.gstNo} />,
    },

    {
      dataIndex: "country",
      title: "Country",
      renderCell: (_,props) => <ColComp data={props?.country} />,
    },

    {
      dataIndex: "state",
      title: "State",
      renderCell: (_,props) => <ColComp data={props?.state} />,
    },

    {
      dataIndex: "city",
      title: "City",
      render: (_,props) => <ColComp data={props?.city} />,
    },

    {
      dataIndex: "address",
      title: "Address",
      render: (_,props) => <ColComp data={props?.address} />,
    },
  ]

  return (
    <TableOutlet>
      <MainHeading data={`ALL company`} />
      <div className="mt-3">
        {loadingCompany && <TableScalaton />}
        {errorCompany && <SomethingWrong />}
        {allCompnay && !loadingCompany && !errorCompany && (
          // <UserListComponent
          //   tableName={""}
          //   columns={columns}
          //   getRowId={(row) => row.companyId}
          //   row={allCompnay}
          // />
          <CommonTable
            data={allCompnay}
            columns={columns}
            scroll={{ x: 1200, y: 650 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default MainCompanyPage
