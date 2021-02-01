// pages/appraise/appraise.js
var app = getApp();
import http from '../../../utils/api'

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
        starDesc: '非常好',
        starDesc1: '非常好',
        starDesc2: '非常好',
        index: 5,
        index1: 5,
        index2: 5,
        serviceStar: [],
        mannerStar: [],
        id: '',//订单id
        stars: [
            {
                flag: 1,

                message: '非常差'
            },
            {
                flag: 1,

                message: '差'
            },
            {
                flag: 1,

                message: '一般'
            },
            {
                flag: 1,

                message: '好'
            },
            {
                flag: 1,

                message: '非常好'
            }
        ]
    },
    starClick: function (e) {
        var that = this;
        for (var i = 0; i < that.data.stars.length; i++) {
            var allItem = 'stars[' + i + '].flag';
            that.setData({
                [allItem]: 2
            })
        }
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i <= index; i++) {
            var item = 'stars[' + i + '].flag';
            that.setData({
                [item]: 1
            })

        }
        // 评价星星文字说明
        this.setData({
            starDesc: this.data.stars[index].message,
            index: index + 1
        })
    },
    serviceStarClick: function (e) {
        var that = this;
        for (var i = 0; i < that.data.serviceStar.length; i++) {
            var allItem = 'serviceStar[' + i + '].flag';
            that.setData({
                [allItem]: 2
            })
        }
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i <= index; i++) {
            var item = 'serviceStar[' + i + '].flag';
            that.setData({
                [item]: 1
            })
        }
        // 评价星星文字说明
        this.setData({
            starDesc1: this.data.serviceStar[index].message,
            index1: index + 1
        })
    },
    mannerStarClick: function (e) {
        var that = this;
        for (var i = 0; i < that.data.mannerStar.length; i++) {
            var allItem = 'mannerStar[' + i + '].flag';
            that.setData({
                [allItem]: 2
            })
        }
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i <= index; i++) {
            var item = 'mannerStar[' + i + '].flag';
            that.setData({
                [item]: 1
            })
        }
        // 评价星星文字说明
        this.setData({
            starDesc2: this.data.mannerStar[index].message,
            index2: index + 1
        })
    },
    bindFormSubmit: function (e) {
        http.getAppraise({
            data: {
                id: 3,
                desc_star: this.data.index,
                service_star: this.data.index1,
                manner_star: this.data.index2,
                appraise: e.detail.value.textarea
            },
            success(res) {
                if (res.code == 200) {
                    wx.showToast({
                        title: '主人~评价成功',
                        icon: 'success',
                        duration: 5000,
                        success: function (res) {
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    })
                } else (
                    wx.showToast({
                        title: res.message,
                        icon: 'none'
                    })
                )

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth,//当前屏幕宽度
                    deviceH: res.windowHeight//当前屏幕高度
                })
            }
        });
        let serviceStar = this.data.stars;
        let mannerStar = this.data.stars;
        this.setData({
            serviceStar: serviceStar,
            mannerStar: mannerStar,
            id: options.itemId
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})