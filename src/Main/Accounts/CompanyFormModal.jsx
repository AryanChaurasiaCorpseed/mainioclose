import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Switch,
  Upload,
} from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import {
  createCompanyForm,
  getCompanyByUnitId,
  getCompanyDetailsByGst,
  getCompanyDetailsByLeadId,
  getCompanyUnitsById,
  getContactById,
} from "../../Toolkit/Slices/LeadSlice"
import { getAllUsers } from "../../Toolkit/Slices/UsersSlice"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"

const CompanyFormModal = ({ edit, data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const companyDetails = useSelector(
    (state) => state?.leads?.companyDetailsById
  )
  const { allUsers } = useSelector((prev) => prev?.user)
  const companyUnits = useSelector((state) => state?.leads?.companyUnits)
  const companyDetailByUnitId = useSelector(
    (state) => state?.leads?.companyDetailByUnitId
  )
  const contactList = useSelector((state) => state?.leads?.allContactList)
  const contactDetail = useSelector((state) => state?.leads?.contactDetail)
  const [openModal, setOpenModal] = useState(false)
  const [formLoading, setFormLoading] = useState("")

  const handleButtonClick = useCallback(() => {
    dispatch(getCompanyDetailsByLeadId(data?.id)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        if (Object.keys(resp.payload)?.length > 0) {
          form.setFieldsValue({
            companyId: resp?.payload.name,
            isUnit: false,
          })
          dispatch(getCompanyUnitsById(resp?.payload?.id))
        } else {
          form.setFieldsValue({ isUnit: true })
        }
      }
    })
    setOpenModal(true)
  }, [form, data, dispatch])

  const validateGstNumber = (dispatch) => async (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter the email"))
    }
    try {
      const resp = await dispatch(getCompanyDetailsByGst(value))
      if (resp.meta.requestStatus === "fulfilled") {
        const temp = resp?.payload
        if (temp?.length === 0) {
          return Promise.resolve()
        } else {
          return Promise.reject(
            new Error("company already exist with this gst")
          )
        }
      } else {
        return Promise.reject(new Error("Error validating gst"))
      }
    } catch (error) {
      return Promise.reject(new Error("Error validating gst"))
    }
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleSetFields = useCallback(
    (checked) => {
      if (checked) {
        const formFieldValue = form.getFieldsValue([
          "address",
          "city",
          "state",
          "country",
          "isUnit",
          "secondaryContact",
          "primaryContact",
          "contactName",
          "contactEmails",
          "contactNo",
          "contactWhatsappNo",
          "contactId",
        ])
        if (
          !formFieldValue?.primaryContact &&
          formFieldValue?.secondaryContact
        ) {
          form.setFieldsValue({
            sContactName: contactDetail?.name,
            sContactEmails: contactDetail?.emails,
            sContactNo: contactDetail?.contactNo,
            sContactWhatsappNo: contactDetail?.whatsappNo,
          })
        } else if (
          !formFieldValue?.primaryContact &&
          formFieldValue?.secondaryContact
        ) {
          form.setFieldsValue({
            sContactName: formFieldValue?.contactName,
            sContactEmails: formFieldValue?.contactEmails,
            sContactNo: formFieldValue?.contactNo,
            sContactWhatsappNo: formFieldValue?.contactWhatsappNo,
          })
        }

        if (formFieldValue?.isUnit && formFieldValue?.secondaryContact) {
          form.setFieldsValue({
            sAddress: companyDetailByUnitId?.address,
            sCity: companyDetailByUnitId?.city,
            sState: companyDetailByUnitId?.state,
            sCountry: companyDetailByUnitId?.country,
          })
        } else if (
          !formFieldValue?.isUnit &&
          formFieldValue?.secondaryContact
        ) {
          form.setFieldsValue({
            sAddress: formFieldValue?.address,
            sCity: formFieldValue?.city,
            sState: formFieldValue?.state,
            sCountry: formFieldValue?.country,
          })
        }
      } else {
        // form.resetFields([
        //   "getsContactName",
        //   "getsContactEmails",
        //   "getsContactNo",
        //   "getsContactWhatsappNo",
        // ])
      }
    },
    [form, contactDetail, companyDetailByUnitId]
  )

  const handleFinish = (values) => {
    setFormLoading("pending")
    const formData = form.getFieldsValue(["companyId", "companyName"])
    values.leadId = data?.id
    values.isPresent = true
    values.gstDocuments = values.gstDocuments?.[0]?.response
    if (formData?.companyId) {
      values.companyId = companyDetails?.id
    }
    dispatch(createCompanyForm(values))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setFormLoading("success")
          dispatch(getAllUsers())
          notification.success({ message: "Company created successfully" })
          setOpenModal(false)
        } else {
          setFormLoading("rejected")
          notification.error({ message: "Something went wrong" })
        }
      })
      .catch(() => {
        setFormLoading("rejected")
        notification.error({ message: "Something went wrong" })
      })
  }
  return (
    <>
      <Button type="text" size="small" onClick={handleButtonClick}>
        <Icon icon="fluent:edit-20-regular" />
      </Button>

      <Modal
        title={"Create company"}
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
        okButtonProps={{
          loading: formLoading === "pending" ? true : false,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ maxHeight: "75vh", overflow: "auto" }}
          scrollToFirstError
          onFinish={handleFinish}
          initialValues={{ primaryContact: false, isUnit: false }}
        >
          {Object.keys(companyDetails)?.length > 0 ? (
            <Form.Item
              label="Company name"
              name="companyId"
              rules={[
                { required: true, message: "please enter the company name" },
              ]}
            >
              <Input disabled />
            </Form.Item>
          ) : (
            <Form.Item
              label="Company name"
              name="companyName"
              rules={[
                { required: true, message: "please enter the company name" },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Company age"
            name="companyAge"
            rules={[{ required: true, message: "please enter company age" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gst type"
            name="gstType"
            rules={[{ required: true, message: "please select the gst type" }]}
          >
            <Select
              showSearch
              allowClear
              options={[
                { label: "Register", value: "Register" },
                { label: "Unregister", value: "Unregister" },
                { label: "SE2", value: "SE2" },
                { label: "International", value: "International" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Gst number"
            name="gstNo"
            rules={[
              {
                required: true,
                message: "",
              },
              {
                validator: validateGstNumber(dispatch),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload gst document"
            name="gstDocuments"
            getValueFromEvent={normFile}
            valuePropName="fileList"
          >
            <Upload
              action="/leadService/api/v1/upload/uploadimageToFileSystem"
              listType="text"
            >
              <Button>
                <Icon
                  icon="fluent:arrow-upload-20-filled"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                />{" "}
                Upload
              </Button>
            </Upload>
          </Form.Item>

          {Object.keys(companyDetails)?.length > 0 && (
            <>
              <Form.Item
                label="New units"
                name="isUnit"
                rules={[{ required: true }]}
              >
                <Switch size="small" />
              </Form.Item>

              <Form.Item
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.isUnit !== currentValues.isUnit
                }
                noStyle
              >
                {({ getFieldValue }) => (
                  <>
                    {getFieldValue("isUnit") ? (
                      <Form.Item
                        label="Enter new company unit"
                        name="unitName"
                        rules={[
                          {
                            required: true,
                            message: "please enter the company unit",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        label="Select company unit"
                        name="unitId"
                        rules={[
                          {
                            required: true,
                            message: "please select company unit",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          allowClear
                          onChange={(e) => dispatch(getCompanyByUnitId(e))}
                          options={
                            companyUnits?.length > 0
                              ? companyUnits?.map((item) => ({
                                  label: item?.companyName,
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
                    )}
                  </>
                )}
              </Form.Item>
            </>
          )}

          {Object.keys(companyDetails)?.length === 0 && (
            <Form.Item
              label="Select assignee"
              name="assigneeId"
              rules={[{ required: true, message: "please select assignee" }]}
            >
              <Select
                showSearch
                allowClear
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
          )}

          <Form.Item
            label="Pan number"
            name="panNo"
            rules={[{ required: true, message: "please enter the pan number" }]}
          >
            <Input />
          </Form.Item>

          <Divider style={{ color: "#cccccc" }} orientation="center">
            Primary details
          </Divider>

          <Form.Item
            label="New contact details"
            name="primaryContact"
            rules={[{ required: true }]}
          >
            <Switch size="small" />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.primaryContact !== currentValues.primaryContact
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("primaryContact") ? (
                  <>
                    <Form.Item
                      label="Contact name"
                      name="contactName"
                      rules={[
                        {
                          required: true,
                          message: "please enter contact person name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="contactEmails"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "please enter the email id",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Contact number"
                      name="contactNo"
                      rules={[
                        {
                          required: true,
                          message: "please enter contact number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Whatsapp number"
                      name="contactWhatsappNo"
                      rules={[
                        {
                          required: true,
                          message: "please enter whatsapp number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item
                    label="Select contact"
                    name="contactId"
                    rules={[
                      { required: true, message: "please select contact" },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      onChange={(e) => dispatch(getContactById(e))}
                      options={
                        contactList?.length > 0
                          ? contactList?.map((item) => ({
                              label: `${item?.emails} || ${item?.contactNo} `,
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
              </>
            )}
          </Form.Item>

          <Form.Item
            label="Primary address"
            name="address"
            rules={[{ required: true, message: "please enter the address" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "please enter the city" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "please enter the state" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "please enter the country" }]}
          >
            <Input />
          </Form.Item>

          <Divider style={{ color: "#cccccc" }} orientation="center">
            Secondary details
          </Divider>

          <Form.Item label="Same as primary details" name="secondaryContact">
            <Switch size="small" onChange={handleSetFields} />
          </Form.Item>

          <Form.Item label="Contact name" name="sContactName">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="sContactEmails">
            <Input />
          </Form.Item>

          <Form.Item label="Contact number" name="sContactNo">
            <Input />
          </Form.Item>

          <Form.Item label="Whatsapp number" name="sContactWhatsappNo">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="sAddress">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="City" name="sCity">
            <Input />
          </Form.Item>

          <Form.Item label="State" name="sState">
            <Input />
          </Form.Item>

          <Form.Item label="Country" name="sCountry">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CompanyFormModal
