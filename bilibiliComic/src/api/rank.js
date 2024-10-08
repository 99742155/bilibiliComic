import request from './http'

/* 排行榜列表 */
/** *@param {Number} id **/
export function getListRank(params) {
    return request({
        url: '/ListRank',
        methods: 'get',
        params
    })
}

/* 排行榜详情 */
/** *@param {Number} id **/
export function getRankInfo(params) {
    return request({
        url: '/GetRankInfo',
        methods: 'get',
        params
    })
}