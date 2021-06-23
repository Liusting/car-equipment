var app = getApp();
var utils = require('../../../../utils/util')
import http from '../../../../utils/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {

        region: [],
        formData: {},
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        type: '',
        defaultAddress: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var that = this;
        if (options.type == 1) {
            this.setData({
                region: ['广东省', '广州市', '海珠区'],
                type: options.type
            })
        } else {
            console.log(JSON.parse(options.item))
            let item = JSON.parse(options.item);
            let region = [];
            region.push(item.provincename);
            region.push(item.cityname);
            region.push(item.countyname);
            this.setData({
                formData: item,
                region: region,
                type: options.type
            })
        }
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        });

    },
    //默认地址确认
    switchChange: function (e) {
        if (e.detail.value) {
            this.data.formData.defaultaddress = 1;
        } else {
            this.data.formData.defaultaddress = 0;
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    //地区选择
    RegionChange: function (e) {
        this.setData({
            region: e.detail.value,
        })
    },
    //  删除地址
    delAddress: function () {
        wx.showModal({
            title: '温馨提示',
            content: '确定删除该地址吗~',
            success(res) {
                if (res.confirm) {
                    console.log('点击删除')
                }
            }
        })
        // http.deleteAddress({
        //     data: {
        //         id: this.data.id
        //     },
        //     success: function (res) {
        //         wx.navigateBack({
        //             delta: 1
        //         })
        //     }
        // })
    },
    //点击保存
    saveAddress: function (e) {
        console.log(e)
        console.log(this.data.formData)
        var warn = "";
        var that = this;
        var flag = false; //控制弹窗关闭
        var receivername = e.detail.value.receivername; //收货人姓名
        var phonenumber = e.detail.value.phonenumber; //收货人电话号码
        var addressdetail = e.detail.value.addressdetail; //收货人具体地址

        var provincename = this.data.region[0]; //收货人省份
        var cityname = this.data.region[1]; //收货人城市
        var countyname = this.data.region[2]; //收货人县级市

        // 校验
        if (receivername == "") {
            warn = "请填写您的姓名！";
        } else if (phonenumber == "") {
            warn = "请填写您的手机号！";
        } else if (!utils.checkStr(phonenumber, 'phone')) {
            warn = "手机号格式不正确";
        } else if (addressdetail == "") {
            warn = "请输入您的具体地址";
        } else {
            flag = true;

            let data = {
                id: that.data.formData.id,
                receivername: receivername,
                phonenumber: phonenumber,
                provincename: provincename,
                cityname: cityname,
                countyname: countyname,
                addressdetail: addressdetail,
                userid: 3,
                defaultaddress: that.data.formData.defaultaddress
            };
            console.log(data)
            http.updateAddress({
                data: data,
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