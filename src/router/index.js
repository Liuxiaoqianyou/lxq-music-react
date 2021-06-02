import React from 'react'
import { Redirect } from 'react-router-dom';

import LXQDiscover from '@/pages/discover'
import LXQMine from '@/pages/mine'
import LXQFriend from '@/pages/friend'

import LXQAlbum from '@/pages/discover/c-pages/album'
import LXQArtist from '@/pages/discover/c-pages/artist'
import LXQDjradio from '@/pages/discover/c-pages/djradio'
import LXQRanking from '@/pages/discover/c-pages/ranking'
import LXQRecommend from '@/pages/discover/c-pages/recommend'
import LXQSongs from '@/pages/discover/c-pages/songs'



const routes = [
    {
        path: "/",
        exact: true,
        // component: LXQDiscover,   
        // 重定向
        render: () => (
            <Redirect to="/discover"/>
        )
    },
    {
        path: "/discover",
        component: LXQDiscover,
        routes: [
            {
                path: "/discover",
                exact: true,
                render: () => (
                    <Redirect to="/discover/recommend"/>
                )
            },
            {
                path: "/discover/recommend",
                component: LXQRecommend
            },
            {
                path: "/discover/ranking",
                component: LXQRanking
            },
            {
                path: "/discover/songs",
                component: LXQSongs
            },
            {
                path: "/discover/djradio",
                component: LXQDjradio
            },
            {
                path: "/discover/artist",
                component: LXQArtist
            },
            {
                path: "/discover/album",
                component: LXQAlbum
            },
        ]
    },
    {
        path: "/mine",
        component: LXQMine 
    },
    {
        path: "/friend",
        component: LXQFriend 
    }
];

export default routes;