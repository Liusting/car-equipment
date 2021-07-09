// pages/mine/mine.js
var app = getApp()
Component({
    data: {
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        avatarUrl: "", //用户头像
        nickName: "", //用户昵称
        flag: false,
        flag1: true,
        myTools: [

            {
                id: 1,
                icon: 'ticket',
                name: '优惠券',

            },
         
            {
                id: 2,
                icon: 'locationfill ',
                name: '收货地址',

            },
            {
                id: 3,
                icon: 'shopfill',
                name: '积分商城',

            },
            {
                id: 4,
                icon: 'repair',
                name: '技术售后',

            }
        ],
        orderItems: [{
                typeId: 1,
                icon: 'pay',
                name: '待付款',
                badge: 7
            },
            {
                typeId: 2,
                icon: 'send',
                name: '待发货',
                badge: 0
            },
            {
                typeId: 3,
                icon: 'deliver',
                name: '已发货',
                badge: 120
            },
            {
                typeId: 4,
                icon: 'comment',
                name: '待评价',
                badge: 2
            },
            {
                typeId: 5,
                icon: 'refund',
                name: '退款/售后',
                badge: 1
            },
        ],
        hasUserInfo: app.globalData.hasUserInfo,
        userInfo: app.globalData.userInfo
    },
    // tab切换的时候马上响应数据
    ready: function () {
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
    methods: {
        getPhoneNumber (e) {
            console.log(e.detail.errMsg)
            console.log("iv="+e.detail.iv)
            console.log("encryptedData"+e.detail.encryptedData)
            wx.login({
                success(res){
                    wx.request({
                        url: 'http://weixin123.gz2vip.idcfengye.com/weixin/getUserPhoneNumber',
                        method: 'post',
                        data: {
                            encryptedData: e.detail.encryptedData,
                            code: res.code,
                            iv: e.detail.iv
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        success(res) {
                            console.log(res)
                        }
                    })
                }
            })
     

            
          },
        wxGetUserProfile: function () {
            return new Promise((resolve, reject) => {
                wx.getUserProfile({
                    lang: 'zh_CN',
                    desc: '用户登录',
                    success: (res) => {
                        resolve(res)
                    },
                    // 失败回调
                    fail: (err) => {
                        reject(err)
                    }
                })
            })
        },

        wxSilentLogin: function () {
            return new Promise((resolve, reject) => {
                wx.login({
                    success(res) {
                        console.log(res.code)
                        resolve(res.code)
                    },
                    fail(err) {
                        reject(err)
                    }
                })
            })
        },
        
        getUserInfo: function () {
            // // 获取用户信息
    // wx.getSetting({
    //     success: res => {
    //       if (res.authSetting['scope.userInfo']) {
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //         wx.getUserInfo({
    //           success: res => {
    //             console.log(res)
    //             // 可以将 res 发送给后台解码出 unionId
    //             this.globalData.userInfo = res.userInfo
  
    //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //             // 所以此处加入 callback 以防止这种情况
    //             if (this.userInfoReadyCallback) {
    //               this.userInfoReadyCallback(res)
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
            let _this = this;
            let p1 = this.wxSilentLogin()
            let p2 = this.wxGetUserProfile()
            Promise.all([p1, p2]).then((res) => {
                let code = res[0]
                let iv = res[1].iv
                let encryptedData = res[1].encryptedData
                // 请求服务器
                wx.request({
                    url: 'http://weixin123.gz2vip.idcfengye.com/weixin/getUserInfoMsg',
                    method: 'post',
                    data: {
                        encryptedData: encryptedData,
                        code: code,
                        iv: iv
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                        app.globalData.userInfo = res.data;
                        app.globalData.hasUserInfo = true;
                        _this.setData({
                            hasUserInfo: !_this.data.hasUserInfo,
                            userInfo: res.data
                        })
                    }
                })
            }).catch((err) => {
                console.log(err)
            })

           

        },
        messageList: function () {
            wx.navigateTo({
                url: '../me/messageCenter/messageCenter',
            })
        },
        toMyAccount: function (e) {
            let id = e.currentTarget.dataset.id;
            switch (id) {
                case 1:
                    wx.navigateTo({
                        url: '../invest/invest',
                    })
                    break;
                case 2:
                    wx.navigateTo({
                        url: '../integral/integral',
                    })
                    break;
                case 3:
                    wx.navigateTo({
                        url: '../card/card',
                    })
                    break;
                case 4:
                    wx.navigateTo({
                        url: '../preferential/preferential',
                    })
                    break;
            }

        },
        toTool: function (e) {
            let id = e.currentTarget.dataset.id;
            // console.log(id);
            switch (id) {
                case 1:
                    wx.navigateTo({
                        url: '../me/preferential/preferential',
                    });
                    break;
                    // wx.navigateTo({
                    //     url: '../me/vipCard/vipCard',
                    // });
                    // break;
                case 2:
                    wx.navigateTo({
                        url: '../me/address/addressList/addressList?type=' + 3
                    });
                    break;
                  
                case 3:
                   
                    wx.navigateTo({
                        url: '../me/integral/integral',
                    });
                    break;
                case 4:
                    // wx.navigateTo({
                    //     url: '../me/address/addressList/addressList?type=' + 3
                    // });
                    // break;
                case 5:
                    // wx.navigateTo({
                    //     url: '../me/aboutOur/index'
                    // });
                    // break;
                // case 6:
                //     wx.navigateTo({
                //         url: '../accountSecurity/accountSecurity'
                //     });
                //     break;
            }
        },
        exit: function () {
            this.setData({
                isLogin: false
            })
            wx.showModal({
                title: '温馨提示',
                showCancel: true,
                content: '确定要退出登录吗？',
                success: function () {
                    wx.showToast({
                        title: '退出成功',
                        icon: 'success'
                    })
                }
            })
        },
        userMessage() {
            wx.navigateTo({
                url: '../me/userMessage/userMessage'
            });
        },

        //事件处理函数
        toOrder: function (e) {
            let typeId = e.currentTarget.dataset.typeid; //取遍历的id值
            switch (typeId) {
                case 0:
                    wx.navigateTo({
                        url: '../me/sp_order_list/spOrderList?typeId=' + typeId //将要跳转id的值传参数过去
                    });
                    break;
                case 1:
                    wx.navigateTo({
                        url: '../me/sp_order_list/spOrderList?typeId=' + typeId //将要跳转id的值传参数过去
                    });
                    break;
                case 2:
                    wx.navigateTo({
                        url: '../me/sp_order_list/spOrderList?typeId=' + typeId //将要跳转id的值传参数过去
                    });
                    break;
                case 3:
                    wx.navigateTo({
                        url: '../me/sp_order_list/spOrderList?typeId=' + typeId //将要跳转id的值传参数过去
                    });
                    break;
                case 4:
                    wx.navigateTo({
                        url: '../me/sp_order_list/spOrderList?typeId=' + typeId //将要跳转id的值传参数过去
                    });
                    break;
                case 5:
                    wx.navigateTo({
                        url: '../me/sp_order_list/refund/refund',
                    });
                    break;
            }
        },
        memberMessage: function () {
            let url = "../me/memberMessage/memberMessage";
            wx.navigateTo({
                url: url
            });
        },

        onLoad: function () {

        },
        onShow: function () {

        }
    }
})