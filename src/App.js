// rmc 创建函数式组件外面包裹memo
// 导入第三方
import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

// 导入工具类
import routes from '@/router'
import store from '@/store'

// 导入组件
import { BrowserRouter } from 'react-router-dom'
import LXQAppFooter from '@/components/app-footer'
import LXQAppHeader from '@/components/app-header'
import LXQAppPlayerBar from './pages/player/app-player-bar'

export default memo(function App() {
    return (
        <Provider store={store}>
            {/* <HashRouter> 带#号 */}
            <BrowserRouter>
                <LXQAppHeader />
                {renderRoutes(routes)}
                <LXQAppFooter />
                <LXQAppPlayerBar/>
            </BrowserRouter>
        </Provider>
       
    )
})
