import React, { useEffect } from "react";
import "./Graph.scss";
import { Card, Col, Flex, Row, Typography } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeadCategoryWise,
  getLeadsDataByMonth,
  getTotalLeadCountForGraph,
  getTotalProjectCounts,
  totalCompanyForGraph,
  totalUserCount,
} from "../../Toolkit/Slices/DasboardSlice";
import { Column, Pie } from "@ant-design/plots";
import dayjs from "dayjs";
const { Text } = Typography;

const GraphMainPage = () => {
  const dispatch = useDispatch();
  const totalLeadCount = useSelector(
    (state) => state.dashboard.totalLeadCountForGraph
  );
  const totalProjectCount = useSelector(
    (state) => state.dashboard.totalProjectCountForGraph
  );
  const leadData = useSelector((state) => state.dashboard.leadDataMonthWise);
  const userCount = useSelector(
    (state) => state.dashboard.totalUserCountForGraph
  );
  const companyCount = useSelector(
    (state) => state.dashboard.totalCompanyForGraph
  );

  const leadCountCategoryWise = useSelector(
    (state) => state.dashboard.leadDataCategoryWise
  );

  useEffect(() => {
    dispatch(getTotalLeadCountForGraph());
    dispatch(getTotalProjectCounts());
    dispatch(
      getLeadsDataByMonth({ toDate: "2024-01-01", fromDate: "2024-11-01" })
    );
    dispatch(
      //   getLeadCategoryWise({ toDate:"2024-11-01", fromDate:"2024-01-01" })
      getLeadCategoryWise({ toDate: "2024-01-01", fromDate: "2024-11-01" })
    );
    dispatch(totalUserCount());
    dispatch(totalCompanyForGraph());
  }, [dispatch]);

  const config = {
    data: leadData,
    height: 300,
    xField: (data) => dayjs(data?.name).format("MMM YYYY"),
    yField: "value",
    // style: {
    //   fill: ({ type }) => {
    //     if (type === "10-30分" || type === "30+分") {
    //       return "#22CBCC";
    //     }
    //     return "#2989FF";
    //   },
    // },
    // label: {
    //   text: (originData) => {
    //     const val = parseFloat(originData.value);

    //     if (val < 0.05) {
    //       return val.toFixed(1) + "%";
    //     }
    //     return "";
    //   },
    //   offset: 10,
    // },
    tooltip: {
      title: (data) => dayjs(data?.name).format("MMM YYYY"),
    },
    legend: false,
  };

  console.log("dqjhbkajsdbkajs", leadCountCategoryWise);

  

  const pieConfig = {
    // data: [
    //   { type: '分类一', value: 27 },
    //   { type: '分类二', value: 25 },
    //   { type: '分类三', value: 18 },
    //   { type: '分类四', value: 15 },
    //   { type: '分类五', value: 10 },
    //   { type: '其他', value: 5 },
    // ],
    data: leadCountCategoryWise?.data,
    angleField: "value",
    colorField: "key",
    // colorField: "type",
    innerRadius: 0.6,
    height:300,
    marginTop:25,
    label: {
      text: "value",
      position: "outside",
    //   textAlign: "center",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: `Total lead counts \n ${leadCountCategoryWise?.totalCount}`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
        },
        tooltip:false
      },
    ],
  };

  return (
    <div className="main-graph-container">
      <Row>
        <Col span={5}>
          <Card className="graph-card-1">
            <Flex justify="space-between">
              <Flex vertical>
                <Text className="card-text">Total leads : </Text>
                <Text className="card-text-result">{totalLeadCount}</Text>
              </Flex>
              <Flex>
                <Icon
                  icon="fluent:chart-person-24-regular"
                  height={32}
                  width={32}
                />
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={1} />
        <Col span={5}>
          <Card className="graph-card-2">
            <Flex justify="space-between">
              <Flex vertical>
                <Text className="card-text">Total users : </Text>
                <Text className="card-text-result">{userCount}</Text>
              </Flex>
              <Flex>
                <Icon icon="fluent:person-24-regular" height={32} width={32} />
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={1} />
        <Col span={5}>
          <Card className="graph-card-3">
            <Flex justify="space-between">
              <Flex vertical>
                <Text className="card-text">Total projects : </Text>
                <Text className="card-text-result">{totalProjectCount}</Text>
              </Flex>
              <Flex>
                <Icon icon="fluent:album-24-regular" height={32} width={32} />
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={1} />
        <Col span={5}>
          <Card className="graph-card-4">
            <Flex justify="space-between">
              <Flex vertical>
                <Text className="card-text">Total company : </Text>
                <Text className="card-text-result">{companyCount}</Text>
              </Flex>
              <Flex>
                <Icon
                  icon="fluent:building-desktop-24-regular"
                  height={32}
                  width={32}
                />
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>

      <Flex gap={24}>
        <Card title="Leads monthwise" className="lead-graph-card-column">
          <Column {...config} />
        </Card>
        <Card title="Leads monthwise" className="lead-graph-card-pie">
          <Pie {...pieConfig} />
        </Card>
      </Flex>
    </div>
  );
};

export default GraphMainPage;
