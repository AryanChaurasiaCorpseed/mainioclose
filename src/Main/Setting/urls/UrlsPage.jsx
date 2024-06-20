import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createAllUrlAction,
  getAllUrlAction,
} from "../../../Toolkit/Slices/LeadUrlSlice"
import MainHeading from "../../../components/design/MainHeading"
import TableBoot from "../../../components/tablesData/TableBoot"
import LongInput from "../../../components/Inputs/LongInput"
import SmOneBtn from "../../../components/button/SmOneBtn"
import { MultiSelect } from "primereact/multiselect"
import { getAllSlugAction } from "../../../Toolkit/Slices/LeadSlugSlice"
import DropDownComp from "../../../components/Inputs/DropDownComp"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Tooltip } from "antd"
toast.configure()

const UrlsPage = () => {
  const [getAllSlug, setGetAllSlug] = useState([])
  const [urlLeadData, setUrlLeadData] = useState({
    name: "",
    urlSlug: getAllSlug,
    quality: true,
  })
  const [urlDep, setUrlDep] = useState(false)

  useEffect(() => {
    setUrlLeadData((prevData) => ({
      ...prevData,
      urlSlug: getAllSlug,
    }))
  }, [getAllSlug])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSlugAction())
  }, [dispatch])

  const { allLeadSlug } = useSelector((prev) => prev?.leadslug)

  const saveUrlData = (e) => {
    setUrlLeadData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    dispatch(getAllUrlAction())
  }, [dispatch, urlDep])

  const { allLeadUrl, allLeadUrlLoading, allLeadUrlError } = useSelector(
    (prev) => prev?.leadurls
  )

  const { createLeadUrl, createLeadUrlLoading, createLeadUrlError } =
    useSelector((prev) => prev?.leadurls)

  const createUrlFun = async (e) => {
    e.preventDefault()
    const createNewUrl = await dispatch(createAllUrlAction(urlLeadData))
    if (createNewUrl.type === "createLeadUrlData/fulfilled") {
      toast.success("Url Created Succesfully")
      setUrlDep((prev) => !prev)
      setUrlLeadData({
        name: "",
        urlSlug: getAllSlug,
        quality: true,
      })
      setGetAllSlug([])
    }
    if (createNewUrl.type === "createLeadUrlData/rejected") {
      toast.success("Something Went Wrong")
    }
  }

  const dataBool = [
    { id: "true", number: "True" },
    { id: "false", number: "False" },
  ]

  const tableHead = ["id", "Url Name", "Slugs", "Quality"]

  console.log("ALLLKJKGHDH", allLeadUrl)

  const slugsInTooltip = (data) => {
    return data?.map((items) => {
      return <p className="slug-items-tooltip">{items?.name}</p>
    })
  }

  return (
    <div>
      <MainHeading data={`Urls Create`} />
      <div className="lead-box">
        <form>
          <LongInput
            type="text"
            name="name"
            value={urlLeadData.name}
            label={`Enter Url Name`}
            onChange={saveUrlData}
          />
          <MultiSelect
            style={{ dropdown: { backgroundColor: "#000" } }}
            value={getAllSlug}
            onChange={(e) => setGetAllSlug(e.value)}
            options={allLeadSlug}
            optionLabel="name"
            placeholder="Select Slug"
            optionValue="id"
            maxSelectedLabels={6}
            className="multi-select-boxx w-100 py-1 my-3"
          />
          <DropDownComp
            name="quality"
            onChange={saveUrlData}
            // value={urlLeadData.quality}
            data={dataBool}
            options="Select Quality"
            className="pl-0"
          />
          <SmOneBtn
            name={createLeadUrlLoading ? "Loading..." : "Submit"}
            onClick={createUrlFun}
          />
        </form>
      </div>

      <TableBoot
        tbRow={tableHead}
        loading={allLeadUrlLoading}
        error={allLeadUrlError}
      >
        {allLeadUrl?.map((status, index) => (
          <tr key={index}>
            <th>{status.id}</th>
            <td>{status?.urlsName?.slice(0, 70)}</td>
            <td>
              {status?.urlSlug?.length > 0 ? (
                <Tooltip title={slugsInTooltip(status?.urlSlug)}>
                  {status?.urlSlug?.[0]?.name}
                </Tooltip>
              ) : (
                "N/A"
              )}
            </td>
            <td>{status?.quality ? "True" : "False"}</td>
          </tr>
        ))}
      </TableBoot>
    </div>
  )
}

export default UrlsPage
