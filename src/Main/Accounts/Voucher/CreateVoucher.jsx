import { Col, Flex, InputNumber, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "../Accounts.scss";
import {
  getAllLedger,
  getAllVoucherType,
  getLedgerById,
} from "../../../Toolkit/Slices/AccountSlice";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;

const CreateVoucher = ({ setVoucherData, voucherData }) => {
  const dispatch = useDispatch();
  const ledgerList = useSelector((state) => state.account.ledgerList);
  const voucherTypeList = useSelector((state) => state.account.voucherTypeList);

  const [estimatedata, setEstimateData] = useState({
    rate: null,
    per: null,
    amount: null,
  });

  const [renderedGSTData, setRenderedGstData] = useState([]);

  useEffect(() => {
    dispatch(getAllVoucherType());
    dispatch(getAllLedger());
  }, [dispatch]);

  const handlePressEnter = (e) => {
    const cGstAmount = (estimatedata?.amount * 18) / 100;
    const sGstAmount = (estimatedata?.amount * 12) / 100;
    setRenderedGstData((prev) => [
      ...prev,
      { idx: 2, perticulars: "CGST", rate: 18, per: "", amount: cGstAmount },
      { idx: 3, perticulars: "SGST", rate: 12, per: "", amount: sGstAmount },
      {
        idx: 4,
        perticulars: "Total amount",
        rate: "",
        per: "",
        amount: sGstAmount + cGstAmount + estimatedata?.amount,
      },
    ]);
  };

  return (
    <>
      <Flex vertical gap={12} style={{ height: "80vh", overflow: "auto" }}>
        <Flex gap={12}>
          <Select
            placeholder="Select voucher type"
            options={
              voucherTypeList?.length > 0
                ? voucherTypeList?.map((item) => ({
                    label: item?.name,
                    value: item?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: "25%" }}
          />{" "}
          <Select
            placeholder="Select ledger"
            options={
              ledgerList?.length > 0
                ? ledgerList?.map((item) => ({
                    label: item?.name,
                    value: item?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: "25%" }}
          />
        </Flex>

        <Flex gap={8}>
          <Text className="table-head-heading">Party A/C name</Text>{" "}
          <Text className="table-head-heading">:</Text>
          <Text strong></Text>
        </Flex>
        <Flex vertical>
          <Row
            style={{
              width: "100%",
              border: "1px solid black",
              padding: "2px 4px",
              borderRight: 0,
              borderLeft: 0,
            }}
          >
            <Col span={2}>
              <Text className="table-head-heading">S.No</Text>
            </Col>
            <Col span={13}>
              <Text className="table-head-heading">Perticulars</Text>
            </Col>
            <Col span={3}>
              <Text className="table-head-heading">Rate</Text>
            </Col>
            <Col span={3}>
              <Text className="table-head-heading">Per</Text>
            </Col>
            <Col span={3}>
              <Text className="table-head-heading">Amount</Text>
            </Col>
          </Row>
          <Row style={{ width: "100%", padding: "2px 4px", margin: "2px 0px" }}>
            <Col span={2}>
              <Text>1.</Text>
            </Col>
            <Col span={13}>
              <Select
                placeholder="Select ledger"
                size="small"
                variant="filled"
                options={
                  ledgerList?.length > 0
                    ? ledgerList?.map((item) => ({
                        label: item?.name,
                        value: item?.id,
                      }))
                    : []
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(e) => dispatch(getLedgerById(e))}
                style={{ width: "70%" }}
              />
            </Col>
            <Col span={3}>
              <InputNumber
                variant="filled"
                controls={false}
                size="small"
                style={{ width: "80%" }}
                value={estimatedata?.rate}
                onChange={(e) =>
                  setEstimateData((prev) => ({ ...prev, rate: e }))
                }
              />
            </Col>
            <Col span={3}>
              <InputNumber
                variant="filled"
                controls={false}
                size="small"
                style={{ width: "80%" }}
                value={estimatedata?.per}
                onChange={(e) =>
                  setEstimateData((prev) => ({ ...prev, per: e }))
                }
              />
            </Col>
            <Col span={3}>
              <InputNumber
                variant="filled"
                style={{ width: "80%" }}
                size="small"
                controls={false}
                value={estimatedata?.amount}
                onChange={(e) =>
                  setEstimateData((prev) => ({ ...prev, amount: e }))
                }
                onPressEnter={handlePressEnter}
              />
            </Col>
          </Row>
          {renderedGSTData?.map((item, idx) => (
            <Row
              style={{ width: "100%", padding: "2px 4px", margin: "2px 0px" }}
            >
              <Col span={2}>
                <Text>{item?.idx}</Text>
              </Col>
              <Col span={13}>
                <Text
                  className={
                    idx === renderedGSTData?.length - 1
                      ? "table-head-heading"
                      : ""
                  }
                >
                  {item?.perticulars}
                </Text>
              </Col>
              <Col span={3} style={{ padding: "0px 8px" }}>
                <Text>{item?.rate} </Text>
              </Col>
              <Col span={3} style={{ padding: "0px 8px" }}>
                <Text>{item?.per}</Text>
              </Col>
              <Col span={3} style={{ padding: "0px 8px" }}>
                <Text
                  className={
                    idx === renderedGSTData?.length - 1
                      ? "table-head-heading"
                      : ""
                  }
                >
                  {item?.amount}
                </Text>
              </Col>
            </Row>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default CreateVoucher;
