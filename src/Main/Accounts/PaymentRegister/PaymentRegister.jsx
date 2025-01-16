import { Button, Flex, Input, notification, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CommonTable from "../../../components/CommonTable";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  approvedPayment,
  getAllPaymentRegister,
  getUnusedBankStatement,
} from "../../../Toolkit/Slices/AccountSlice";
const { Text } = Typography;

const PaymentRegister = () => {
  const dispatch = useDispatch();
  const paymentRegisterList = useSelector(
    (state) => state.account.paymentRegisterList
  );
  const unusedBankStatementList = useSelector(
    (state) => state.account.unusedBankStatementList
  );
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(paymentRegisterList);
  }, [paymentRegisterList]);

  useEffect(() => {
    dispatch(getAllPaymentRegister());
    dispatch(getUnusedBankStatement());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchText(value);
    const filtered = paymentRegisterList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleApproved = (e, x, data) => {
    console.log("jkhdsjgjksdjskh", x, data?.transactionId);
    if (x?.transaction === data?.transactionId) {
      dispatch(
        approvedPayment({ bankstatementId: e, registerAmountId: data?.id })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Payment approved successfully !.",
            });
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      notification.error({
        message: "Payment id and bank register id are not matching",
      });
    }
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 80,
      fixed: "left",
    },
    {
      dataIndex: "estimateId",
      title: "Estimate id",
      fixed: "left",
    },
    {
      dataIndex: "estimateNo",
      title: "Estimate no.",
      fixed: "left",
    },
    {
      dataIndex: "transactionId",
      title: "Transaction id",
    },
    {
      dataIndex: "serviceName",
      title: "Service name",
    },
    {
      dataIndex: "companyName",
      title: "Company name",
    },
    {
      dataIndex: "billingQuantity",
      title: "Billing quantity",
    },
    {
      dataIndex: "totalAmount",
      title: "Total amount",
    },
    {
      dataIndex: "professionalFees",
      title: "Professional fees",
    },
    {
      dataIndex: "profesionalGst",
      title: "Professional gst (%)",
    },
    {
      dataIndex: "govermentfees",
      title: "Government fees",
    },
    {
      dataIndex: "govermentGst",
      title: "Government gst (%)",
    },
    {
      dataIndex: "serviceCharge",
      title: "Service charge",
    },
    {
      dataIndex: "serviceGst",
      title: "Service gst (%)",
    },
    {
      dataIndex: "otherFees",
      title: "Other fees",
    },
    {
      dataIndex: "otherGst",
      title: "Other gst (%)",
    },
    {
      dataIndex: "paymentDate",
      title: "Payment date",
      render: (data) => <Text>{dayjs(data).format("DD-MM-YYYY")}</Text>,
    },
    {
      dataIndex: "remark",
      title: "Remark",
    },
    {
      dataIndex: "approved",
      title: "Approved",
      fixed: "right",
      width: 200,
      render: (_, data) => (
        <Select
          style={{ width: "95%" }}
          defaultActiveFirstOption={true}
          defaultValue={0}
          showSearch
          options={[
            { label: "None", value: 0 },
            ...(unusedBankStatementList?.length > 0
              ? unusedBankStatementList?.map((item) => ({
                  label: `${item?.transaction} || ₹ ${item?.leftAmount}`,
                  value: item?.id,
                  ...item,
                }))
              : []),
          ]}
          onSelect={(e, x) => handleApproved(e, x, data)}
        />
      ),
    },
  ];

  return (
    <>
      <Flex vertical gap={12}>
        <Flex className="vouchers-header">
          <Text className="heading-text">Payment register</Text>
        </Flex>

        <Flex
          justify="space-between"
          align="center"
          className="vouchers-header"
        >
          <Input
            prefix={<Icon icon="fluent:search-24-regular" />}
            value={searchText}
            size="small"
            onChange={handleSearch}
            placeholder="search"
            style={{ width: "25%" }}
          />
          <Button
            type="primary"
            // onClick={() => {
            //   setOpenModal(true);
            // }}
          >
            Create payment register
          </Button>
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh", x: 2600 }}
          rowKey={(row) => row?.id}
        />
      </Flex>
    </>
  );
};

export default PaymentRegister;
