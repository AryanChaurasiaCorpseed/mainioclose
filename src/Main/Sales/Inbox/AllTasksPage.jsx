import React from "react"
import GetAllTaskList from "../Leads/GetAllTaskList"

const AllTasksPage = ({ setOpenAllTask }) => {
    const closeEstimate = () => {
        setOpenAllTask((prev) => !prev)
      }
  return (
    <div className="estimate-ui-design custom-box">
      <div 
      onClick={() => closeEstimate()}
       className="estimate-close">
        {/* <p >close</p> */}
       
      </div>
      <div>
        <div  onClick={() => closeEstimate()}>
        <i className="fa-regular disk-size fa-circle-xmark"></i>
        
        </div>
      </div>
      <div className="estimate-header">
        <GetAllTaskList />
      </div>
    </div>
  )
}

export default AllTasksPage
