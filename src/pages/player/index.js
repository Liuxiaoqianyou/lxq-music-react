import React, { memo } from 'react'

import {
    PlayerWrapper,
    PlayerLeft,
    PlayerRight
} from './style'

export default memo(function LXQPlayer() {
    return (
        <PlayerWrapper>
            <div className="content wrap-v2">
                <PlayerLeft>
                    <h2>LXQPlayerInfo</h2>
                    <h2>LXQSongContent</h2>
                </PlayerLeft>
                <PlayerRight>
                    <h2>LXQSimiPlaylist</h2>
                    <h2>LXQSimiSong</h2>
                    <h2>Download</h2>
                </PlayerRight>
            </div>
        </PlayerWrapper>
    )
})
