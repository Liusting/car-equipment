var app = getApp();
var utils = require('../../../../utils/util')
import http from '../../../../utils/api'
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
    region: ['广东省', '广州市', '海珠区'],
    provinceName: '广东省', //省份
    cityName: '广州市', //市
    countyName: '海珠区', //区
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      provinceName: e.detail.value[0], //省份
      cityName: e.detail.value[1], //市
      countyName: e.detail.value[2], //区
    })
  },
  //点击保存
  saveAddress: function (e) {
    // debugger;
    var warn = "";
    var that = this;
    var flag = false; //控制弹窗关闭
    var addresseeName = e.detail.value.addresseeName; //收货人姓名
    var phoneNumber = e.detail.value.phoneNumber; //收货人电话号码
    var provinceName = this.data.provinceName; //收货人省份
    var cityName = this.data.cityName; //收货人城市
    var countyName = this.data.countyName; //收货人县级市
    var addressdetail = e.detail.value.addressdetail; //收货人具体地址
    // console.log(provinceName + '-' + cityName + '-' + countyName + '-' + addressdetail)
    // 校验
    if (addresseeName == "") {
      warn = "请填写您的姓名！";
    } else if (phoneNumber == "") {
      warn = "请填写您的手机号！";
    } else if (!utils.checkStr(phoneNumber, 'phone')) {
      warn = "手机号格式不正确";
    } else if (addressdetail == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = true;
      http.addAddress({
        data: {
          addresseeName: addresseeName,
          phoneNumber: phoneNumber,
          provinceName: provinceName,
          cityName: cityName,
          countyName: countyName,
          addressdetail: addressdetail,
          userId: 3
        },
        success(res) {
          if (res.code == 200) {
            wx.showToast({
              title: '新增成功',
            })
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  }
})