import request from './http'

/* 获取分类页所有分类 */
/** *@param {Number} id **/
export function GetallLabel(params) {
    return request({
        url: '/AllLabel',
        methods: 'get',
        params
    })
}
/* 获取分类页筛选 */
/** *@param {Number} id **/
export function GetClassPage(params) {
    return request({
        url: '/ClassPage',
        methods: 'get',
        params
    })
}