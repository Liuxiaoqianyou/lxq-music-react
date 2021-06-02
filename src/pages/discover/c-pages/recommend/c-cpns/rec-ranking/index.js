import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getTopListAction} from '../../store/actionCreators'

import LXQTopRanking from '@/components/top-ranking'
import LXQThemeHeaderRCM  from '@/components/theme-header-rcm/index'
import { RankingWrapper } from './style'


export default memo(function LXQRecomendRanking() {

    const { upRanking, newRanking, originRanking } = useSelector(state => ({
        upRanking: state.getIn(["recommend", "upRanking"]),
        newRanking: state.getIn(["recommend", "newRanking"]),
        originRanking: state.getIn(["recommend", "originRanking"])
    }), shallowEqual)

// redux hooks
    const dispatch = useDispatch()
// other hooks
    useEffect(() => {
        dispatch(getTopListAction(0))
        dispatch(getTopListAction(2))
        dispatch(getTopListAction(3))
    }, [dispatch])

    return (
        <RankingWrapper>
            <LXQThemeHeaderRCM title="榜单"/>
            <div className="tops">
                <LXQTopRanking info={upRanking}/>
                <LXQTopRanking info={newRanking}/>
                <LXQTopRanking info={originRanking}/>
            </div>
        </RankingWrapper>
    )
})