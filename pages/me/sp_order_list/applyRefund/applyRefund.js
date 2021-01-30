var app = getApp();
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
    spList: [],
    trade_status: '',
    imgList: [],
    array: [],
    index: '',
    flag: false,
    flag1: false,
    bool: ''
  },
  //点击提交
  formSubmit(e) {
    console.log(this.data.imgList);
    var that = this;
    var warn = "";
    var flag = false; //控制弹窗关闭
    //校验
    if (that.data.bool == "") {
      warn = "还没选择退款类型"
    } else if (e.detail.value.reason == "") {
      warn = "请选择退款原因"
    } else if (e.detail.value.money == "") {
      warn = "退款金额不能为空"
    } else {
      flag = true;
      let id = this.data.array[e.detail.value.reason].id;
      console.log(id);
      console.log(this.data.bool);
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    }

    if (flag == false) {
      wx.showModal({
        title: '温馨提示',
        content: warn
      })
    }
  },
  // 仅退款
  selectWay: function () {
    this.setData({
      bool: 1,
      flag: true,
      flag1: false
    })
  },
  selectWay1: function () {
    this.setData({
      bool: 2,
      flag: false,
      flag1: true
    })
  },
  changeSexy: function (e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.array[e.detail.value].id)
  },
  ChooseImage() {
    wx.chooseImage({
      count: 3, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res) => {
        wx.showLoading({
          title: '正在上传...',
        })
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
        //将图片路径循环赋值给filePath参数
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var imgUrl = res.tempFilePaths[i];
          wx.uploadFile({
            //上传图片的网路请求地址
            url: app.ipAndPort + '/spRefund/uploadPic',
            //选择
            filePath: imgUrl,
            name: 'file',

            success: function (res) {
              wx.hideLoading()
              console.log(res);
            },

            fail: function (res) {
              console.log("error");
            }
          });

        } //for循环结束
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (e) {},
  onLoad: function (e) {
    //     id: "20200522100218863743"
    // shop_id: "5"
    // trade_status: "3"
    console.log(e);
    this.setData({
      trade_status: e.trade_status
    })
    var that = this;
    let id = e.id;
    let shop_id = e.shop_id;
    http.orderDetail({
      data: {
        id: id,
        shop_id: shop_id
      },
      success(res) {
        console.log(res);
        that.setData({
          address_info: res.orderDetail.addressDetail,
          spList: res.orderDetail.detailList,
        })
      }
    })
    http.getRefundTypeList({
      data: {},
      success(res) {
        if (res.code == 200) {
          that.setData({
            array: res.data.refundList
          })
        }
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
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})