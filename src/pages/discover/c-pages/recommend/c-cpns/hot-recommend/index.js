import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HOT_RECOMMEND_LIMIT } from '@/common/contants'

import LXQThemeHeaderRCM  from '@/components/theme-header-rcm/index'
import LXQSongsCover from '@/components/songs-cover/index'
import { HotRecommendWrapper } from "./style"
import { getHotRecommendAction } from '../../store/actionCreators'


export default memo(function LXQHotRecommend() {
    // 内部state

    // redux hooks
    const { hotRecommends } = useSelector(state => ({
        hotRecommends: state.getIn(["recommend", "hotRecommends"])
    }), shallowEqual)
    const dispatch = useDispatch();

    // 其他hooks
    useEffect(() => {
        dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
    }, [dispatch])

    return (
        <HotRecommendWrapper>
            <LXQThemeHeaderRCM title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]}/>
            <div className="recommend-list">
                {
                   hotRecommends.map((item, index) => {
                        return <LXQSongsCover key={item.id} info={item}/>
                   })
                }
            </div>
        </HotRecommendWrapper>
    )
})
