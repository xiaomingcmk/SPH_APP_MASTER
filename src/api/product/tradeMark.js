// 这个模块主要获取品牌管理数据的模块
import request from '@/utils/request'
// 获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 处理添加品牌
// /admin/product/baseTrademark/save  POST 携带两个参数：品牌名称、品牌logo

// 修改品牌
// /admin/product/baseTrademark/update PUT 携带三个参数：id、品牌名称、品牌logo

export const reqAddOrUpdateTradeMark = (tradeMark) => {
    // 带给服务器数据携带 id --修改品牌操作
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        // 新增品牌操作
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}

// 删除品牌的接口
// /admin/product/baseTrademark/remove/{id}  delete
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })