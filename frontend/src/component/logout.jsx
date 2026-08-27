import React from 'react'
import Link from 'next/link'

const logout = () => {
  return (
    <div className='px-3 py-2 bg-primary border rounded-xl '>
        <Link href="/logout" >Logout</Link>
    </div>
  )
}

export default logout