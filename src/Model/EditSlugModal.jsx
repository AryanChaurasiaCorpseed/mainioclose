import { Modal } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import LongInput from "../components/Inputs/LongInput"
import SmOneBtn from "../components/button/SmOneBtn"
import { useDispatch } from "react-redux"
import { editSulg } from "../Toolkit/Slices/LeadSlugSlice"

const EditSlugModal = ({ data }) => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [slugName, setSlugName] = useState(data?.name)
  const editSlugQuery = useCallback(() => {
    dispatch(editSulg({ id: data?.id, name: slugName }))
  }, [dispatch, data, slugName])

  return (
    <div>
      <button className="btn btn-info" onClick={() => setOpenModal(true)}>
        Edit
      </button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={800}
        footer={null}
        onClose={() => setOpenModal(false)}
      >
        <div className="lead-box">
          <form>
            <LongInput
              type="text"
              label={`Enter Slug Name`}
              value={slugName}
              onChange={(e) => setSlugName(e.target.value)}
            />
            <SmOneBtn name="Submit" onClick={editSlugQuery} />
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default EditSlugModal
