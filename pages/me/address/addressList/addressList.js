var app = getApp();
import address from '../../../../utils/api'
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
        addressList: [],
        type: '',
        idx: ''
    },
    //selectAddress
    selectAddress: function (e) {
        console.log(e);
    },
    // 获取微信用户收货地址
    // 修改地址
    editAddress: function (e) {
        let item = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '../editAddress/editAddress?item=' + JSON.stringify(item)+'&type='+0
        })
    },
    getWeixinAddress: function (e) {
        let that = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.address']) {
                    wx.chooseAddress({
                        success(res) {
                            var addresseeName = res.userName;
                            var phoneNumber = res.telNumber;
                            var provinceName = res.provinceName; //收货人省份
                            var cityName = res.cityName; //收货人城市
                            var countyName = res.countyName; //收货人县级市
                            var addressdetail = res.detailInfo; //收货人具体地址
                            wx.request({
                                url: app.ipAndPort + '/spAddress/insertAddress',
                                method: 'POST',
                                data: {
                                    addresseeName: addresseeName,
                                    phoneNumber: phoneNumber,
                                    provinceName: provinceName,
                                    cityName: cityName,
                                    countyName: countyName,
                                    addressdetail: addressdetail,
                                    userId: 3
                                },
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: function (res) {
                                    let resData = res.data;
                                    if (resData.code == '1') {
                                        that.onLoad();
                                    }
                                }
                            })
                        }
                    })
                } else {
                    if (res.authSetting['scope.address'] == false) {
                        wx.openSetting({
                            success(res) {}
                        })
                    } else {
                        wx.chooseAddress({
                            success(res) {
                                console.log(res.userName)
                                console.log(res.provinceName)
                                console.log(res.cityName)
                                console.log(res.countyName)
                                console.log(res.detailInfo)
                                console.log(res.telNumber)
                            }
                        })
                    }
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        address.address.address.addressList({
            data: {
                pageNum: 1,
                pageSize: 10,
            }
        }).then(res => {
            _this.setData({
                addressList: res.data.list
            })
            // console.log(res.data.list)
        }).catch(err => {
            console.log(err)
        })
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        });
        this.setData({
            type: options.type,
            idx: options.id
        })

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // var that = this;
        // wx.request({
        //     url: app.ipAndPort + '/spAddress/getAddressList',
        //     method: 'POST',
        //     data: {
        //         userId: 3
        //     },
        //     header: {'content-type': 'application/x-www-form-urlencoded'},
        //     success: function (res) {
        //         let resData = res.data;
        //         that.setData({
        //             addressList: resData
        //         })
        //     }
        // })
    },
    // 点击新增收货地址
    addAddress: function () {
        // debugger;
        wx.navigateTo({
            url: '../editAddress/editAddress?type='+1
        });
    },
    //点击地址
    addClick: function (e) {
        let type = this.data.type; //模拟地址进来
        if (type == 3) {
            this.setData({
                type: type
            })
        } else if (type == 2) {
            let id = e.currentTarget.dataset.id
            wx.setStorage({
                key: 'addressId',
                data: e.currentTarget.dataset.item,
                success: function (res) {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
            this.setData({
                idx: id,
                type: type
            })
        }
    }
})