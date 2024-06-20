import React, { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { postQuery } from "../../../API/PostQuery"
import InputErrorComponent from "../../../components/InputErrorComponent"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import SmallTableScalaton from "../../../components/Scalaton/SmallTableScalaton"
import { deleteQuery } from "../../../API/DeleteQuery"
import MainHeading from "../../../components/design/MainHeading"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Modal } from "antd"
import DocumentModal from "../../../Model/DocumentModal"
toast.configure()

const LeadCategory = () => {
  const { userid } = useParams()

  const [leadCategory, setLeadCategory] = useState({
    name: "",
    userId: userid,
  })

  const [deleteCategoryDep, setDeleteCategoryDep] = useState(false)
  const [createCategoryDep, setCreateCategoryDep] = useState(false)

  const [btnLoading, setBtnLoading] = useState(false)
  const [nameError, setNameError] = useState(false)

  const nameRef = useRef()

  const createCatFun = async (e) => {
    e.preventDefault()

    if (nameRef.current.value === "") {
      setNameError(true)
      return
    }
    setNameError(false)

    setBtnLoading(true)
    try {
      const catDataRes = await postQuery(
        `/leadService/api/v1/category/createCategory`,
        leadCategory
      )
      setCreateCategoryDep((prev) => !prev)
      toast.success("Category Created Succesfully")
      setBtnLoading(false)
      nameRef.current.value = ""
    } catch (err) {
      console.log(err)
      toast.error("Something went Wrong")
      setBtnLoading(false)
    }
  }

  const categoryUrl = `/leadService/api/v1/category/getAllCategories`
  const categoryDep = [createCategoryDep, deleteCategoryDep]

  const { productData: categoryData, loading: categoryLoading } =
    useCustomRoute(categoryUrl, categoryDep)

  const deleteCategoryFun = async (statusId) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const leadCategoryDel = await deleteQuery(
          `/leadService/api/v1/category/deleteCategory?categoryId=${statusId}`
        )
        setDeleteCategoryDep((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  console.log('kbxcbzo',categoryData)

  return (
    <div>
        <MainHeading data={`Lead Category`} />
      <div className="lead-box">
        <form>
          <label className="label-heading mb-1" htmlFor="statusCreate">
            Enter Category Name
          </label>
          <br />
          <input
            type="text"
            ref={nameRef}
            onChange={(e) =>
              setLeadCategory((cat) => ({ ...cat, name: e.target.value }))
            }
            name="name"
            className="form-control input-focus"
          />
          {nameError ? (
            <InputErrorComponent value="Category Name can't be Blank" />
          ) : (
            ""
          )}
          <button onClick={(e) => createCatFun(e)} className="action-btn my-2">
            {btnLoading ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
      <div className="mt-4 setting-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Created Date</th>
                {/* <th scope="col">Document</th> */}
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {categoryLoading ? (
                <SmallTableScalaton />
              ) : (
                categoryData.map((status, index) => (
                  <tr key={index}>
                    <th>{status.id}</th>
                    <td>{status?.categoryName}</td>
                    <td>{new Date(status.createdDate).toLocaleDateString()}</td>
                    {/* <td><DocumentModal document={status?.documents} /></td> */}
                    <td>
                      <i
                        onClick={() => deleteCategoryFun(status.id)}
                        className="fa-solid gray-cl fa-trash"
                      ></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LeadCategory
