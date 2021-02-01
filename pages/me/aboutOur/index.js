// pages/My/advice/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        html: '<div class="div_class" style="line-height: 30px;">玉林普斯汽保设备有限公司是一家专业生产汽保设备和从事销售汽保设备的商家，整体规划及施工安装的制造商。公司产品设计风格独特，外形沉稳大方，结构灵活多样，产品主要分为木制结构，钢木制结构和钢制结构三大系列，近百个品种，基本满足不同客户群的需求。公司有着卓越的项目管理经验，成功的和国内知名企业建立了良好的合作关系，在不断改进和完善产品的同时，也在不断的完善自己，将凯顿事业提高到一个更高的台阶。公司竭诚期望与国内外各界同仁和朋友加强联系与合作，我们持以质量求生存，以管理求效益，以创新求发展的企业宗旨，以的产品、优质的服务为广大用户服务。</div>',
        nodes: [{
            name: 'div',
            attrs: {
                class: 'div_class',
                style: 'line-height: 60px; color: red;'
            },
            children: [{
                type: 'text',
                text: 'Hello&nbsp;World!'
            }]
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
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