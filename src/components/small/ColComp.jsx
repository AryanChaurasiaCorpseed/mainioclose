import { Typography } from "antd"
import React from "react"
const { Text } = Typography

const ColComp = ({ data }) => {
  return <Text>{data ? data : "NA"}</Text>
}

export default ColComp
