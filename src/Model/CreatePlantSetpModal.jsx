import { Button, Form, Modal, notification, Select, Switch } from "antd"
import React, { useCallback, useState } from "react"
import {
  createPlantSetup,
  getAllSlugAction,
} from "../Toolkit/Slices/LeadSlugSlice"
import { useDispatch, useSelector } from "react-redux"
import { Icon } from "@iconify/react"

const CreatePlantSetpModal = ({ data, paginationData }) => {
  const [form1] = Form.useForm()
  const dispatch = useDispatch()
  const slugList = useSelector((state) => state.leadslug.slugList)
  const [openModal1, setOpenModal1] = useState(false)

  const handleOpenModal = useCallback(() => {
    setOpenModal1(true)
    form1.setFieldsValue({
      slugId: data?.slugList?.map((item) => item?.id),
      flag: data?.isPlantSetup,
    })
  }, [data, form1])

  const handlePlantSubmit = useCallback(
    (values) => {
      values.id = data?.id
      values.slugId = values?.flag === false ? null : values?.slugId
      dispatch(createPlantSetup(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Plant slug updated successfully" })
            dispatch(
              getAllSlugAction({
                page: paginationData?.page,
                size: paginationData?.size,
              })
            )
            setOpenModal1(false)
          } else {
            notification.success({ message: "Something went wrong" })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong" }))
    },
    [data, dispatch, paginationData]
  )
  return (
    <div>
      <Button type="text" size="small" onClick={handleOpenModal}>
        {data?.isPlantSetup ? (
          <Icon icon="fluent:edit-24-regular" />
        ) : (
          <Icon icon="fluent:add-16-filled" />
        )}
      </Button>
      <Modal
        title="Create plant setup"
        open={openModal1}
        onCancel={() => setOpenModal1(false)}
        onClose={() => setOpenModal1(false)}
        okText="Submit"
        onOk={() => form1.submit()}
      >
        <Form form={form1} onFinish={handlePlantSubmit} layout="vertical">
          <Form.Item
            label="Plant status"
            name="flag"
            rules={[{ required: true, message: "please switch the button" }]}
          >
            <Switch size="small" />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.flag !== currentValues.flag
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("flag") && (
                  <>
                    <Form.Item
                      label="Select slug"
                      name="slugId"
                      rules={[
                        { required: true, message: "Please select slug" },
                      ]}
                    >
                      <Select
                        allowClear
                        mode="multiple"
                        maxTagCount="responsive"
                        showSearch
                        options={
                          slugList?.length
                            ? slugList?.map((item) => ({
                                label: item?.name,
                                value: item?.id,
                              }))
                            : []
                        }
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreatePlantSetpModal
