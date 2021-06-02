import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// 打开redux调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建store 第一个参数传reducer 合并后的reducer， 第二个参数传入enhancer 加强  applyMiddleware 合并多个中间件
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;