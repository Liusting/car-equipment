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
      // {
      //   name: '待分享',
      //   index: 2
      // },
      {
        name: '待发货',
        index: 3
      },
      {
        name: '待收货',
        index: 4
      },
      {
        name: '待评价',
        index: 5
      },
    ],
    orderList: [],
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
    wx.showLoading({
      title: '正在加载模块',
    })
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
  expressDetail:function(e){
    wx.navigateTo({
      url: './expressInformation/expressInformation',
    })
  },
  //点击店铺跳到店铺首页
  gotoShop: function (e) {
    var shopId = e.currentTarget.dataset.shopid
    var shopname = e.currentTarget.dataset.shopname
    wx.navigateTo({
      url: '../shop/shop?shopId=' + shopId + '&shopName=' + shopname
    })
  },
  //退货/退款
  applyRefund:function(e){
    let id = e.currentTarget.dataset.id;
    let shop_id = e.currentTarget.dataset.shopid;
    let tradestatus = e.currentTarget.dataset.tradestatus;
    wx.navigateTo({
      url: '../sp_order_list/applyRefund?id=' + id + '&shop_id=' + shop_id + '&trade_status=' + tradestatus
    })
  },
  // 订单详情页
  orderDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let shop_id = e.currentTarget.dataset.shopid;
    let tradestatus = e.currentTarget.dataset.tradestatus;
    console.log(e);
    wx.navigateTo({
      url: '../sp_order_list/orderDetail?id=' + id + '&shop_id=' + shop_id + '&trade_status=' + tradestatus
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
    this.orderListShow();
  },
  orderListShow: function () {
    var that = this;
    wx.request({
      url: app.ipAndPort + '/spOrder/getOrderList',
      method: 'POST',
      data: {
        trade_status: this.data.currtab
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let orderList = res.data;
        console.log(res.data);
        that.setData({
          orderList: orderList
        })
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
  //提醒卖家发货
  remind: function () {
    wx.showToast({
      title: '主人~提醒成功',
      icon: 'success'
    })
  }
})