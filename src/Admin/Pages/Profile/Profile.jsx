import React from 'react'
import '../Profile/Profile.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import ProfileDetails from '../../Components/ProfileDetails/ProfileDetails'
export default function Profile(props) {
  const formType=props.formType;
  return (
    <div className='ProfileContainer'>
      <Sidebar />
      <ProfileDetails formType={formType} />
    </div>
  )
}
