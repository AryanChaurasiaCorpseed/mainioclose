import React, { useState } from "react"
import ProjectGraph from "./ProjectGraph"
import ProjectAmountGraph from "./ProjectAmountGraph"
import "./Graph.scss"
import { Button, Flex, Typography } from "antd"
import { Icon } from "@iconify/react"
import CompanyAmountGraph from "./CompanyAmountGraph"
const { Text } = Typography

const MainGraphPage = () => {
  const [expandedBox, setExpandedBox] = useState(null)

  // Toggle the expansion of a grid box based on double click
  const handleDoubleClick = (boxIndex) => {
    // If the same box is clicked again, collapse it; otherwise, expand the clicked box
    setExpandedBox((prevBox) => (prevBox === boxIndex ? null : boxIndex))
  }

  // Check if a box is expanded
  const isExpanded = (boxIndex) => expandedBox === boxIndex

  // Components to render in the grid boxes
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
      content: <CompanyAmountGraph/>,
    },
    {
      label: "Component 4",
      content: "Component 4",
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
          // onDoubleClick={() => handleDoubleClick(index)}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: "2px 4px" }}
          >
            <Text className="heading-text">{item?.label}</Text>{" "}
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
