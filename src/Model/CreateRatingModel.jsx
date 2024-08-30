import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUrlAction, getAllUrlList } from "../Toolkit/Slices/LeadUrlSlice"
import { addNewRating } from "../Toolkit/Slices/RatingSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Form, Modal, notification, Select } from "antd"
toast.configure()

const CreateRatingModel = ({ edit, urlRating, urlId }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const allLeadUrl = useSelector((state) => state.leadurls.allUrlList)
  const page = useSelector((state) => state.leadurls.page)
  useEffect(() => {
    dispatch(getAllUrlList())
  }, [dispatch])

  const { allUsers } = useSelector((prev) => prev?.user)
  const allStars = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ]

  const handleFinish = useCallback(
    (values) => {
      if (urlRating) {
        values.urlsManagmentId = urlId
      }
      dispatch(addNewRating(values))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Rating updated successfully",
            })
            dispatch(getAllUrlAction(page))
            form.resetFields()
            setOpenModal(false)
          } else if (response.meta.requestStatus === "rejected") {
            notification.error({ message: "Either user is already persent or empt" })
            setOpenModal(false)
          }
        })
        .catch((err) => {
          notification.error({ message: "Something went wrong" })
          setOpenModal(false)
        })
    },
    [urlId,dispatch,form,urlRating,page]
  )

  return (
    <>
      {!edit ? (
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add rating
        </Button>
      ) : (
        <Button onClick={() => setOpenModal(true)}>Edit rating</Button>
      )}
      <Modal
        title={edit ? "Edit rating" : "Add rating"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Select users"
            name="ratingsUser"
            rules={[{ required: true, message: "please select users" }]}
          >
            <Select
              showSearch
              allowClear
              mode="multiple"
              maxTagCount='responsive'
              options={
                allUsers?.length > 0
                  ? allUsers?.map((item) => ({
                      label: item?.fullName,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Number of rating"
            name="rating"
            rules={[{ required: true, message: "please select the rating" }]}
          >
            <Select
              showSearch
              allowClear
              options={allStars}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          {urlRating ? (
            ""
          ) : (
            <Form.Item
              label="Select url"
              name="urlsManagmentId"
              rules={[{ required: true, message: "please select urls" }]}
            >
              <Select
                showSearch
                allowClear
                options={
                  allLeadUrl?.length > 0
                    ? allLeadUrl?.map((item) => ({
                        label: item?.urlsName,
                        value: item?.id,
                      }))
                    : []
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default CreateRatingModel
