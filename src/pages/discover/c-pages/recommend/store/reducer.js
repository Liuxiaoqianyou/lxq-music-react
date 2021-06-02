import { Map } from 'immutable'

import * as actionTypes from './constants'

// 用immutable 性能更高  不用每次拷贝数据  fromJS会修改深层的东西
const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: [],
    upRanking: {},
    newRanking: {},
    originRanking: {}
})

function reducer (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNERS:
            // return {...state, topBanners: action.topBanners}
            // 通过set修改
            return state.set("topBanners", action.topBanners)
        case actionTypes.CHANGE_HOT_RECOMEND:
            return state.set("hotRecommends", action.hotRecommends)
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums", action.newAlbums)
        case actionTypes.CHANGE_UP_RANKING:
            return state.set("upRanking", action.upRanking)
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set("newRanking", action.newRanking)
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set("originRanking", action.originRanking)
        default:
            return state;
    }
}

export default reducer