import request from './http'

/* 热门搜索推荐 */
/** *@param {Number} id **/
export function getSearchRecommend(params) {
    return request({
        url: '/SearchRecommend',
        methods: 'get',
        params
    })
}

/* 热门搜索banner */
export function getSearchBanner() {
    return request({
        url: '/SearchBanner',
        methods: 'get',
    })
}

/* 搜索建议关键词 */
/** *@param {Number} id **/
export function getSearchSug(params) {
    return request({
        url: '/SearchSug',
        methods: 'get',
        params
    })
}