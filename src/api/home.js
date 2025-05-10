import request from './http'

/* 获取轮播图 */
export function getBanner() {
    return request({
        url: '/Banner',
        methods: 'get',
    })
}

/* 获取导航栏分类 */
/** *@param {Number} id **/
export function getClassPageAllTabs(params) {
    return request({
        url: '/GetClassPageAllTabs',
        methods: 'get',
        params
    })

}
/* 获取主页推荐 */
/** *@param {Number} id **/
export function getHomeRecommend(params) {
    return request({
        url: '/HomeRecommend',
        methods: 'get',
        params
    })
}

/* 模块化页面，type_id=0 */
/* 获取男女频道，type_id=12、19 */
/** *@param {Number} id **/
export function getClassPageLayout(params) {
    return request({
        url: '/GetClassPageLayout',
        methods: 'get',
        params
    })
}

/* 获取漫画列表页，type_id=6、9 */
/** *@param {Number} id **/
export function getClassPageSixComics(params) {
    return request({
        url: '/GetClassPageSixComics',
        methods: 'get',
        params
    })
}
/* 获取漫画feed */
/** *@param {Number} id **/
export function getHomeFeed(params) {
    return request({
        url: '/HomeFeed',
        methods: 'get',
        params
    })
}
/* 获取模块化页面推荐banner */
/** *@param {Number} id **/
export function getClassPageHomeBanner(params) {
    return request({
        url: '/GetClassPageHomeBanner',
        methods: 'get',
        params
    })
}