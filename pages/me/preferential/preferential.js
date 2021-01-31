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
    couponList: [],
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
      if(item[i].id == id){
        item[i].checked = !item[i].checked
      }
    }
    console.log(item);
    this.setData({
      couponList:item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'http://mock-api.com/PKeZpPz0.mock/couponTest',
      method: 'get',
      success: function (res) {
        that.setData({
          couponList: res.data
        })
        console.log(res);
      }
    })

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