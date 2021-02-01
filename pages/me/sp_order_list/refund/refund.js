// pages/me/refund.js
const app = getApp();
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
        refundList: [{
            id: "114",
            item_id: "5",
            money: 25,
            name: "红木家具非洲进口中式餐桌圆凳直径1.5米带钢化玻璃防热搞1.1米梨花木耐用原产地质量100%保证",
            number: 2,
            pay_status: "0",
            shop_name: "美的旗舰店",
            trade_status: 1,
            type_id: "25"
        }, {
            id: "114",
            item_id: "5",
            money: 25,
            name: " 红木家具非洲进口中式餐桌圆凳直径1.5米带钢化玻璃防热搞1.1米梨花木耐用原产地质量100%保证",
            number: 2,
            pay_status: "0",
            shop_name: "美的旗舰店",
            trade_status: 1,
            type_id: "25"
        }],
    },
    checkSteps: function (e) {
        wx.navigateTo({
            url: '../me/steps',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
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