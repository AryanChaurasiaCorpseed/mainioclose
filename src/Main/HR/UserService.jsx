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
import { Button, Form, Modal, Select } from "antd"
import CommonTable from "../../components/CommonTable"
import { Icon } from "@iconify/react"
import { getAllUsers } from "../../Toolkit/Slices/UsersSlice"

const UserService = () => {
  const [form] = Form.useForm()
  const [hidebox, setHidebox] = useState(true)
  const [openModal, setOpenModal] = useState(false)
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

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const { allUsers, userLoading, userError } = useSelector((prev) => prev?.user)

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
        <Button type="primary" onClick={() => setHidebox((prev) => !prev)}>
          <Icon icon="fluent:add-20-filled" /> Add
        </Button>
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
          // <UserListComponent
          //   tableName={""}
          //   columns={columns}
          //   row={allLeadUrl}
          // />
          <CommonTable
            data={allLeadUrl}
            columns={columns}
            scroll={{ y: 550 }}
            rowSelection={true}
          />
        )}
      </div>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Number of rating" name="rating">
            <Select
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Select url name" name="urlsManagmentId">
            <Select
              showSearch
              allowClear
              options={
                allLeadUrl?.map((item) => ({
                  label: item?.urlsName,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label="Select user" name="ratingsUser">
            <Select
              showSearch
              allowClear
              options={
                allUsers?.map((ele) => ({
                  label: ele?.fullName,
                  value: ele?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </TableOutlet>
  )
}

export default UserService
