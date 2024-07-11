import React, { useEffect, useState } from "react"
import LongInput from "../../../components/Inputs/LongInput"
import SmOneBtn from "../../../components/button/SmOneBtn"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllSlugAction,
  handleNextPagination,
  handlePrevPagination,
  leadSlugAction,
} from "../../../Toolkit/Slices/LeadSlugSlice"
import TableBoot from "../../../components/tablesData/TableBoot"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EditSlugModal from "../../../Model/EditSlugModal"
import { Button, Form, Input } from "antd"
import CommonTable from "../../../components/CommonTable"
toast.configure()

const SlugCreate = () => {
  const [slugDep, setSlugDep] = useState(false)
  const page = useSelector((state) => state.leadslug.page)

  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(getAllSlugAction(page))
  }, [dispatch, slugDep, page])

  const { allLeadSlug, allLeadSlugLoading, allLeadSlugError } = useSelector(
    (prev) => prev?.leadslug
  )

  const handleSubmit = async (values) => {
    const slugCreation = await dispatch(leadSlugAction(values?.slugName))
    if ((slugCreation.type = "createLeadSlugData/fulfilled")) {
      form.resetFields()
      setSlugDep((prev) => !prev)
      toast.success("Slug Created Succesfully")
    }
  }

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Edit",
      name: "edit",
      render: (_, data) => <EditSlugModal data={data} />,
    },
  ]

  return (
    <div>
      <MainHeading data={`Slug Create`} />
      <div className="lead-box">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Enter slug name"
            name="slugName"
            rules={[{ required: true, message: "please enter slug name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <CommonTable
        columns={columns}
        data={allLeadSlug}
        nextPage={handleNextPagination}
        prevPage={handlePrevPagination}
        pagination={true}
        scroll={{ y: 345 }}
        prevDisable={page === 0 && true}
        nextDisable={allLeadSlug?.length < 50 && true}
      />
    </div>
  )
}

export default SlugCreate
