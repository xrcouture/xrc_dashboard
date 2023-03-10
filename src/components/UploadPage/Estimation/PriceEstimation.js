import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../../Context'

const PriceEstimation = (props) => {

  const { costData, daysData } = useContext(Context)
  const [cost, setCost] = costData
  const [days, setDays] = daysData

  const fav = Object.keys(props.platforms)
    .filter((key) => props.platforms[key])

  useEffect(() => {
    setCost(() => fav.length * 25)
    setDays(() => fav.length * 3)
  }, [fav.length])


  return (
    <>
      {/* {console.log(props.platforms)} */}
      <div className='d-flex justify-content-around mt-5'>
        <div>
          <h4>Approximate Budget:
            <div className='text-center mt-3' style={{fontSize: "5rem"}}>${cost}</div>
          </h4>
        </div>

        <div>
          <h4>Expected Delivery Time:
            <div className='text-center mt-3' style={{fontSize: "5rem"}}>{days}d</div>
          </h4>
        </div>

      </div>
    </>
  )
}

export default PriceEstimation