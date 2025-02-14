import React from 'react'
import { useSelector } from 'react-redux'

const Groupvoucher = () => {
  const list=useSelector((state)=>state.account.groupVoucherList)
  


  return (
    <div>Groupvoucher</div>
  )
}

export default Groupvoucher