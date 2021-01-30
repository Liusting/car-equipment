// pages/sp_order_list/expressInformation/expressInformation.js
var app = getApp();
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
    expressList: [{
      time: "2020-05-22 11:25:26",
      context: "【佛山市】您的快件已签收,签收人：家顺生活超市，如有疑问请电联快递员：石胜利【16603021589】。"
    }, {
      time: "2020-05-22 08:16:20",
      context: "【佛山市】广东佛山桂城公司 快递员 石胜利16603021589 正在为您派件【95114/95121/9501395546为韵达快递员外呼专属号码，请放心接听】"
    }, {
      time: "2020-05-22 07:34:28",
      context: "【佛山市】已到达 广东佛山桂城公司"
    }, {
      time: "2020-05-22 02:21:47",
      context: "【佛山市】已离开 广东佛山分拨中心；发往 广东佛山桂城公司"
    }, {
      time: "2020-05-22 02:09:34",
      context: "【佛山市】已到达 广东佛山分拨中心"
    }, {
      time: "2020-05-21 00:23:53",
      context: "【嘉兴市】已离开 浙江杭州分拨中心；发往 广东佛山分拨中心"
    }, {
      time: "2020-05-21 00:02:38",
      context: "【嘉兴市】已到达 浙江杭州分拨中心"
    }, {
      time: "2020-05-20 20:26:37",
      context: "【湖州市】已离开 浙江安吉县公司；发往 广东佛山分拨中心"
    }, {
      time: "2020-05-20 15:05:28",
      context: "【湖州市】浙江安吉县公司 已揽收"
    }],
    nu:'4305628344009'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth, //当前屏幕宽度
          deviceH: res.windowHeight //当前屏幕高度
        })
      }
    });
    // wx.request({
    //   url: 'https://route.showapi.com/64-19/',
    //   data:{
    //     showapi_appid:'256366',
    //     showapi_sign:'fdd6a3f8d8544e9eaac8fed2241ccd6b',
    //     com:'auto',
    //     nu:'4305628344009'
    //   },
    //   success(res){
    //     console.log(res)
    //       that.setData({
    //         expressList:res.data.showapi_res_body.data
    //       })
    //   }
    // })
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