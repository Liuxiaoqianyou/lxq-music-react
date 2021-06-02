import * as actionTypes from './constants'

import { 
    getTopBanners,
    getHotRecommends,
    getNewAlbums,
    getTopLists
 } from '@/services/recommend'

const changeTopBannerAction = (res) => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners
})

const changeHotRecommendAction = (res) => ({
    type: actionTypes.CHANGE_HOT_RECOMEND,
    hotRecommends: res.result
})

const changeNewAlbumAction = (res) => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.albums
})

const changeUpRankingAction = (res) => ({
    type: actionTypes.CHANGE_UP_RANKING,
    upRanking: res.playlist
})

const changeNewRankingAction = (res) => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking: res.playlist
})

const changeOriginRankingAction = (res) => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking: res.playlist
})

// dispatch(getTopBannerAction()) 为什么不直接传入getTopBannerAction？  因为可能还要传入参数
// getTopBannerAction() 又返回一个函数
export const getTopBannerAction = () => {
    return dispatch => {
        getTopBanners().then((res) => {
            dispatch(changeTopBannerAction(res))
        })
    }
}

export const getHotRecommendAction = (limit) => {
    return dispatch => {
        getHotRecommends(limit).then((res) => {
            dispatch(changeHotRecommendAction(res))
            // console.log(res)
        })
    }
}

// 为什么在派发前还要调用一次函数 因为我们要传递参数   派发的是该函数的返回值
export const getNewAlbumAction = (limit) => {
    return dispatch => {
        getNewAlbums(limit).then((res) => {
            // 传入函数则直接执行函数  传入对象则直接执行reducer 这里传入的是对象
            dispatch(changeNewAlbumAction(res))
            // console.log(res)
        })
    }
}

export const getTopListAction = (idx) => {
    return dispatch => {
        getTopLists(idx).then((res) => {
            switch (idx) {
                case 0:
                    dispatch(changeUpRankingAction(res))
                    break;
                case 2:
                    dispatch(changeNewRankingAction(res))
                    break;
                case 3:
                    dispatch(changeOriginRankingAction(res))
                    break;
                default:
                    break;
            }
        })
    }
}

  