import React, { useRef, useState, useEffect } from "react"
import { Tooltip, Typography } from "antd"
import { Link } from "react-router-dom"

const { Text } = Typography

const OverFlowText = ({ children, linkText, to, onClick }) => {
  const textRef = useRef(null)
  const [isOverflowed, setIsOverflowed] = useState(false)

  useEffect(() => {
    const { current } = textRef
    if (current) {
      setIsOverflowed(current.scrollWidth > current.clientWidth)
    }
  }, [children])

  return linkText ? (
    <Tooltip title={isOverflowed ? children : ""} arrow={false}>
      <Link
        ref={textRef}
        to={to}
        onClick={onClick}
        className="link-heading tooltip-text-overflow"
      >
        {children ? children : "NA"}
      </Link>
    </Tooltip>
  ) : (
    <Tooltip title={isOverflowed ? children : ""} arrow={false}>
      <Text ref={textRef} className="tooltip-text-overflow">
        {children ? children : "NA"}
      </Text>
    </Tooltip>
  )
}

export default OverFlowText
