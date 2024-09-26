import React from 'react'

const Card = ({ 
  title, 
  confirmationNumber,
  location, 
  titleData1,
  data1, 
  titleData2, 
  data2, 
  titleData3, 
  data3,
}) => {

  return (
    <div className='journi-card-simple'>
      {title ? <div className='journi-card-title'>{title}</div> : null}
      {confirmationNumber ?<div><span className="font-bold">Confirmation:</span> {confirmationNumber}</div> : null}
      {location ?  <div><span className="font-bold">Location:</span> {location}</div> : null}
      {data1 ? <div><span className="font-bold">{titleData1}</span> {data1}</div> : null}
      {data2 ? <div><span className="font-bold">{titleData2}</span> {data2}</div> : null}
      {data3 ? <div><span className="font-bold">{titleData3}</span> {data3}</div> : null}
    </div>
  )
}

export default Card