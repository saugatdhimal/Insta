import React, { useEffect } from 'react'

function NotFound() {
    useEffect(() => {
        document.title = "Not-Found - Instagram"
    }, [])
    return (
        <div>
            NOT FOUND
        </div>
    )
}

export default NotFound
