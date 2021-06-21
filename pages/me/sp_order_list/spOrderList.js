var app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        currtab: '',
        swipertab: [{
                name: '全部',
                index: 0
            },
            {
                name: '待付款',
                index: 1
            },
            {
                name: '待发货',
                index: 2
            },
            {
                name: '待收货',
                index: 3
            },
            {
                name: '待评价',
                index: 4
            },
        ],
        orderList: [{
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


        }, {
            "trade_status": "2",
            "children": [{
                "number": 5,
                "pay_status": "1",
                "money": 1699.0,
                "item_id": "4",
                "type_id": "1",
                "trade_status": "2",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "display": "1",
                "name": "龙鼎天著木门定制烤漆环保静音门家用室内门LA-014",
                "typeName": "大方体方形四档套装-旗舰款;10寸",
                "id": "d1f33a1519a04993a56cbc2c2f3c3c5b",
                "order_id": "20200522100218863742"
            }]

        }, {
            "trade_status": "3",
            "children": [{
                "number": 5,
                "pay_status": "1",
                "money": 1699.0,
                "item_id": "4",
                "type_id": "1",
                "trade_status": "2",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "display": "1",
                "name": "龙鼎天著木门定制烤漆环保静音门家用室内门LA-014",
                "typeName": "大方体方形四档套装-旗舰款;10寸",
                "id": "d1f33a1519a04993a56cbc2c2f3c3c5b",
                "order_id": "20200522100218863742"
            }]
        }, {
            "trade_status": "4",
            "children": [{
                "number": 5,
                "pay_status": "1",
                "money": 1699.0,
                "item_id": "4",
                "type_id": "1",
                "trade_status": "2",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "display": "1",
                "name": "龙鼎天著木门定制烤漆环保静音门家用室内门LA-014",
                "typeName": "大方体方形四档套装-旗舰款;10寸",
                "id": "d1f33a1519a04993a56cbc2c2f3c3c5b",
                "order_id": "20200522100218863742"
            }]
        }, {

            "trade_status": "5",
            "children": [{
                "number": 5,
                "pay_status": "1",
                "money": 1699.0,
                "item_id": "4",
                "type_id": "1",
                "trade_status": "2",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "display": "1",
                "name": "龙鼎天著木门定制烤漆环保静音门家用室内门LA-014",
                "typeName": "大方体方形四档套装-旗舰款;10寸",
                "id": "d1f33a1519a04993a56cbc2c2f3c3c5b",
                "order_id": "20200522100218863742"
            }]
        }],
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (e) {},
    onLoad: function (e) {
        var that = this;

        setTimeout(function () {
            wx.hideLoading()
        }, 2000)

        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        })
        this.setData({
            currtab: e.typeId,
        })
        this.tabChange(this.data.currtab)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 页面渲染完成

    },

    //查看物流
    expressDetail: function (e) {
        wx.navigateTo({
            url: '../sp_order_list/expressInformation/expressInformation',
        })
    },
    //退货/退款
    applyRefund: function (e) {
        let id = e.currentTarget.dataset.id;
        let shop_id = e.currentTarget.dataset.shopid;
        let tradestatus = e.currentTarget.dataset.tradestatus;
        wx.navigateTo({
            url: '../sp_order_list/applyRefund/applyRefund'
        })
    },
    // 订单详情页
    orderDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        let shop_id = e.currentTarget.dataset.shopid;
        let tradestatus = e.currentTarget.dataset.tradestatus;
        console.log(e);
        wx.navigateTo({
            url: '../sp_order_list/orderDetail/orderDetail?tradestatus=' + tradestatus
        })
    },
    /**
     * @Explain：选项卡点击切换
     */
    tabSwitch: function (e) {
        var that = this
        if (this.data.currtab === e.target.dataset.current) {
            return false
        } else {
            that.setData({
                currtab: e.target.dataset.current
            })
        }
        this.tabChange(this.data.currtab)
    },

    tabChange: function (e) {
        var that = this;
        this.setData({
            currtab: e
        })
        this.orderjj();
    },
    orderjj() {
        wx.request({
            url: 'http://mock-api.com/PKeZpPz0.mock/orderList',
            method: 'GET',
            success: function (res) {
                console.log(res);
            }
        })
    },

    // 点击立即评价
    appraise: function (e) {
        console.log(e);
        wx.navigateTo({
            url: '../appraise/appraise?itemId=' + e.currentTarget.dataset.id + '&index=' + this.data.currtab,
        })
    },
    // 取消订单
    cancelOrder: function (e) {
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '确定取消订单吗？',
            success(res) {
                if (res.confirm) {
                    setTimeout(function () {
                        wx.showToast({
                            title: '取消订单成功',
                            icon: 'success',
                            duration: 1000,
                        })
                    }, 1000)


                    wx.request({
                        url: app.ipAndPort + '/spOrder/canCelList',
                        method: 'POST',
                        data: {
                            id: e.currentTarget.dataset.id
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            if (res.code == 1) {
                                that.orderListShow();
                                wx.showToast({
                                    title: '取消订单成功',
                                    icon: 'success',
                                    duration: 2000,
                                })
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
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
    deleteOrder: function (e) {
        console.log(e);
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '您确认删除此订单吗？',
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
    }
})