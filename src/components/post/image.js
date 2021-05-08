import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton';


function Image({imageSrc}) {
const [imgLoaded, setImgLoaded] = useState(false);
const onLoad = () => {
    setImgLoaded(true)
}
    return (
        <div className="image">
            {!imgLoaded && <Skeleton height={500}/>}
           <img src={imageSrc} alt="" style={{width: '100%', maxHeight: '700px'}} onLoad={onLoad}/>
        </div>
    )
}

export default Image
