const app = getApp();
import http from '../../../utils/api'
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
        name: '未使用',
        index: 0
      },
      {
        name: '已使用',
        index: 1
      },
      {
        name: '已过期',
        index: 2
      }
    ],
    allOrder: [],
  },
  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    http.getUserCouponList({
      data: {
        user_id: 3
      },
      success(res) {
        that.setData({
          allOrder: res.data.userCouponList
        })
      }
    })
    // wx.request({
    //   url: 'http://mock-api.com/PKeZpPz0.mock/coupon',
    //   method:'get',
    //   success:function(res){
    //     that.setData({
    //       allOrder:res.data
    //     })
    //   }
    // })

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
    this.orderShow()
  },
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.allShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.waitSendShow()
        break
    }
  },
  // 未使用
  allShow: function () {
    var that = this;
    this.setData({
      allOrder: that.allOrder
    })
  },
  // 已使用
  waitPayShow: function () {
    var that = this;
    this.setData({
      waitPayOrder: that.waitPayOrder
    })
  },
  // 已过期
  waitSendShow: function () {
    var that = this;
    this.setData({
      waitSendOrder: that.waitSendOrder
    })
  },

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