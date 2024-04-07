import React from 'react'
import '../Requests/Requests.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import RequestDetails from '../../Components/RequestsDetails/RequestDetails'
export default function Requests() {
  return (
    <div className='RequestContainers'>
      <Sidebar />
      <RequestDetails />
    </div>
  )
}
