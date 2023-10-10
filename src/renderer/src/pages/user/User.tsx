import React from 'react'
import Single from '@renderer/components/client/single/Single'

import { singleUser } from '../../data'
import './user.scss'

const User = (): React.JSX.Element => {
  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  )
}

export default User
