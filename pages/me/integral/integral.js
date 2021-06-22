// pages/me/integral/integral.js
const app = getApp();
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
    currtab:0,
    swipertab: [{
        name: '积分兑换',
        index: 0
      },
      {
        name: '积分收入',
        index: 1
      },
      {
        name: '积分支出',
        index: 2
      }
    ],
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