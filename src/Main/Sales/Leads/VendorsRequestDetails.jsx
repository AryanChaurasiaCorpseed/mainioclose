import { Col, Drawer, Flex, Row, Timeline, Typography } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import { getvendorHistoryByLeadId } from "../../../Toolkit/Slices/LeadSlice"
const { Text, Paragraph } = Typography

const VendorsRequestDetails = ({ data, children }) => {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const historyList = useSelector(
    (state) => state.leads.singleVendorHistoryList
  )
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true)
    dispatch(
      getvendorHistoryByLeadId({
        userId: userid,
        leadId: data?.leadId,
        vendorRequestId: data?.vendorRequestId,
      })
    )
  }, [dispatch, data, userid])

  return (
    <>
      <Link className="link-heading" onClick={handleOpenDrawer}>
        {children}
      </Link>
      <Drawer
        open={openDrawer}
        width={"80%"}
        closeIcon={null}
        onClose={() => setOpenDrawer(false)}
      >
        <Flex justify="space-between">
          <Text className="heading-text">Vendor's request status</Text>
        </Flex>
        <Row>
          <Col span={6}>
            <Flex style={{ width: "100%" }} gap={8} vertical>
              {data?.date && (
                <Text className="heading-text" type="secondary">
                  {" "}
                  Vendor's detail{" "}
                  {dayjs(data?.date).format("YYYY-MM-DD , hh:mm a")}{" "}
                </Text>
              )}
              <Flex vertical gap={12}>
                {data?.clientName && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:person-24-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>{data?.clientName}</Text>
                  </Flex>
                )}

                {data?.clientEmail && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:mail-24-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>{data?.clientEmail}</Text>
                  </Flex>
                )}

                {data?.clientNumber && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:call-24-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>{data?.clientNumber}</Text>
                  </Flex>
                )}

                {data?.companyName && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:building-people-24-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>{data?.companyName}</Text>
                  </Flex>
                )}

                {data?.budgetPrice && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:money-24-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>{data?.budgetPrice}</Text>
                  </Flex>
                )}

                {data?.categoryName && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:person-settings-20-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>Category name : {data?.categoryName}</Text>
                  </Flex>
                )}

                {data?.subCategoryName && (
                  <Flex gap={6}>
                    <Icon
                      icon="fluent:person-settings-20-regular"
                      height={BTN_ICON_HEIGHT}
                      width={BTN_ICON_WIDTH}
                    />
                    <Text>
                      Sub category name : {data?.subCategoryName}
                    </Text>
                  </Flex>
                )}

                {data?.requirementDescription && (
                  <Flex gap={6}>
                    <Flex>
                      <Icon
                        icon="fluent:document-bullet-list-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                    </Flex>
                    <Paragraph>{data?.requirementDescription}</Paragraph>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Col>
          <Col span={18}>
            <Timeline
              mode="left"
              items={
                historyList?.length > 0
                  ? historyList?.map((item) => ({
                      color:
                        item?.requestStatus === "Unavailable"
                          ? "red"
                          : item?.requestStatus === "Finished"
                          ? "green"
                          : item?.requestStatus === "Processing"
                          ? "yellow"
                          : "blue",
                      dot:
                        item?.requestStatus === "Processing" ? (
                          <Icon icon="fluent:clock-24-regular" color="yellow" />
                        ) : item?.requestStatus === "Finished" ? (
                          <Icon
                            icon="fluent:checkmark-24-filled"
                            color="green"
                          />
                        ) : (
                          ""
                        ),
                      label: (
                        <Flex vertical gap="2" justify="flex-end">
                          <Text>{item?.requestStatus}</Text>
                          <Text type="secondary">
                            by {item?.user?.fullName}
                          </Text>
                          <Text type="secondary">
                            {dayjs(item?.updateDate).format(
                              "YYYY-MM-DD , hh:mm a"
                            )}
                          </Text>
                        </Flex>
                      ),
                      children: (
                        <Flex vertical gap={2}>
                          {item?.externalVendorPrice && (
                            <Text strong>
                              Price give by vendor : {item?.externalVendorPrice}
                            </Text>
                          )}

                          {item?.internalVendorPrices && (
                            <Text strong>
                              Price given to vendor :{" "}
                              {item?.internalVendorPrices}
                            </Text>
                          )}

                          {item?.quotationAmount && (
                            <Text strong>
                              Quotation amount : {item?.quotationAmount}
                            </Text>
                          )}

                          <Text> {item?.updateDescription}</Text>
                        </Flex>
                      ),
                    }))
                  : []
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default VendorsRequestDetails
