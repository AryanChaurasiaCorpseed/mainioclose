import React from "react";
import "./Graph.scss";
import { Card, Flex, Typography } from "antd";
import { Icon } from "@iconify/react";
const { Text } = Typography;

const GraphMainPage = () => {
  return (
    <div className="main-graph-container">
      <Flex justify="space-between">
        <Card>
          <Flex gap={32}>
            <Flex vertical>
              <Text className="card-text"   >Total leads </Text>
              <Text className="card-text-result">1023544</Text>
            </Flex>
            <Flex>
              <Icon icon="fluent:chart-person-24-regular" height={32} width={32} />
            </Flex>
          </Flex>
        </Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
        <Card>Card 4</Card>
      </Flex>
    </div>
  );
};

export default GraphMainPage;
