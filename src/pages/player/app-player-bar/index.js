import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {getSizeImage, formatMinuteSecond, getPlaySong} from '@/utils/format-utils'

import { Slider, message } from 'antd';
import { 
    PlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'
import { 
    getSongDetailAction,
    changeSequenceAction,
    changeCurrentIndexAndSongAction,
    changeCurrentLyricIndexAction
} from '../store/actionCreators'



export default memo(function LXQAppPlayerBar() {
    // props and state
    const [currentTime, setCurrentTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isChangeing, setIsChanging] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(state => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player", "sequence"]),
        lyricList: state.getIn(["player", "lyricList"]),
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
    }), shallowEqual)
    // other hooks  
    // 将网络请求放到redux中管理
    // useEffect(() => {
    //     getSongDetail(167876).then((res) => {
    //         console.log(res)
    //     })
    // },[])

    const dispatch = useDispatch();

    const audioRef = useRef()

    useEffect(() => {
        dispatch(getSongDetailAction(167876))
    },[dispatch])

// other handle 判断有值的情况下再去拿数据
const picUrl = (currentSong.al && currentSong.al.picUrl) || ""
const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手"
const duration = currentSong.dt || 0

// 设置播放的歌曲
useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current.play().then(res => {
        setIsPlaying(true);
    }).catch(err => {
        setIsPlaying(false)
    })
},[currentSong])

// handle
const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
},[isPlaying])

// onTimeUpdate 当歌曲开始播放 时间开始改变 执行这个回调
const timeUpdate = (e) => {
    // console.log(e.target.currentTime)
    // 当进度条不是正在发生改变的时候执行
    let currentTimeE = e.target.currentTime
    if(!isChangeing) {
        setCurrentTime(currentTimeE * 1000)
        setProgress(currentTime / duration * 100)
    }

    // 获取当前的歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
        let lyricItem = lyricList[i];
        if ( currentTimeE * 1000 < lyricItem.time) {
            break
        }
    }
    
    if (currentLyricIndex !== i -1) {
        // console.log(lyricList[i-1])
        dispatch(changeCurrentLyricIndexAction(i - 1))
        const content = lyricList[i - 1] && lyricList[i - 1].content
        message.open({
            key:"lyric",
            content: content,
            duration: 0,
            className: "lyric-class"
        })

    }

}


// 当把一个回调函数传到自定义组件的时候用useCallback做包裹
// 当拖动进度条该函数执行
const sliderChange = useCallback((value) => {
    setIsChanging(true)
    const currentTime = value / 100 * duration;
    setCurrentTime(currentTime)
    setProgress(value)
},[duration])
// 当拖动进度条鼠标弹起该函数执行
const sliderAfterChange = useCallback((value) => {
    const currentTime = value / 100 * duration /1000
    audioRef.current.currentTime = currentTime
    setCurrentTime(currentTime * 1000)
    setIsChanging(false)

    if(!isPlaying) {
        playMusic()
    }
},[duration, isPlaying, playMusic])

const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
        currentSequence = 0
    }
    dispatch(changeSequenceAction(currentSequence))
}

const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag))
}

const handleMusicEnded = () => {
    if (sequence === 2) { //单曲循环
        audioRef.current.currentTime = 0
        audioRef.current.play()
    } else {
        dispatch(changeCurrentIndexAndSongAction(1))
    }
}

    return (
        <PlaybarWrapper className="sprite_player">
            <div className="content wrap-v2">
                <Control isPlaying={isPlaying}>
                    <button className="sprite_player prev" 
                            onClick={e => changeMusic(-1)}></button>
                    <button className="sprite_player play" 
                            onClick={e => playMusic()}></button>
                    <button className="sprite_player next"
                            onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    <div className="image">
                        <NavLink to="/discover/player">
                            <img src={getSizeImage(picUrl, 35)} alt="图片"/>
                        </NavLink>
                    </div>
                    <div className="info">
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href="#/" className="singer-name">{singerName}</a>
                        </div>
                        <div className="progress">
                            <Slider defaultValue={30} 
                                    value={progress}
                                    onChange={sliderChange}
                                    onAfterChange={sliderAfterChange}/>
                            <div className="time">
                                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                                <span className="divider">/</span>
                                <span className="duration">{formatMinuteSecond(duration)}</span>
                            </div>
                        </div>
                    </div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_player">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop" onClick={e => {changeSequence()}}></button>
                        <button className="sprite_player btn playlist"></button>
                    </div>
                </Operator>
            </div>
            <audio ref={audioRef} 
                    onTimeUpdate={timeUpdate} 
                    onEnded={e => handleMusicEnded()}/>
        </PlaybarWrapper>
    )
})
