import React from 'react'

export default function Photo({url, goBack, switchphoto,imageIndex,imageArrayLength}) {
  return (
    <div className='popup'>
      <button className='btn-sm btn-cross' onClick={goBack}>✕</button>
      {console.log(imageIndex)}
      <div className="arrows">
        <button className='btn-arrow' disabled={imageIndex<=0} onClick={()=>{switchphoto('left')}}>&#x3c;</button>
        <button className='btn-arrow' disabled={imageIndex>=imageArrayLength-1} onClick={()=>{switchphoto('right')}}>&#x3e;</button>
      </div>
      <div className="popup-image-box">
        <img src={url} alt="54545" />
      </div>
    </div>
  )
}
