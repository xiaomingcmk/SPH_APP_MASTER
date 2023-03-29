// 引入 axios，对 axios 进行二次包装
import request from '@/utils/request'

// 对外暴露登录接口函数
export function login(data) {
    return request({
        url: '/admin/acl/index/login',
        method: 'post',
        data
    })
}

// 对外暴露获取信息的函数
export function getInfo(token) {
    return request({
        url: '/admin/acl/index/info',
        method: 'get',
        params: {
            token
        }
    })
}

// 对外暴力退出登录的函数
export function logout() {
    return request({
        url: '/admin/acl/index/logout',
        method: 'post'
    })
}