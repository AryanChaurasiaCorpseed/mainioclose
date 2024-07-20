import { Typography } from "antd"
import React from "react"
const {Text}=Typography

const MainHeading = ({ count, data }) => {
  return (
    <Text className="heading-text">
      {data} {count && { count }}
    </Text>
  )
}

export default MainHeading
