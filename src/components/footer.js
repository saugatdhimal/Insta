import React from 'react'
import '../styles/footer.scss'

function Footer() {
    return (
        <div className="footer">
            <div className="footer__top">
                <div>
                <p>about</p>
                <p>Blog</p>
                <p>jobs</p>
                </div>
                <div>
                <p>help</p>
                <p>api</p>
                <p>privacy</p>
                </div>
                <div>
                <p>terms</p>
                <p>hastags</p>
                <p>locations</p>
                </div>
            </div>
            <div className="footer__bottom">
            <p>english </p>
            <p> &copy; 2021 Instagram from facebook</p>
            </div>
        </div>
    )
}

export default Footer
