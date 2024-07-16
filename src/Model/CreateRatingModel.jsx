import React, { useEffect, useState } from "react"
import "./Model.css"
import { MultiSelect } from "primereact/multiselect"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../Toolkit/Slices/UsersSlice"
import { getAllUrlAction } from "../Toolkit/Slices/LeadUrlSlice"
import { addNewRating } from "../Toolkit/Slices/RatingSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const CreateRatingModel = ({
  hidebox,
  setRatingDep,
  editRatingDep,
  myobjData,
}) => {
  const [multiUser, setMultiUser] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUrlAction(0))
  }, [])

  const { addRating, addRatingLoading, addratingError } = useSelector(
    (prev) => prev?.ratingn
  )

  const { allLeadUrl } = useSelector((prev) => prev?.leadurls)

  const [createRating, setCreateRating] = useState({
    rating: "",
    urlsManagmentId: 0,
    ratingsUser: multiUser,
  })

  useEffect(() => {
    setCreateRating((prev) => ({
      ...prev,
      rating: myobjData?.data?.rating,
      urlsManagmentId: myobjData?.data?.urlsManagmentId,
      ratingsUser: myobjData?.data?.ratingsUser,
    }))
  }, [editRatingDep])

  useEffect(() => {
    setCreateRating((prev) => ({ ...prev, ratingsUser: multiUser }))
  }, [multiUser])

  const getRatingData = (e) => {
    setCreateRating((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const { allUsers, userLoading, userError } = useSelector((prev) => prev?.user)

  const addRatingFun = async (e) => {
    e.preventDefault()

    const ratingResponse = await dispatch(addNewRating(createRating))
    if (ratingResponse.type === "add-new-rating-star/rejected")
      return toast.error("Something Went wrong")
    if (ratingResponse.type === "add-new-rating-star/fulfilled") {
      setRatingDep((prev) => !prev)
      toast.success("Rating User Create Succesfully")
      window.location.reload()
    }
  }

  const allStars = [
    { id: 1, number: "1" },
    { id: 2, number: "2" },
    { id: 3, number: "3" },
    { id: 4, number: "4" },
    { id: 5, number: "5" },
  ]

  return (
    <>
      <div className="team-model">
        {/* MODAL */}
        <div
          className={`personal-info slide-data-ui  container ${
            hidebox ? "d-none" : ""
          }`}
        >
          <h4 className="info-text model-heading">Add Rating User</h4>
          <form>
            <div className="first-form form-row">
              <div className="form-group col-md-6">
                <div className="pr-ten">
                  <label className="label-heading mb-1" htmlFor="teamName">
                    Number of Rating*
                  </label>
                  <select
                    name="rating"
                    id="ratingstar"
                    className="form-control input-focus"
                    onChange={getRatingData}
                  >
                    <option>Select Star</option>
                    {allStars?.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group col-md-6">
                <div className="pr-ten">
                  <label className="label-heading mb-1" htmlFor="teamName">
                    Select Url*
                  </label>
                  <select
                    name="urlsManagmentId"
                    id="management"
                    className="form-control input-focus"
                    onChange={getRatingData}
                  >
                    <option>Select Url Name</option>
                    {allLeadUrl?.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.urlsName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label className="label-heading mb-1" htmlFor="teamName">
                  Select users *
                </label>
                <MultiSelect
                  style={{ dropdown: { backgroundColor: "#000" } }}
                  value={multiUser}
                  onChange={(e) => setMultiUser(e.target.value)}
                  options={allUsers}
                  optionLabel="fullName"
                  placeholder="Select Urls"
                  optionValue="id"
                  maxSelectedLabels={6}
                  className="multi-select-boxx w-100 py-1 my-3"
                />
              </div>

              <div className="all-between-items">
                <div className="all-center-2"></div>
                <div>
                  <button
                    onClick={(e) => addRatingFun(e)}
                    className="first-button form-prev-btn btn-bg"
                  >
                    {addRatingLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateRatingModel
