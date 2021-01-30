// pages/item_type/goodSearch.js
const app = getApp();
import http from '../../../utils/api' // 引入api接口管理文件
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
    list: [],
    name: '',
    resultList: []
  },
  //清除搜索关键字
  clean: function () {
    var _this = this
    setTimeout(function () {
      _this.setData({
        name: '',
      })
    }, 100)
  },
  //监听输入内容
  blur: function (e) {
    this.setData({
      name: e.detail.value
    })
    this.search();
  },
  detail: function (e) {
    this.save();
    wx.navigateTo({
      url: '../sp_item/spItem?itemId=' + e.currentTarget.dataset.id,
    })

  },
  save: function () {
    var list = this.data.list;
    if (list.indexOf(this.data.name) == -1 & this.data.name != '') {
      list.push(this.data.name);
    }
    this.setData({
      list: list
    })
    wx.setStorage({
      key: 'historySearch',
      data: list
    })

  },
  //点击搜索历史标签
  searchName: function (e) {
    this.setData({
      name: e.currentTarget.dataset.value
    })
    this.search();
  },
  //清空历史搜索记录
  remove: function () {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认清空所有记录?',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'historySearch',
            success() {
              _this.setData({
                list: []
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  search() {
    var that = this;
    http.getSearchList({ // 调用接口，传入参数
      data: {
        name: that.data.name,
        currentInt: 1
      },
      success: function (res) {
        
        that.setData({
          resultList: res
        })
        console.log(res);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'historySearch',
      success(res) {
        console.log(res);
        that.setData({
          list: res.data
        })
      }
    })


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