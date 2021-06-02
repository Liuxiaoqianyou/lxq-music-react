import React, { memo } from 'react'

import LXQTopBanner from './c-cpns/top-banner'
import LXQHotRecommend from './c-cpns/hot-recommend'
import LXQNewAlbum from './c-cpns/new-album'
import LXQRecomendRanking from './c-cpns/rec-ranking'
import LXQUserLogin from './c-cpns/user-login'
import LXQSttleSinger from './c-cpns/settle-singer'
import LXQHotAnchor from './c-cpns/hot-anchor'
import { 
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight 
} from './style'

function LXQRecommend(props) {

    return (
        <RecommendWrapper> 
            <LXQTopBanner/>
            <Content className="wrap-v2">
                <RecommendLeft>
                    <LXQHotRecommend></LXQHotRecommend>
                    <LXQNewAlbum></LXQNewAlbum>
                    <LXQRecomendRanking></LXQRecomendRanking>
                </RecommendLeft>
                <RecommendRight>
                    <LXQUserLogin></LXQUserLogin>
                    <LXQSttleSinger></LXQSttleSinger>
                    <LXQHotAnchor></LXQHotAnchor>
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
}


export default memo(LXQRecommend);


// function LXQRecommend(props) {
//     const {getBanners, topBanners} = props

//     useEffect(() => {
//         getBanners()
//     }, [getBanners])

//     return (
//         <div> 
//             <h2>LXQRecommend</h2>
//             <h2>{topBanners.length}</h2>
//         </div>
//     )
// }

// const mapStateToProps = state => ({
//     topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//     getBanners: () => {
//         dispatch(getTopBannerAction())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(LXQRecommend)) ;