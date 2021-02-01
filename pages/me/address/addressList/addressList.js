var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        deviceW: '',//屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        addressList: [{
            "phoneNumber": "18648840748",
            "cityName": "佛山市",
            "addressdetail": "石湾街道泛家居创意园6B一楼前台12",
            "addresseeName": "柳南",
            "id": "073f24db5ba442d7b5a74dd78ef6334a",
            "provinceName": "广东省",
            "countyName": "禅城区"
        }, {
            "phoneNumber": "13047848152",
            "cityName": "三亚市",
            "addressdetail": "新港中路397号",
            "addresseeName": "张三",
            "id": "271cf41a604142f3a673c28d02c13094",
            "provinceName": "海南省",
            "countyName": "崖州区"
        }, {
            "phoneNumber": "18648840748",
            "cityName": "拉萨市",
            "addressdetail": "沃尔玛超级超市店铺1244",
            "addresseeName": "柳南",
            "id": "c434e3f52c0c4eb3aa24d21e9cbe722f",
            "provinceName": "西藏自治区",
            "countyName": "墨竹工卡县"
        }, {
            "phoneNumber": "18648840749",
            "cityName": "佛山市",
            "addressdetail": "石湾街道泛家居创意园6B一楼前台",
            "addresseeName": "柳南",
            "id": "cb7836120acf4dedb28f7ccc9a6974c0",
            "provinceName": "广东省",
            "countyName": "禅城区"
        }],
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
            url: '../editAddress/editAddress?item=' + JSON.stringify(item)
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
                            var provinceName = res.provinceName;//收货人省份
                            var cityName = res.cityName;//收货人城市
                            var countyName = res.countyName;//收货人县级市
                            var addressdetail = res.detailInfo;//收货人具体地址
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
                                header: {'content-type': 'application/x-www-form-urlencoded'},
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
                            success(res) {
                            }
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
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth,//当前屏幕宽度
                    deviceH: res.windowHeight//当前屏幕高度
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
        var that = this;
        wx.request({
            url: app.ipAndPort + '/spAddress/getAddressList',
            method: 'POST',
            data: {
                userId: 3
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
                let resData = res.data;
                that.setData({
                    addressList: resData
                })
            }
        })
    },
// 点击新增收货地址
    addAddress: function () {
        // debugger;
        wx.navigateTo({url: '../addAddress/address'});
    },
    //点击地址
    addClick: function (e) {
        let type = this.data.type;//模拟地址进来
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