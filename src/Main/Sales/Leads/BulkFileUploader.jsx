import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { Button, Input, Select, Typography, Upload, message } from "antd"
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
  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch])
  const props = {
    name: "file",
    multiple: true,
    action: "/leadService/api/v1/upload/uploadimageToFileSystem",
    defaultFileList: files,
    onChange(info) {
      console.log("infoModfakaklsls", info)
      setFiles(info?.fileList?.map((file) => file?.response))
      //   const { status } = info.file
      //   if (status !== "uploading") {
      //     console.log(info.file, info.fileList)
      //   }
      //   if (status === "done") {
      //     message.success(`${info.file.name} file uploaded successfully.`)
      //   } else if (status === "error") {
      //     message.error(`${info.file.name} file upload failed.`)
      //   }
    },
    onDrop(e) {
      console.log("infoModfakaklsls dropped", e)
    },
  }

  const onSubmit = useCallback(() => {
    let data = {
      leadId: leadid,
      userId: userid,
      message: text,
      file: files,
    }
    if (text !== "" && files?.length > 0) {
      dispatch(createRemakWithFile(data)).then(() => {
        setFlag(true)
        setFiles([])
        window.location.reload()
      })
    } else if (text !== "") {
      dispatch(createRemakWithFile(data)).then(() => {
        setFlag(true)
        setFiles([])
        window.location.reload()
      })
    } else {
      setFlag(false)
    }
  }, [leadid, userid, text, files, dispatch])

  return (
    <>
      {/* <Input.TextArea
        style={{ margin: "5px 0px" }}
        autoSize={{ minRows: 2, maxRows: 6 }}
        placeholder="Write captions for uploading files"
        onChange={(e) => setText(e.target.value)}
      /> */}
      <Select
        style={{ width: "100%", margin: "12px 0px" }}
        placeholder='select comment...'
        size="large"
        showSearch
        allowClear
        options={
          allComments?.map((item) => ({
            label: item?.name,
            value: item?.id,
          })) || []
        }
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        onChange={(e) => setText(e)}
      />
      {flag === false && (
        <Text type="danger">Please give the caption then submit</Text>
      )}
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon icon="fluent:document-add-20-filled" height={32} width={32} />
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
