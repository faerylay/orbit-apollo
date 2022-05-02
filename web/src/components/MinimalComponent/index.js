import React from 'react'
import { Outlet } from 'react-router-dom'

const MinimalLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
export default MinimalLayout;
