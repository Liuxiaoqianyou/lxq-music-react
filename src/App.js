// rmc 创建函数式组件外面包裹memo
import React, { memo } from 'react'

export default memo(function App() {
    return (
        <div>
            <h2>aaa</h2>
        </div>
    )
})
