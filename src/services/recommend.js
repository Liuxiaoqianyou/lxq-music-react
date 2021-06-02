import request from './request';

export function getTopBanners () {
    return request({
        url: "/banner"
    })
}

export function getHotRecommends (limit) {
    return request({
        // url: "/personalized?limit=8",
        url: "/personalized",
        params: {
            // limit: 8
            limit
        }
    })
}

export function getNewAlbums(limit) {
    return request({
        url: "/top/album",
        params: {
            limit
        }
    })
}

export function getTopLists(idx) {
    return request({
        url: "/top/list",
        params: {
            idx
        }
    })
}