import React from 'react'


function Image({imageSrc}) {

    return (
        <div className="image">
           <img src={imageSrc} alt="" style={{width: '100%', maxHeight: '700px'}}/>
        </div>
    )
}

export default Image
