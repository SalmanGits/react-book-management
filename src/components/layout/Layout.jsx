import React from 'react'
import Sidebar from '../pages/sidebar/Sidebar'

const Layout = ({ children }) => {
    return (
        <div className='layout_container'>
            <div className='layout_left_column'>
                <Sidebar />
            </div>
            <div className='layout_right_column'>
                {children}
            </div>
        </div>

    )
}

export default Layout