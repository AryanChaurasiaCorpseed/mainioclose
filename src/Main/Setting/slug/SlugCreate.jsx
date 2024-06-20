import React, { useEffect, useState } from "react"
import LongInput from "../../../components/Inputs/LongInput"
import SmOneBtn from "../../../components/button/SmOneBtn"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllSlugAction,
  leadSlugAction,
} from "../../../Toolkit/Slices/LeadSlugSlice"
import TableBoot from "../../../components/tablesData/TableBoot"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EditSlugModal from "../../../Model/EditSlugModal"
toast.configure()

const SlugCreate = () => {
  const [slugName, setSlugName] = useState("")
  const [slugDep, setSlugDep] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSlugAction())
  }, [dispatch, slugDep])

  const { allLeadSlug, allLeadSlugLoading, allLeadSlugError } = useSelector(
    (prev) => prev?.leadslug
  )


  const createSlugFun = async (e) => {
    e.preventDefault()
    const slugCreation = await dispatch(leadSlugAction(slugName))
    if ((slugCreation.type = "createLeadSlugData/fulfilled")) {
      setSlugName("")
      setSlugDep((prev) => !prev)
      toast.success("Slug Created Succesfully")
    }
  }

  const tbDtaa = ["id", "Name","Edit"]

  return (
    <div>
      <MainHeading data={`Slug Create`} />
      <div className="lead-box">
        <form>
          <LongInput
            type="text"
            label={`Enter Slug Name`}
            value={slugName}
            onChange={(e) => setSlugName(e.target.value)}
          />
          <SmOneBtn name="Submit" onClick={createSlugFun} />
        </form>
      </div>

      <TableBoot
        tbRow={tbDtaa}
        loading={allLeadSlugLoading}
        error={allLeadSlugError}
      >
        {allLeadSlug?.map((status, index) => (
          <tr key={index}>
            <th>{status.id}</th>
            <td>{status?.name}</td>
            <td><EditSlugModal data={status}  /></td>
          </tr>
        ))}
      </TableBoot>
    </div>
  )
}

export default SlugCreate
