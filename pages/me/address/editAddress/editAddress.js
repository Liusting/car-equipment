var app = getApp();
var utils = require('../../../../utils/util')
import http from '../../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    provinceName: '', //省份
    cityName: '', //市
    countyName: '', //区
    addressdetail: '',
    addresseeName: '',
    phoneNumber: '',
    id: '',
    deviceW: '', //屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    defaultAddress: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    console.log(item)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth, //当前屏幕宽度
          deviceH: res.windowHeight //当前屏幕高度
        })
      }
    });
    let region = [];
    region.push(item.provinceName);
    region.push(item.cityName);
    region.push(item.countyName);
    this.setData({
      provinceName: item.provinceName,
      cityName: item.cityName,
      countyName: item.countyName,
      addresseeName: item.addresseeName,
      phoneNumber: item.phoneNumber,
      addressdetail: item.addressdetail,
      region: region,
      id: item.id
    })
  },
  switchChange: function (e) {

    if (e.detail.value) {
      this.setData({
        defaultAddress: '1'
      })
    } else {
      this.setData({
        defaultAddress: '0'
      })
    }
    console.log(this.data.defaultAddress)
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
  //  删除地址
  delAddress: function () {
    http.deleteAddress({
      data: {
        id: this.data.id
      },
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  //点击保存
  saveAddress: function (e) {
    var warn = "";
    var that = this;
    var flag = false; //控制弹窗关闭
    var addresseeName = e.detail.value.addresseeName; //收货人姓名
    var phoneNumber = e.detail.value.phoneNumber; //收货人电话号码
    var provinceName = this.data.provinceName; //收货人省份
    var cityName = this.data.cityName; //收货人城市
    var countyName = this.data.countyName; //收货人县级市
    var addressdetail = e.detail.value.addressdetail; //收货人具体地址

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
      http.updateAddress({
        data: {
          id: this.data.id,
          addresseeName: addresseeName,
          phoneNumber: phoneNumber,
          provinceName: provinceName,
          cityName: cityName,
          countyName: countyName,
          addressdetail: addressdetail,
          userId: 3,
          defaultAddress: that.data.defaultAddress
        },
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
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