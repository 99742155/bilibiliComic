import request from './http'

/* 个人用户信息 */
/** *@param {Number} id **/
export function getBaseSpaceInfo(params) {
    return request({
        url: '/GetBaseSpaceInfo',
        methods: 'get',
        params
    })
}

/* 个人漫画助攻 */
/** *@param {Number} id **/
export function getBestFavComic(params) {
    return request({
        url: '/GetBestFavComic',
        methods: 'get',
        params
    })
}

/* 个人点评列表 */
/** *@param {Number} id **/
export function getReviews(params) {
    return request({
        url: '/GetReviews',
        methods: 'get',
        params
    })
}

/* 个人收藏列表 */
/** *@param {Number} id **/
export function getFavComics(params) {
    return request({
        url: '/GetFavComics',
        methods: 'get',
        params
    })
}

/* 用户额外信息 */
/** *@param {Number} id **/
export function getListUsersInfo(params) {
    return request({
        url: '/ListUsersInfo',
        methods: 'get',
        params
    })
}