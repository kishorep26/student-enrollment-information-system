'use client'
import React from 'react'
import '../globals.css'
import Replicate from './Replicate'
const Tabled = ({ data, rend, setchanged, uid, changed }) => {
  return (
    <div className='prose flex items-center justify-center text-xl normal-case'>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th> Class ID</th>
              <th>De Enroll</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {data.map((ele) => (
              <tr className='hover' key={ele}>
                <Replicate
                  id={ele}
                  key={ele}
                  rend={rend}
                  setchanged={setchanged}
                  uid={uid}
                  changed={changed}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tabled
