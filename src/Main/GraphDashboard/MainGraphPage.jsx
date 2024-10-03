import React, { useState } from "react"
import ProjectGraph from "./ProjectGraph"
import ProjectAmountGraph from "./ProjectAmountGraph"
import "./Graph.scss"
import { Button, Flex, Typography } from "antd"
import { Icon } from "@iconify/react"
import CompanyAmountGraph from "./CompanyAmountGraph"
import UserGraph from "./UserGraph"
const { Text } = Typography

const MainGraphPage = () => {
  const [expandedBox, setExpandedBox] = useState(null)

  const handleDoubleClick = (boxIndex) => {
    setExpandedBox((prevBox) => (prevBox === boxIndex ? null : boxIndex))
  }

  const isExpanded = (boxIndex) => expandedBox === boxIndex

  const items = [
    {
      label: "Project graph",
      content: <ProjectGraph expandedBox={expandedBox} />,
    },
    {
      label: "Project amount graph",
      content: <ProjectAmountGraph expandedBox={expandedBox} />,
    },
    {
      label: "Company amount graph",
      content: <CompanyAmountGraph expandedBox={expandedBox} />,
    },
    {
      label: "User graph",
      content: <UserGraph expandedBox={expandedBox} />,
    },
  ]

  return (
    <div
      className={`grid-container ${
        expandedBox !== null ? "grid-collapsed" : ""
      }`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`grid-box ${isExpanded(index) ? "expanded" : ""}`}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: "2px 4px" }}
          >
            <Text className="heading-text">{item?.label}</Text>
            <Button
              type="text"
              size="small"
              onClick={() => handleDoubleClick(index)}
            >
              {expandedBox === null ? (
                <Icon
                  icon="fluent:full-screen-maximize-24-regular"
                  height={18}
                  width={18}
                />
              ) : (
                <Icon
                  icon="fluent:full-screen-minimize-24-regular"
                  height={18}
                  width={18}
                />
              )}
            </Button>
          </Flex>
          {item?.content}
        </div>
      ))}
    </div>
  )
}

export default MainGraphPage
