import React, { useState, useEffect } from 'react'

const PriceEstimation = (props) => {

  const [cost, setCost] = useState(0)
  const [days, setDays] = useState(0)

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
            <h1 className='text-center mt-3'>${cost}</h1>
          </h4>
        </div>

        <div>
          <h4>Expected Delivery Time:
            <h1 className='text-center mt-3'>{days}d</h1>
          </h4>
        </div>

      </div>
    </>
  )
}

export default PriceEstimation