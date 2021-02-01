const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currtab: 0,
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        swipertab: [{
            name: '待使用',
            index: 0
        },
            {
                name: '已使用',
                index: 1
            }
        ],
        couponList: [{
            "id": "1",
            "name": "欢迎新人礼",
            "startTime": "2020/09/20",
            "endTime": "2020/09/27",
            "type": 1,
            "reduceMoney": 10,
            "condition": 100,
            "explain": "1.优惠券领取后7天内使用 2.满100可用",
            "checked": false
        }, {
            "id": "2",
            "name": "5元无门槛",
            "startTime": "2020/09/20",
            "endTime": "2020/09/27",
            "type": 2,
            "reduceMoney": 5,
            "condition": "无使用门槛",
            "explain": "1.优惠券领取后7天内使用 2.满100可用",
            "checked": false
        }, {
            "id": "3",
            "name": "寄重货5折优惠",
            "startTime": "2020/09/20",
            "endTime": "2020/09/27",
            "type": 3,
            "reduceMoney": "5折",
            "condition": "",
            "explain": "1.优惠券领取后7天内使用 2.满100可用",
            "checked": false
        }, {
            "id": "4",
            "name": "店10年周庆",
            "startTime": "2020/09/20",
            "endTime": "2020/09/27",
            "type": 1,
            "reduceMoney": 100,
            "condition": 200,
            "explain": "1.优惠券领取后7天内使用 2.满100可用",
            "checked": false
        }, {
            "id": "5",
            "name": "回馈老客户6折优惠",
            "startTime": "2020/09/20",
            "endTime": "2020/09/27",
            "type": 3,
            "reduceMoney": "6折",
            "condition": "",
            "explain": "1.优惠券领取后7天内使用 2.满100可用",
            "checked": false
        }],
        flag: true,
        modalName: '',
        idIndex: ''
    },
    gotoIndex: function (e) {
        wx.navigateTo({
            url: '../../index/index',
        })
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    // 优惠券兑换
    exchangeCoupon: function () {
        wx.navigateTo({
            url: '../exchangeCoupon/index',
        })
    },
    explain: function (e) {
        console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id;
        let item = this.data.couponList;
        for (let i = 0; i < item.length; i++) {
            if (item[i].id == id) {
                item[i].checked = !item[i].checked
            }
        }
        console.log(item);
        this.setData({
            couponList: item
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        var that = this;


        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 页面渲染完成
        this.getDeviceInfo()
    },

    getDeviceInfo: function () {
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth,
                    deviceH: res.windowHeight
                })
            }
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
    },

    tabChange: function (e) {
        this.setData({
            currtab: e.detail.current
        })
        // this.orderShow()
    },
    // orderShow: function () {
    //   let that = this
    //   switch (this.data.currtab) {
    //     case 0:
    //       that.allShow()
    //       break
    //     case 1:
    //       that.waitPayShow()
    //       break
    //     case 2:
    //       that.waitSendShow()
    //       break
    //   }
    // },
    // // 未使用
    // allShow: function () {
    //   var that = this;
    //   this.setData({
    //     allOrder: that.allOrder
    //   })
    // },
    // // 已使用
    // waitPayShow: function () {
    //   var that = this;
    //   this.setData({
    //     waitPayOrder: that.waitPayOrder
    //   })
    // },
    // // 已过期
    // waitSendShow: function () {
    //   var that = this;
    //   this.setData({
    //     waitSendOrder: that.waitSendOrder
    //   })
    // },

    // 点击立即使用
    cupon_use: function (e) {
        // console.log(e.currentTarget.dataset);
        var preferential = e.currentTarget.dataset;
        wx.setStorage({
            key: 'preferential',
            data: preferential,
            success: function (res) {
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    }

})