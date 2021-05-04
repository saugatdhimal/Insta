import React from 'react'
import PostHeader from './postHeader'
import Image from './image'
import Icons from './icons'
import Comment from './comment'

function Post() {
    return (
        <div className="post">
            <PostHeader />
            <Image />
            <Icons />
            <Comment />
        </div>
    )
}

export default Post
