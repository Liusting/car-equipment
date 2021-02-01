// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import {http} from './http'; // 引入封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项

// 每一个接口定义一个函数，然后暴露出去，供逻辑代码调用
/**
 * 购物车接口
 */
//1.购物车删除商品
function deleteCart(params) {
    http('/spCart/deleteCart', 'post', params) //接口请求的路由地址以及请求方法在此处传递
}

//2.购物车数量修改（1.参数cartId和cartNumber）
function updateCartNumber(params) {
    http('/spCart/updateCartNumber', 'post', params)
}

//3.加入购物车
function addCart(params) {
    http('/spCart/insertCart', 'post', params)
}

//4.购物车列表
function cartList(params) {
    http('/spCart/getCartDetail', 'post', params)
}

//5.获取购物车总数
function getCartTotal(params) {
    http('/spCart/getCartTotal', 'post', params)
}

/**
 * 用户收货地址接口
 */
//1.用户地址列表（参数是userId）
function getAddressList(params) {
    http('/spAddress/getAddressList', 'post', params)
}

//2.删除用户地址（参数是id）
function deleteAddress(params) {
    http('/spAddress/deleteAddress', 'post', params)
}

//3.修改收货地址
function updateAddress(params) {
    http('/spAddress/updateAddress', 'post', params)
}

//4.新增收货地址
function addAddress(params) {
    http('/spAddress/insertAddress', 'post', params)
}

//5.根据id获取地址信息
function getOneAddress(params) {
    http('/spAddress/getOneAddress', 'get', params)
}

//6.订单默认地址
function getDefaultAddress(params) {
    http('/spOrder/getDefaultAddress', 'get', params)
}

/**
 * 商品管理接口
 */
//1.商品模糊搜索
function getSearchList(params) {
    http('/spItem/getSearchList', 'post', params)
}

//2.根据用户输入字段查询商品列表
function getItemList(params) {
    http('/spItem/getSpItem2', 'post', params)
}

/**
 * 商品收藏接口
 */
//1.查询商品收藏列表'
function getItemCollectionList(params) {
    http('/spItem/getItemCollectionList', 'get', params)
}

/**
 * 店铺收藏接口
 */
//1.查询店铺收藏列表'
function getShopCollection(params) {
    http('/spItem/getShopCollection', 'get', params)
}

//2.取消店铺收藏
function cancelShopCollection(params) {
    http('/spItem/cancelShopCollection', 'post', params)
}

//3.收藏店铺
function addShopCollection(params) {
    http('/spItem/addShopCollection', 'post', params)
}

/**
 * 订单接口
 */
//1.订单详情
function orderDetail(params) {
    http('/spOrder/orderDetail', 'get', params)
}

//订单列表
function getOrderList(params) {
    http('/spOrder/getOrderList', 'post', params)
}

//订单评价
function getAppraise(params) {
    http('/spOrder/getAppraise', 'post', params)
}

/**
 * 退款原因接口
 */
function getRefundTypeList(params) {
    http('/spRefund/refundTypeList', 'get', params)
}

/**
 * 首页-新品榜单接口
 */
function getRecommendList(params) {
    http('/spHome/recommendList', 'get', params)
}

/**
 * 优惠券接口
 */

//用户优惠券列表查询
function getUserCouponList(params) {
    http('/spCoupon/getUserCounpon', 'get', params)
}

function getUserInfoMessage(params) {
    http('/decodeUserInfo', 'post', params)
}

export default { // 暴露接口
    /**
     * 1.购物车接口暴露
     */
    updateCartNumber,
    deleteCart,
    addCart,
    cartList,
    getCartTotal,
    /**
     * 2.用户收货地址接口暴露
     */
    getAddressList,
    deleteAddress,
    updateAddress,
    addAddress,
    getOneAddress,
    getDefaultAddress,
    /**
     * 3.商品管理接口暴露
     */
    getSearchList,
    getItemList,

    /**
     * 4.商品收藏接口暴露
     */
    getItemCollectionList,

    /**
     * 5.店铺收藏接口暴露
     */
    getShopCollection,
    cancelShopCollection,
    addShopCollection,

    /**
     * 6.订单接口
     */
    orderDetail,
    getAppraise,
    getOrderList,

    /**
     * 7.退款原因接口
     */
    getRefundTypeList,
    /**
     * 8.首页新品榜单接口
     */
    getRecommendList,

    /**
     * 8.优惠券接口
     */
    getUserCouponList,

    /**
     * 用户信息
     */
    getUserInfoMessage
}