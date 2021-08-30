import { combineReducers } from 'redux-immutable';
import {reducer as recommendReducer} from '../pages/discover/c-pages/recommend/store/index'
import { reducer as playerReducer} from '../pages/player/store/index'

// 合并reducer
const cReducer = combineReducers({
    recommend: recommendReducer,
    player: playerReducer
})

export default cReducer;