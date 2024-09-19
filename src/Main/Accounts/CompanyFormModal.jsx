import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Switch,
  Upload,
} from "antd"
import React, { useCallback, useState } from "react"
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
import {
  getAllCompanyByStatus,
  getCompanyDetailsById,
  updateCompanyForm,
} from "../../Toolkit/Slices/CompanySlice"
import { useParams } from "react-router-dom"
import {
  getHighestPriorityRole,
  playErrorSound,
  playSuccessSound,
  playWarningSound,
} from "../Common/Commons"

const CompanyFormModal = ({
  edit,
  data,
  editInfo,
  selectedFilter,
  detailView,
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { userid } = useParams()
  const companyDetails = useSelector(
    (state) => state?.leads?.companyDetailsById
  )
  const allUsers = useSelector((state) => state.user.allUsers)
  const companyUnits = useSelector((state) => state?.leads?.companyUnits)
  const companyDetailByUnitId = useSelector(
    (state) => state?.leads?.companyDetailByUnitId
  )
  const currentRoles = useSelector((state) => state?.auth?.roles)
  const contactList = useSelector((state) => state?.leads?.allContactList)
  const contactDetail = useSelector((state) => state?.leads?.contactDetail)
  const companyDetail = useSelector((state) => state?.company?.companyDetail)
  const page = useSelector((state) => state.company.page)
  const [openModal, setOpenModal] = useState(false)
  const [formLoading, setFormLoading] = useState("")
  const [gstMand, setGstMand] = useState("")
  const [newPrimaryAddress, setNewPrimaryAddress] = useState(
    Object.keys(companyDetails)?.length === 0 ? true : false
  )
  const [newSecondaryAddress, setNewSecondaryAddress] = useState(
    Object.keys(companyDetails)?.length === 0 ? true : false
  )

  const handlePanNumberChange = (e) => {
    const value = e.target.value
    const upperCaseValue = value.toUpperCase()
    const isValid = /^[A-Z0-9]+$/.test(upperCaseValue)
    form.setFieldsValue({ panNo: isValid ? upperCaseValue : value })
  }

  const handleButtonClick = useCallback(() => {
    dispatch(
      getCompanyDetailsByLeadId(data?.id ? data?.id : data?.leadId)
    ).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        if (Object.keys(resp.payload)?.length > 0) {
          if (resp.payload.assignee?.id != userid) {
            playWarningSound()
            notification.warning({
              message: `This lead is already assigned to "${resp?.payload?.assignee?.fullName}" for company id "${resp?.payload?.id}" company name " ${resp?.payload?.name}"`,
            })
          } else {
            form.setFieldsValue({
              companyId: resp?.payload.name,
              isUnit: false,
            })
            dispatch(getCompanyUnitsById(resp?.payload?.id))
            setOpenModal(true)
          }
        } else {
          form.setFieldsValue({ isUnit: true })
          setOpenModal(true)
        }
      } else {
        setOpenModal(true)
      }
    })
  }, [form, data, dispatch, userid])

  function getFileName(file) {
    if (file) {
      let temp = file?.split("/")
      return temp[temp?.length - 1]
    }
  }

  const handleEditBtnClick = useCallback(() => {
    if (editInfo?.id !== undefined) {
      dispatch(getCompanyDetailsById(editInfo?.id)).then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          let editData = resp?.payload
          form.setFieldsValue({
            isPresent: editData?.isPresent,
            companyName: editData?.companyName,
            companyId: editData?.companyId,
            isUnit: editData?.isUnit,
            unitName: editData?.unitName,
            unitId: editData?.unitId,
            panNo: editData?.panNo,
            gstNo: editData?.gstNo,
            gstType: editData?.gstType,
            gstDocuments: [
              {
                uid: "-1",
                name: getFileName(editData?.gstDocuments),
                status: "done",
                response: editData?.gstDocuments,
              },
            ],
            companyAge: editData?.companyAge,
            primaryPinCode: editData?.primaryPinCode,
            secondaryPinCode: editData?.secondaryPinCode,
            assigneeId: editData?.assigneeId,
            contactId: editData?.contactId,
            contactName: editData?.contactName,
            contactEmails: editData?.contactEmails,
            contactNo: editData?.contactNo,
            contactWhatsappNo: editData?.contactWhatsappNo,
            updatedBy: editData?.updatedBy?.id,
            state: editData?.state,
            address: editData?.address,
            country: editData?.country,
            primaryContact: editData?.primaryContact,
            city: editData?.city,
            secondaryContact: editData?.secondaryContact,
            scountry: editData?.scountry,
            saddress: editData?.saddress,
            sstate: editData?.sstate,
            scontactEmails: editData?.scontactEmails,
            scontactNo: editData?.scontactNo,
            scontactName: editData?.scontactName,
            scity: editData?.scity,
            scontactId: editData?.scontactId,
            scontactWhatsappNo: editData?.scontactWhatsappNo,
            amount: editData?.amount,
            comment: editData?.comment,
            secondaryDesignation: editData?.secondaryDesignation,
            primaryDesignation: editData?.primaryDesignation,
          })
        }
      })
      setOpenModal(true)
    }
  }, [dispatch, editInfo, form])

  const validateGstNumber = (dispatch) => async (_, value) => {
    if (!value) {
      return Promise.reject(new Error("please enter the GST number"))
    }

    const pattern = /^[a-zA-Z0-9]{15}$/
    if (!pattern.test(value)) {
      return Promise.reject(
        new Error("please enter 15 digit alphanumeric characters")
      )
    }
    try {
      const resp = await dispatch(getCompanyDetailsByGst(value))
      if (resp.meta.requestStatus === "fulfilled") {
        const temp = resp?.payload
        if (temp?.length === 0) {
          return Promise.resolve()
        } else {
          return Promise.reject(
            new Error("company already exists with this GST number")
          )
        }
      } else {
        return Promise.reject(new Error("error validating GST"))
      }
    } catch (error) {
      return Promise.reject(new Error("error validating GST"))
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
          formFieldValue?.primaryContact &&
          formFieldValue?.secondaryContact
        ) {
          form.setFieldsValue({
            sContactName: formFieldValue?.contactName,
            sContactEmails: formFieldValue?.contactEmails,
            sContactNo: formFieldValue?.contactNo,
            sContactWhatsappNo: formFieldValue?.contactWhatsappNo,
            sAddress: formFieldValue?.address,
            sCity: formFieldValue?.city,
            sState: formFieldValue?.state,
            sCountry: formFieldValue?.country,
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

  const handleFinish = useCallback(
    (values) => {
      values.gstDocuments = values.gstDocuments?.[0]?.response
      setFormLoading("pending")
      if (edit) {
        values.companyFormId = companyDetail?.id
        values.isPresent = companyDetail?.isPresent
        values.leadId = companyDetail?.lead?.id
        values.companyId = companyDetail?.companyId
        values.assigneeId =
          getHighestPriorityRole(currentRoles) === "ADMIN"
            ? values?.assigneeId
            : userid
        dispatch(updateCompanyForm(values))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              setFormLoading("success")
              playSuccessSound()
              dispatch(
                getAllCompanyByStatus({
                  id: userid,
                  status: selectedFilter,
                  page,
                })
              )
              notification.success({ message: "Company created successfully." })
              setOpenModal(false)
            } else {
              setFormLoading("rejected")
              playErrorSound()
              notification.error({ message: "Something went wrong !." })
            }
          })
          .catch(() => {
            setFormLoading("rejected")
            playErrorSound()
            notification.error({ message: "Something went wrong !." })
          })
      } else {
        const formData = form.getFieldsValue(["companyId", "companyName"])
        values.leadId = data?.id ? data?.id : data?.leadId
        if (Object.keys(companyDetails)?.length > 0) {
          values.isPresent = true
        } else {
          values.isPresent = false
        }
        if (formData?.companyId) {
          values.companyId = companyDetails?.id
        }
        dispatch(createCompanyForm(values))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              setFormLoading("success")
              dispatch(getAllUsers())
              notification.success({ message: "Company created successfully." })
              playSuccessSound()
              setOpenModal(false)
            } else {
              setFormLoading("rejected")
              playErrorSound()
              notification.error({ message: "Something went wrong !." })
            }
          })
          .catch(() => {
            setFormLoading("rejected")
            playErrorSound()
            notification.error({ message: "Something went wrong !." })
          })
      }
    },
    [
      companyDetails,
      dispatch,
      form,
      data,
      companyDetail,
      userid,
      selectedFilter,
      edit,
    ]
  )

  return (
    <>
      {edit ? (
        <Button type="text" size="small" onClick={handleEditBtnClick}>
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ) : detailView ? (
        <Button size="small" type="primary" onClick={handleButtonClick}>
          <Icon icon="fluent:add-24-filled" />
          Add company
        </Button>
      ) : (
        <Button type="text" size="small" onClick={handleButtonClick}>
          <Icon icon="fluent:add-24-filled" height={18} width={18} />
        </Button>
      )}

      <Modal
        title={edit ? "Edit company details" : "Create company"}
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
          initialValues={{
            primaryContact: false,
            isUnit: false,
            secondaryContact: false,
          }}
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
                { label: "Registered", value: "Registered" },
                { label: "Unregisterded", value: "Unregistered" },
                { label: "SE2", value: "SE2" },
                { label: "International", value: "International" },
              ]}
              onChange={(e) => setGstMand(e)}
            />
          </Form.Item>

          <Form.Item
            label="Gst number"
            name="gstNo"
            rules={
              gstMand === "Registered" || gstMand === ""
                ? [
                    {
                      required: true,
                      message: "",
                    },
                    {
                      validator: validateGstNumber(dispatch),
                    },
                  ]
                : []
            }
          >
            <Input maxLength={15} />
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
              <Button size="small">
                <Icon icon="fluent:arrow-upload-20-filled" /> Upload
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
                    ) : (
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
                    )}
                  </>
                )}
              </Form.Item>
            </>
          )}

          {Object.keys(companyDetails)?.length === 0 &&
            getHighestPriorityRole(currentRoles) === "ADMIN" && (
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
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your PAN card number",
            //   },
            //   {
            //     pattern: /^[A-Z0-9]{10}$/,
            //     message:
            //       "Invalid PAN card number, should not accept any special charcter ",
            //   },
            // ]}
          >
            <Input maxLength={10} onChange={handlePanNumberChange} />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input />
          </Form.Item>

          <Divider style={{ color: "#cccccc" }} orientation="center">
            Primary details
          </Divider>

          <Form.Item
            label="New primary contact details"
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
                      label="Desigination"
                      name="primaryDesignation"
                      rules={[
                        {
                          required: true,
                          message: "please enter desigination",
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

          <Form.Item label="Add new primary address">
            <Switch
              size="small"
              value={newPrimaryAddress}
              checked={newPrimaryAddress}
              disabled={Object.keys(companyDetails)?.length > 0 ? false : true}
              onChange={(e) => setNewPrimaryAddress(e)}
            />
          </Form.Item>

          {newPrimaryAddress && (
            <>
              <Form.Item
                label="Primary address"
                name="address"
                rules={[
                  { required: true, message: "please enter the address" },
                ]}
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
                rules={[
                  { required: true, message: "please enter the country" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="PinCode"
                name="primaryPinCode"
                rules={[{ required: true, message: "please enter pincode" }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Divider style={{ color: "#cccccc" }} orientation="center">
            Secondary details
          </Divider>

          {/* 
          <Form.Item label="Same as primary details" name="secondaryContact">
            <Switch size="small" onChange={handleSetFields} />
          </Form.Item> */}

          <Form.Item
            label="New secondary contact details"
            name="secondaryContact"
            rules={[{ required: true }]}
          >
            <Switch size="small" />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.secondaryContact !== currentValues.secondaryContact
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("secondaryContact") ? (
                  <>
                    <Form.Item
                      label="Contact name"
                      name="scontactName"
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
                      label="Desigination"
                      name="secondaryDesignation"
                      rules={[
                        {
                          required: true,
                          message: "please enter desigination",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="scontactEmails"
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
                      name="scontactNo"
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
                      name="scontactWhatsappNo"
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
                    name="scontactId"
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

          <Form.Item label="Add new secondary address">
            <Switch
              size="small"
              value={newSecondaryAddress}
              checked={newSecondaryAddress}
              disabled={Object.keys(companyDetails)?.length > 0 ? false : true}
              onChange={(e) => setNewSecondaryAddress(e)}
            />
          </Form.Item>

          {newSecondaryAddress && (
            <>
              <Form.Item label="Address" name="saddress">
                <Input.TextArea />
              </Form.Item>

              <Form.Item label="City" name="scity">
                <Input />
              </Form.Item>

              <Form.Item label="State" name="sstate">
                <Input />
              </Form.Item>

              <Form.Item label="Country" name="scountry">
                <Input />
              </Form.Item>

              <Form.Item label="PinCode" name="secondaryPinCode">
                <Input />
              </Form.Item>
            </>
          )}
          {edit && (
            <Form.Item
              label="Comment"
              name="comment"
              rules={[{ required: true, message: "please write the comment " }]}
            >
              <Input.TextArea />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default CompanyFormModal
