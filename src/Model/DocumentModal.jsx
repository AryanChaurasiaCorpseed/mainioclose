import { Modal } from "antd"
import React, { useEffect, useState } from "react"

const DocumentModal = ({ document }) => {
  const [openModal, setOpenModal] = useState(false)
  console.log("dokbckic", document)

  const [fileContent, setFileContent] = useState("")
  const [blobUrl, setBlobUrl] = useState("")

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(document)
        const text = await response.text()
        setFileContent(text)
        const blob = new Blob([text], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        setBlobUrl(url)
      } catch (error) {
        console.error("Error fetching the file:", error)
      }
    }

    fetchFileContent()
  }, [document])

  return (
    <div>
      <button className="btn btn-info" onClick={() => setOpenModal(true)}>
        view
      </button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={800}
        footer={null}
        onClose={() => setOpenModal(false)}
      >
        <iframe
          // src={document}
          src="https://crm.corpseed.com/invoice-MuV2ZjtuwsUWg3evGgL667FC0F0gswS17wArbN5u.html"
          height={500}
          width={'98%'}
        />
      </Modal>
    </div>
  )
}

export default DocumentModal
