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
        spList: [{
            "trade_status": "1",
            "children": [{
                    "number": 1,
                    "pay_status": "1",
                    "money": 1899.0,
                    "item_id": "1",
                    "type_id": "2555",
                    "trade_status": "1",
                    "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                    "display": "1",
                    "name": "罗浮威尔通体大理石瓷砖800x800简约现代灰色客厅防滑耐磨地板砖",
                    "typeName": "经典方形三档套装;8寸",
                    "id": "1",
                    "order_id": "20200522100218863744"
                },
                {
                    "number": 1,
                    "pay_status": "1",
                    "money": 1899.0,
                    "item_id": "1",
                    "type_id": "2555",
                    "trade_status": "1",
                    "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                    "display": "1",
                    "name": "罗浮威尔通体大理石瓷砖800x800简约现代灰色客厅防滑耐磨地板砖",
                    "typeName": "经典方形三档套装;8寸",
                    "id": "1",
                    "order_id": "20200522100218863744"
                }
            ]
        }
        ],
        trade_status: '1'
    },
    // 
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (e) {
    },

    // 确认收货
    confirmGet: function (e) {
        console.log(e);
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '您确认收到宝贝了吗？',
            success(res) {
                if (res.confirm) {
                    wx.request({
                        url: app.ipAndPort + '/spOrder/confirmReceive',
                        method: 'POST',
                        data: {
                            id: e.currentTarget.dataset.id,
                            trade_status: that.data.currtab
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            if (res.code == 1) {
                                that.orderListShow();
                                wx.showToast({
                                    title: '收货成功',
                                    icon: 'success',
                                    duration: 2000,
                                })
                            }
                        }
                    })
                }
            }
        })
    },
    //提醒卖家发货
    remind: function () {
        wx.showToast({
            title: '主人~提醒成功',
            icon: 'success'
        })
    },
    onLoad: function (e) {
        this.setData({
            trade_status: e.tradestatus
        })
        console.log(e);
        var that = this;
        let id = e.id;
        let shop_id = e.shop_id;
        // http.orderDetail({
        //     data: {
        //         id: id,
        //         shop_id: shop_id
        //     },
        //     success(res) {
        //         console.log(res);
        //         that.setData({
        //             address_info: res.orderDetail.addressDetail,
        //             spList: res.orderDetail.detailList,
        //         })
        //     }
        // })

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