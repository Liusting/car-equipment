var app = getApp();
import http from '../../../../utils/api'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        deviceW: '',//屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        address_info: [],
        spList: [],
        trade_status: ''
    },
    // 
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (e) {
    },
    //点击店铺跳到店铺首页
    gotoShop: function (e) {
        var shopId = e.currentTarget.dataset.shopid
        var shopname = e.currentTarget.dataset.shopname
        wx.navigateTo({
            url: '../shop/shop?shopId=' + shopId + '&shopName=' + shopname
        })
    },
    onLoad: function (e) {
        this.setData({
            trade_status: e.trade_status
        })
        console.log(e);
        var that = this;
        let id = e.id;
        let shop_id = e.shop_id;
        http.orderDetail({
            data: {
                id: id,
                shop_id: shop_id
            },
            success(res) {
                console.log(res);
                that.setData({
                    address_info: res.orderDetail.addressDetail,
                    spList: res.orderDetail.detailList,
                })
            }
        })

        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth,//当前屏幕宽度
                    deviceH: res.windowHeight//当前屏幕高度
                })
            }
        });

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    //联系卖家
    chat: function (e) {
        wx.navigateTo({
            url: '../sp_order_list/chat',
        })
    },
    //拨打电话
    call: function (e) {
        wx.makePhoneCall({
            phoneNumber: '13047838940',
        })
    },
//点击店铺
    shop: function () {
        wx.navigateTo({
            url: '../shop/shop'
        })
    },
    // 取消订单
    closeOrder: function (e) {
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})