import { Avatar, Button, Drawer, Modal, Popover, Space, Typography } from "antd"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutFun } from "../Toolkit/Slices/AuthSlice"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { updateProfilePhoto } from "../Toolkit/Slices/UserProfileSlice"
import { toast } from "react-toastify"
import "./ProfileDrawer.scss"
import { Icon } from "@iconify/react"
import { Upload } from "antd"
import ImgCrop from "antd-img-crop"
const { Text, Title } = Typography

const ProfileDrawer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state.auth?.currentUser?.id)
  const profilePhoto = useSelector((state) => state.profile.profilePhoto)
  const currentUserProfile = useSelector((state) => state?.auth?.currentUser)
  const [openModal, setOpenModal] = useState()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [fileList, setFileList] = useState([])

  const logoutUser = () => {
    if (window.confirm("Are you sure for Logout?") === true) {
      const key = localStorage.getItem("persist:root")
      dispatch(logoutFun())
      const token = localStorage.removeItem(key)
      navigate("/erp/login")
      toast.success("Logout Succesfully")
    }
  }

  const onChange = useCallback(
    ({ fileList: newFileList }) => {
      if (newFileList !== undefined) {
        const data = {
          userId: currentUserId,
          profilePhoto: newFileList?.[0]?.response,
        }
        dispatch(updateProfilePhoto(data))
        setFileList(newFileList)
      }
    },
    [currentUserId]
  )

  useEffect(() => {
    if (fileList?.[0]?.response) {
      setOpenModal(false)
      window.location.reload()
    }
  }, [fileList])

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  console.log("sdxckvgosdghvouasdyhgoviu", currentUserProfile)

  return (
    <>
      <div className="user-profile">
        <div className="profile-info">
          <h4>
            {currentUserProfile?.username
              ? currentUserProfile?.username
              : "UserName"}
          </h4>
        </div>

        <div className="profile-image" onClick={() => setOpenDrawer(true)}>
          <Avatar size={32} src={profilePhoto} alt="profile_photo">
            {profilePhoto
              ? ""
              : currentUserProfile?.username?.toUpperCase()?.[0]}
          </Avatar>
        </div>
      </div>
      <Drawer
        title="User profile"
        open={openDrawer}
        placement="left"
        onClose={() => setOpenDrawer(false)}
        width={300}
        closeIcon={false}
      >
        <div className="profile-container">
          {!openModal ? (
            <div className="avatar-container">
              <Avatar src={profilePhoto} size={62} className="avatar">
                {profilePhoto
                  ? ""
                  : currentUserProfile?.username?.toUpperCase()?.[0]}
              </Avatar>
              <div className="edit-icon" onClick={() => setOpenModal(true)}>
                <Icon icon="fluent:camera-20-regular" />
              </div>
            </div>
          ) : (
            <ImgCrop rotationSlider>
              <Upload
                action="/leadService/api/v1/upload/uploadimageToFileSystem"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          )}
          <Space
            direction="vertical"
            size={0}
            className="profile-text-container"
          >
            <Text strong>
              {currentUserProfile?.username
                ? currentUserProfile?.username
                : "UserName"}
            </Text>
            <Text>
              {currentUserProfile?.email
                ? `${currentUserProfile?.email}`
                : "Email"}
            </Text>
            <Text type="secondary">User Id: ERP00{currentUserProfile?.id}</Text>

            {currentUserProfile?.roles?.map((item) => (
              <Text>{`${item}, `}</Text>
            ))}
          </Space>
        </div>
        <div className="btn-container">
          <Button danger onClick={logoutUser}>
            Signout
          </Button>
        </div>
      </Drawer>
    </>
  )
}

export default ProfileDrawer