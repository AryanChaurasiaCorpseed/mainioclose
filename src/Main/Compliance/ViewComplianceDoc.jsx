import { Modal, Tag } from "antd"
import React, { useState } from "react"
import { Icon } from "@iconify/react"

export const ViewComplianceDoc = ({ data }) => {
  const [openModal, setOpenModal] = useState(false)
  const [docLink, setDocLink] = useState("")
  return (
    <>
      {data?.documents?.map((item, idx) => (
        <Tag
          className="btn-tag"
          onClick={() => {
            setDocLink(item)
            setOpenModal(true)
          }}
        >
          Doc {idx + 1}
        </Tag>
      ))}
      <Tag className="btn-tag">
        <Icon icon="fluent:add-20-filled" />
      </Tag>

      <Modal
        title="Compliance Document"
        open={openModal}
        width={800}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        footer={null}
      >
        <iframe width={'100%'} height={500} src={docLink} />
      </Modal>
    </>
  )
}
