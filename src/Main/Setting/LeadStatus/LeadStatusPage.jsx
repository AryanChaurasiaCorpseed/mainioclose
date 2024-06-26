import React, { useRef, useState } from "react"
import "./LeadStatusPage.scss"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import SmallTableScalaton from "../../../components/Scalaton/SmallTableScalaton"
import InputErrorComponent from "../../../components/InputErrorComponent"
import { postQuery } from "../../../API/PostQuery"
import { deleteQuery } from "../../../API/DeleteQuery"
import MainHeading from "../../../components/design/MainHeading"
import EditStatus from "./EditStatus"

const LeadStatusPage = () => {
  const [createStatus, setCreateStatus] = useState({
    name: "",
    description: "",
  })
  const [nameError, setNameError] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [leadCreateDep, setLeadCreateDep] = useState(false)
  const [deleteStatusDep, setDeleteStatusDep] = useState(false)

  const nameRef = useRef()
  const descriptionRef = useRef()

  const leadStatusDataFun = (e) => {
    setCreateStatus((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const leadStatusCreateFun = (e) => {
    e.preventDefault()

    if (nameRef.current.value === "") {
      setNameError(true)
      return
    }

    setBtnLoading(true)
    const leadStatusCraete = async () => {
      try {
        const createNewStatus = await postQuery(
          `/leadService/api/v1/status/CreateLeadStatus`,
          createStatus
        )
        setLeadCreateDep((prev) => !prev)
        nameRef.current.value = ""
        descriptionRef.current.value = ""
        setBtnLoading(false)
      } catch (err) {
        console.log(err)
        setBtnLoading(false)
      }
    }

    leadStatusCraete()
  }

  const statusUrl = `/leadService/api/v1/status/getAllStatus`
  const statusDep = [leadCreateDep, deleteStatusDep]

  const { productData: statusData, loading: statusLoading } = useCustomRoute(
    statusUrl,
    statusDep
  )

  const deleteStatusFun = async (statusId) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const leadStatusDel = await deleteQuery(
          `/leadService/api/v1/status/deleteStaus?id=${statusId}`
        )
        setDeleteStatusDep((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }


  return (
    <div>
        <MainHeading data={`Lead Status`} />
      <div className="lead-box">
        <form>
          <label className="label-heading mb-1" htmlFor="statusCreate">
            Enter Lead Name
          </label>
          <br />
          <input
            type="text"
            ref={nameRef}
            onChange={(e) => leadStatusDataFun(e)}
            name="name"
            className="form-control input-focus"
          />
          {nameError ? <InputErrorComponent value="Name can't be Blank" /> : ""}
          <br />
          <label className="label-heading mb-1" htmlFor="statusCreate">
            Enter Lead Description
          </label>
          <textarea
            onChange={(e) => leadStatusDataFun(e)}
            ref={descriptionRef}
            name="description"
            className="form-control input-focus min-height-one"
          ></textarea>
          <button
            onClick={(e) => leadStatusCreateFun(e)}
            className="action-btn my-2"
          >
            {btnLoading ? "Loading" : "Submit"}
          </button>
        </form>

        <div className="mt-4 setting-table">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {statusLoading ? (
                  <SmallTableScalaton />
                ) : (
                  statusData.map((status, index) => (
                    <tr key={index}>
                      <th>{status.id}</th>
                      <td>{status.name}</td>
                      <td>{status.description}</td>
                      <td><EditStatus data={status} /></td>
                      <td>
                        <i
                          onClick={() => deleteStatusFun(status.id)}
                          className="fa-solid gray-cl fa-trash"
                        ></i>{" "}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadStatusPage
