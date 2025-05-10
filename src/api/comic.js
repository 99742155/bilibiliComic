import request from './http'

/* 漫画详情 */
/** *@param {Number} id **/
export function getComicDetail(params) {
    return request({
        url: '/ComicDetail',
        methods: 'get',
        params
    })
}
/* 精选漫画点评 */
/** *@param {Number} id **/
export function getReviewDetailByComicID(params) {
    return request({
        url: '/GetReviewDetailByComicID',
        methods: 'get',
        params
    })
}
/* 漫画点评列表 */
/** *@param {Number} id **/
export function getListReviews(params) {
    return request({
        url: '/ListReviews',
        methods: 'get',
        params
    })
}
/* 漫画评论列表 */
/** *@param {Number} id **/
export function getReplyMain(params) {
    return request({
        url: '/ReplyMain',
        methods: 'get',
        params
    })
}
/* 漫画评论回复列表 */
/** *@param {Number} id **/
export function getReplyDetail(params) {
    return request({
        url: '/ReplyDetail',
        methods: 'get',
        params
    })
}
/* 漫画周边 */
/** *@param {Number} id **/
export function getShopItems(params) {
    return request({
        url: '/GetShopItems',
        methods: 'get',
        params
    })
}
/* 推荐漫画漫画 */
/** *@param {Number} id **/
export function moreRecommend(params) {
    return request({
        url: '/MoreRecommend',
        methods: 'get',
        params
    })
}

/* 漫画章节内容索引 */
/** *@param {Number} id **/
export function getImageIndex(params) {
    return request({
        url: '/GetImageIndex',
        methods: 'get',
        params
    })
}

/* 漫画章节内容Token */
/** *@param {Number} id **/
export function imageToken(params) {
    return request({
        url: '/ImageToken',
        methods: 'get',
        params
    })
}