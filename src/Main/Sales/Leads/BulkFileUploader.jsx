import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import {
  Button,
  Input,
  Select,
  Space,
  Switch,
  Typography,
  Upload,
  notification,
} from "antd"
import "./BulkFileUpload.scss"
import { useDispatch, useSelector } from "react-redux"
import { createRemakWithFile } from "../../../Toolkit/Slices/LeadSlice"
import { useParams } from "react-router-dom"
import { getAllComments } from "../../../Toolkit/Slices/UserRatingSlice"
const { Dragger } = Upload
const { Text } = Typography

const BulkFileUploader = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.leads.remarkLoading)
  const allComments = useSelector((state) => state.rating.allComments)
  const { userid, leadid } = useParams()
  const [files, setFiles] = useState([])
  const [text, setText] = useState("")
  const [flag, setFlag] = useState(null)
  const [commentType, setCommentType] = useState("selected")
  const [inputCommentText, setInputCommentText] = useState("")
  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch])
  const props = {
    name: "file",
    multiple: true,
    action: "/leadService/api/v1/upload/uploadimageToFileSystem",
    defaultFileList: files,
    onChange(info) {
      setFiles(info?.fileList?.map((file) => file?.response))
    },
    onDrop(e) {
    },
  }

  const onSubmit = useCallback(() => {
    let data = {
      leadId: leadid,
      userId: userid,
      type: commentType,
      message: commentType === "input" ? inputCommentText : text,
      file: files,
    }
    if (text !== "" && files?.length > 0) {
      dispatch(createRemakWithFile(data))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Remark added successfully" })
            setFlag(true)
            setFiles([])
            dispatch(getAllComments())
          } else {
            notification.error({ message: "Something went wrong" })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong" })
        })
    } else if (text !== "") {
      dispatch(createRemakWithFile(data))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Remark added successfully" })
            setFlag(true)
            setFiles([])
            dispatch(getAllComments())
          } else {
            notification.error({ message: "Something went wrong" })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong" })
        })
    } else {
      setFlag(false)
    }
  }, [leadid, userid, text, files, dispatch, inputCommentText, commentType])

  return (
    <>
      <Space>
        <Switch
          size="small"
          onChange={(e) =>
            e ? setCommentType("input") : setCommentType("selected")
          }
        />
        <Text>
          {commentType === "input" ? "Select the comment" : "Write comment"}
        </Text>
      </Space>
      {commentType === "input" ? (
        <Input.TextArea
          style={{ width: "100%", margin: "12px 0px" }}
          size="large"
          placeholder="write comment here ..."
          autoSize={{ minRows: 1, maxRows: 2 }}
          onChange={(e) => setInputCommentText(e.target.value)}
        />
      ) : (
        <Select
          style={{ width: "100%", margin: "12px 0px" }}
          placeholder="select comment..."
          size="large"
          showSearch
          allowClear
          options={
            allComments?.map((item) => ({
              label: item?.name,
              value: item?.name,
            })) || []
          }
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
          onChange={(e) => setText(e)}
        />
      )}

      {flag === false && (
        <Text type="danger">Please give the caption then submit</Text>
      )}
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon icon="fluent:document-add-20-regular" height={32} width={32} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <div className="dragger-submit-btn">
        <Button
          type="primary"
          loading={loading === "pending" ? true : false}
          onClick={onSubmit}
        >
          {" "}
          Submit
        </Button>
      </div>
    </>
  )
}

export default BulkFileUploader
