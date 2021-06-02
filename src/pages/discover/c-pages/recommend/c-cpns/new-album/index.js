import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import LXQAlbumCover from '@/components/album-cover/index'
import LXQThemeHeaderRCM from '@/components/theme-header-rcm/index'
import { AlbumWrapper } from './style'


export default memo(function LXQNewAlbum() {


    // redux hook
    // shallowEqual做性能优化浅层比较 如果一样函数不会重新执行
    // useSelector作用从redux的store对象中提取数据(state)。
    const { newAlbums } = useSelector(state => ({
        newAlbums: state.getIn(["recommend", "newAlbums"])
    }), shallowEqual)
    // console.log(newAlbums)
    const  dispatch = useDispatch()
    useEffect(() => {
    //派发获取数据的函数 这个函数被封装在action里
    // getNewAlbums(10).then(res => {
    //     console.log(res)
    // })
    // dispatch的是这个函数的返回值
    dispatch(getNewAlbumAction(10))
    }, [dispatch])

    
    const pageRef = useRef()

    return (
        <AlbumWrapper>
            <LXQThemeHeaderRCM title="新碟上架"/>
            <div className="content">
                <button className="arrow arrow-left sprite_02"
                        onClick={e => pageRef.current.prev()}></button>
                    <div className="album">
                        <Carousel dots={false} ref={pageRef}>
                            {
                                [0, 1].map(item => {
                                    return (
                                        <div key={item} className="page">
                                            {
                                                newAlbums.slice(item*5, (item + 1)*5).map((iten) => {
                                                    return <LXQAlbumCover   key={iten.id} 
                                                                            info={iten} 
                                                                            size={100} 
                                                                            width={118}
                                                                            bgp="-570px"/>
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                <button className="arrow arrow-right sprite_02"
                        onClick={e => pageRef.current.next()}></button>
            </div>
        </AlbumWrapper>
    )
})
