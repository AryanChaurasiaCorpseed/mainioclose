import React, { lazy, Suspense, useCallback, useEffect } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  getCompanyAction,
  handleNextPagination,
  handlePrevPagination,
  searchCompany,
  updateCompanyAssignee,
} from "../../../Toolkit/Slices/CompanySlice"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import ColComp from "../../../components/small/ColComp"
import { useParams } from "react-router-dom"
import { getAllLeadUser } from "../../../Toolkit/Slices/LeadSlice"
import { Input, notification, Select, Tag, Tooltip } from "antd"
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"
import { getHighestPriorityRole } from "../../Common/Commons"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
const CommonTable = lazy(() => import("../../../components/CommonTable"))
const { Search } = Input

const MainCompanyPage = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const currUser = useSelector((prev) => prev?.auth?.currentUser)
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData)
  const currentRoles = useSelector((state) => state?.auth?.roles)
  const allUsers = useSelector((state) => state.user.allUsers)
  const { allCompnay, loadingCompany, errorCompany } = useSelector(
    (prev) => prev?.company
  )
  const page = useSelector((prev) => prev?.company.page)

  useEffect(() => {
    dispatch(getCompanyAction({ id: currUser?.id, page, filterUserId: 0 }))
  }, [dispatch, currUser, page])

  useEffect(() => {
    dispatch(getAllLeadUser(userid))
  }, [userid, dispatch])

  const onSearchLead = (e, b, c) => {
    dispatch(searchCompany({ inputText: e, userId: userid }))
    if (!b) {
      dispatch(searchCompany({ inputText: "", userId: userid }))
    }
  }

  const handleUpdateAssignee = useCallback(
    (assigneeId, companyId) => {
      let data = {
        companyId: companyId,
        assigneeId: assigneeId,
      }
      dispatch(updateCompanyAssignee(data))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Assignee is updated successfully",
            })
            dispatch(
              getCompanyAction({ id: currUser?.id, page, filterUserId: 0 })
            )
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, currUser, page]
  )

  const filterCompanyBasedOnUser = useCallback(
    (filterUserId) => {
      if (filterUserId) {
        dispatch(getCompanyAction({ id: currUser?.id, page, filterUserId }))
      }
    },
    [page, dispatch, currUser]
  )

  const tagsInTooltip = (data, type) => {
    return data?.map((items) => {
      return (
        <Tag className="slug-items-tooltip">
          {type === "lead" ? items?.leadNameame : items?.projectName}
        </Tag>
      )
    })
  }

  const columns = [
    {
      dataIndex: "companyId",
      title: "Id",
      fixed: "left",
      width: 80,
    },
    {
      dataIndex: "companyName",
      title: "Company name",
      fixed: "left",
      width: 250,
      render: (_, props) => (
        <OverFlowText linkText={true} to={`${props?.companyId}/details`}>
          {props?.companyName}
        </OverFlowText>
      ),
    },
    {
      dataIndex: "assignee",
      title: "Assignee",
      render: (_, props) =>
        getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <Select
            size="small"
            showSearch
            style={{ width: "100%" }}
            value={props?.assignee?.id}
            placeholder="select assignee"
            options={
              leadUserNew?.map((ele) => ({
                label: ele?.fullName,
                value: ele?.id,
              })) || []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            onChange={(e) => handleUpdateAssignee(e, props?.companyId)}
          />
        ) : (
          <ColComp data={props?.assignee?.fullName} />
        ),
    },
    {
      dataIndex: "gstNo",
      title: "GST number",
      render: (_, props) => <ColComp data={props?.gstNo} />,
    },
    {
      dataIndex: "gstType",
      title: "GST type",
      render: (_, props) => <ColComp data={props?.gstType} />,
    },
    {
      dataIndex: "primaryContact",
      title: "Client name",
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.name}</OverFlowText>
      ),
    },
    {
      dataIndex: "projects",
      title: "Projects",
      render: (_, data) =>
        data?.project?.length > 0 && data?.project?.length === 1 ? (
          <OverFlowText>{data?.project?.[0]?.projectName}</OverFlowText>
        ) : data?.project?.length >= 2 ? (
          <div className="flex-vert-hori-center">
            <OverFlowText>{data?.project?.[0]?.projectName} </OverFlowText>
            <Tooltip
              title={tagsInTooltip(data?.project)}
              arrow={false}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              overlayStyle={{ maxWidth: 800 }}
            >
              <Icon
                icon="fluent:more-circle-24-regular"
                height={BTN_ICON_HEIGHT + 8}
                width={BTN_ICON_WIDTH + 8}
              />
            </Tooltip>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      dataIndex: "leads",
      title: "Leads",
      render: (_, data) =>
        data?.lead?.length > 0 && data?.lead?.length === 1 ? (
          <OverFlowText>{data?.lead?.[0]?.leadNameame}</OverFlowText>
        ) : data?.lead?.length >= 2 ? (
          <div className="flex-vert-hori-center">
            <OverFlowText>{data?.lead?.[0]?.leadNameame} </OverFlowText>
            <Tooltip
              title={tagsInTooltip(data?.lead, "lead")}
              arrow={false}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              overlayStyle={{ maxWidth: 800 }}
            >
              <Icon
                icon="fluent:more-circle-24-regular"
                height={BTN_ICON_HEIGHT + 8}
                width={BTN_ICON_WIDTH + 8}
              />
            </Tooltip>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      dataIndex: "primarydesigination",
      title: "Desigination",
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.designation}</OverFlowText>
      ),
    },

    {
      dataIndex: "contactNo",
      title: "Contact no.",
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.contactNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "emails",
      title: "Email",
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.emails}</OverFlowText>
      ),
    },
    {
      dataIndex: "whatsappNo",
      title: "Whatsapp no.",
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.whatsappNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "address",
      title: "Address",
      render: (_, props) => <ColComp data={props?.address} />,
    },
    {
      dataIndex: "city",
      title: "City",
      render: (_, props) => <ColComp data={props?.city} />,
    },
    {
      dataIndex: "state",
      title: "State",
      render: (_, props) => <ColComp data={props?.state} />,
    },

    {
      dataIndex: "country",
      title: "Country",
      render: (_, props) => <ColComp data={props?.country} />,
    },
    {
      dataIndex: "secAddress",
      title: "Secondary address",
      render: (_, props) => <ColComp data={props?.secAddress} />,
    },
    {
      dataIndex: "secCity",
      title: "Secondary city",
      render: (_, props) => <ColComp data={props?.secCity} />,
    },
    {
      dataIndex: "secState",
      title: "Secondary state",
      render: (_, props) => <ColComp data={props?.secState} />,
    },
    {
      dataIndex: "seCountry",
      title: "Secondary country",
      render: (_, props) => <ColComp data={props?.seCountry} />,
    },
  ]

  return (
    <TableOutlet>
      <MainHeading data={`All company (${allCompnay?.length})`} />
      <div className="flex-verti-center-hori-start mt-2">
        <Search
          size="small"
          onSearch={onSearchLead}
          style={{ width: "220px" }}
          placeholder="search"
          onChange={(e) =>
            !e.target.value
              ? dispatch(searchCompany({ inputText: "", userId: userid }))
              : ""
          }
          enterButton="search"
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
        {getHighestPriorityRole(currentRoles) === "ADMIN" && (
          <Select
            showSearch
            allowClear
            style={{ width: "250px" }}
            placeholder="filter out companies"
            options={
              allUsers?.length > 0
                ? allUsers?.map((item) => ({
                    label: item?.fullName,
                    value: item?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            onChange={filterCompanyBasedOnUser}
            onClear={() =>
              dispatch(
                getCompanyAction({ id: currUser?.id, page, filterUserId: 0 })
              )
            }
          />
        )}
      </div>
      <div className="mt-3">
        {loadingCompany && <TableScalaton />}
        {errorCompany && <SomethingWrong />}
        {allCompnay && !loadingCompany && !errorCompany && (
          <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={allCompnay}
              columns={columns}
              scroll={{ x: 3200, y: 520 }}
              rowSelection={true}
              pagination={true}
              nextDisable={allCompnay?.length < 50 ? true : false}
              prevDisable={page === 0 ? true : false}
              nextPage={handleNextPagination}
              prevPage={handlePrevPagination}
            />
          </Suspense>
        )}
      </div>
    </TableOutlet>
  )
}

export default MainCompanyPage
