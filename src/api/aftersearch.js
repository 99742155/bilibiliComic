import request from './http'

/* 搜索后 */
/** *@param {Number} id **/
export function getSearch(params) {
    return request({
        url: '/Search',
        methods: 'get',
        params
    })
}