const app = getApp();
import http from '../../../../utils/api'

var utils = require('../../../../utils/util')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        bottom_view_height2: 100,
        deviceH: '', //当前屏幕高度
        deviceW: '',
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        load: true,
        itemMessage: [], //商品信息
        address_info: {}, //地址信息
        preferential_info: {}, //商品优惠信息
        goods_info: [], //商品信息
        goods_count: '', //商品件数
        goods_freight: '', //运费
        goods_price: '', //商品价格
        total: '', //合计价格
        itemId: '', //商品id
        typeId: '', //商品规格id
        type: '', //选项,用来判断购物车下单还是详情页下单
        order_message: '', //订单留言
        cart_ids: [], // 购物车商品id
        addressId: '', //地址id
        modeName: '快递',
        name: '',
        show: true,
        flag: false,
        flag1: true,
        flag2: 0,
        flag3: true,
        mode: [{
            type: '0',
            name: '快递',
            checked: 'true'
        },
            {
                type: '1',
                name: '门店自提'
            },
            {
                type: '2',
                name: '商家配送'
            }
        ],
        item: {
            iconfontBack: "icon-arrowleft",
            navigationBarTitle: "确认订单",
            statusBarHeight: app.globalData.statusBarHeight
        },
        statusBarHeight: app.globalData.statusBarHeight,
        //日期
        timeList: [],
        //可预约天数
        yyDay: 3,
        //预约时间段
        hourList: [{
            hour: "08:00-10:00",
            n: 8,
            isShow: true
        },

            {
                hour: "10:00-12:00",
                n: 10,
                isShow: true
            },
            {
                hour: "12:00-14:00",
                n: 12,
                isShow: true
            },

            {
                hour: "14:00-16:00",
                n: 14,
                isShow: true
            },

            {
                hour: "18:00-19:00",
                n: 18,
                isShow: true
            }
        ],
        //是否显示
        timeShow: false,
        currentTab: 0,
        //选择时间
        chooseHour: "",
        //选择日期
        chooseTime: "",
        hourIndex: -1,
        //预约时间
        yyTime: '',
        idx: '',
        dayname: '',
        time: ''
    },
    //日期选择
    timeClick: function (e) {
        var that = this;
        if (e.currentTarget.dataset.index == 0) {
            this.setData({
                dayname: '今天'
            })
        } else if (e.currentTarget.dataset.index == 1) {
            this.setData({
                dayname: '明天'
            })
        } else if (e.currentTarget.dataset.index == 2) {
            this.setData({
                dayname: '后天'
            })
        }
        //非今天-不判断超过当前时间点(所有时间点都可选择)
        if (e.currentTarget.dataset.index != 0) {
            var list = this.data.hourList;
            for (var i = 0; i < list.length; i++) {
                list[i].isShow = true;
            }
            this.setData({
                hourList: list,
                hourIndex: that.data.hourIndex
            })
        } else {
            //今天-过时不可预约
            var hour = new Date().getHours();
            for (var i = 0; i < this.data.hourList.length; i++) {
                var list = this.data.hourList;
                if (this.data.hourList[i].n <= hour) {
                    list[i].isShow = false;
                    this.setData({
                        hourList: list,
                        hourIndex: i + 1,
                        time: that.data.hourList[i + 1].hour
                    })
                }
            }
        }
        this.setData({
            currentTab: e.currentTarget.dataset.index,
            chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
            yyTime: '',
            chooseHour: ''
        });
    },
    // 时间选择
    hourClick: function (e) {
        var that = this;
        // 时间不可选择
        if (!e.currentTarget.dataset.isshow) {
            return false;
        }
        this.setData({
            hourIndex: e.currentTarget.dataset.index,
            chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,

        });
        var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
        this.setData({
            yyTime: chooseTime,
            time: that.data.chooseHour
        })
    },
    applyOrder() {
        wx.navigateTo({
            url: '../payResult/orderComplete',
        })
    },
    //选择默认地址
    defaultAddress() {
        var that = this;
        http.getDefaultAddress({
            data: {},
            success: function (res) {
                console.log(res.data);
                that.setData({
                    address_info: res.data.list
                })
            }
        })
    },
    //选择支付方式
    selectPay: function (e) {
        console.log(e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id;
        if (id == 1) {
            this.deliver();
        } else if (id == 0) {
            wx.navigateTo({
                url: '../order/orderComplete',
            })
        }
    },

    //配送方式选择
    radioselect: function (e) {
        if (e.currentTarget.dataset.item.type == 1) {
            this.setData({
                flag: true,
                flag1: false
            })
        } else if (e.currentTarget.dataset.item.type == 2) {
            this.setData({
                flag: false,
                flag1: true,
                flag3: false
            })
        } else if (e.currentTarget.dataset.item.type == 0) {
            this.setData({
                flag: false,
                flag1: true
            })
        }
        this.setData({
            modeName: e.currentTarget.dataset.item.name
        })
    },
    //选择地址
    bindaddress: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../address/addressList/addressList?type=' + 2 + '&id=' + id
        })
    },
    // 留言
    bindwaitMsg: function (event) {
        this.setData({
            order_message: event.detail.value, // 订单留言
        })
    },
    //优惠券
    preferential: function () {
        wx.navigateTo({
            url: '../../preferential/preferential'
        })
    },

    /**
     * 支付订单
     */
    payOrder: function (orderHash, order_id) {
        var that = this;
        var order_hash = orderHash;
        // console.log(order_hash)
        //呼起微信支付
        MBC.Ajax({
            url: api.getPayConfig,
            is_login: true,
            data: {
                hash: order_hash,
                platform: 'miniProgram',
                channel: 'weixin'
            },
            success: function (res) {
                wx.requestPayment({
                    'timeStamp': res.result.parameters.timeStamp,
                    'nonceStr': res.result.parameters.nonceStr,
                    'package': res.result.parameters.package,
                    'signType': 'MD5',
                    'paySign': res.result.parameters.paySign,
                    'success': function (res) {
                        // console.log(res);
                        MBC.Ajax({
                            url: api.payOrder,
                            is_login: true,
                            data: {
                                hash: order_hash
                            },
                            success: function (res) {
                                // console.log(res)
                                var status = res.result.status;
                                if (status == 2) {
                                    wx.showToast({
                                        title: '支付成功',
                                    });
                                    wx.redirectTo({
                                        url: '../orderInfo/orderInfo?order_id=' + order_id,
                                    })

                                } else {
                                    wx.showToast({
                                        title: '支付失败，请稍后刷新',
                                    })
                                }

                            }
                        })
                    },
                    'fail': function (res) {
                        // console.log(res);
                        wx.redirectTo({
                            url: '../orderInfo/orderInfo?order_id=' + order_id,
                        })
                    }
                })
            }
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
    //提交订单
    deliver: function (e) {

        wx.request({
            url: app.ipAndPort + '/spOrder/addOrder',
            method: 'POST',
            data: {
                item_id: this.data.itemId,
                type_id: '2',
                user_id: '2',
                trade_status: '2',
                pay_status: '1',
                money: this.data.goods_price,
                number: this.data.goods_count,
                total_price: this.data.total_price,
                remark: this.data.order_message
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res);
            }
        })
    },
    // //  提交订单
    // bindSubmitOrder: function (e) {
    //   var form_id = e.detail.formId;
    //   var that = this;
    //   var type = this.data.type;
    //   if (type == 1) {
    //     MBC.Ajax({
    //       url: api.submit,
    //       is_login: true,
    //       data: {
    //         form_id: form_id,
    //         order_message: this.data.order_message, //地址信息
    //         address_id: this.data.address_info.address_id, //地址id
    //         receiver_name: this.data.address_info.receiver_name, //收件人姓名
    //         receiver_phone: this.data.address_info.receiver_phone, //收件手机号
    //         receiver_city: this.data.address_info.city, //收件城市
    //         receiver_address_details: this.data.address_info.detail_address, //收件详细地址
    //         type: this.data.type, //选项
    //         goods_id: this.data.goods_id, //商品id
    //         goods_num: this.data.goods_num, //商品数量
    //       },
    //       success: function (res) {
    //         that.payOrder(res.result.hash, res.result.order_id);
    //       },
    //       fail: function (res) {

    //       }
    //     })
    //   } else if (type == 2) {
    //     MBC.Ajax({
    //       url: api.submit,
    //       is_login: true,
    //       data: {
    //         form_id: form_id,
    //         order_message: this.data.order_message, //地址信息
    //         address_id: this.data.address_info.address_id, //地址id
    //         receiver_name: this.data.address_info.receiver_name, //收件人姓名
    //         receiver_phone: this.data.address_info.receiver_phone, //收件手机号
    //         receiver_city: this.data.address_info.city, //收件城市
    //         receiver_address_details: this.data.address_info.detail_address, //收件详细地址
    //         type: this.data.type, //选项
    //         cart_ids: this.data.cart_ids, //购物车id
    //       },
    //       success: function (res) {
    //         that.payOrder(res.result.hash, res.result.order_id);
    //       },
    //       fail: function (res) {

    //       }
    //     })
    //   }

    // },
    //返回上一页
    onBack: function () {
        wx.navigateBack({
            delta: 1
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var type = options.type; //用来判断是购物车下单还是详情页下单
        var that = this;
        let _date = new Date();
        let format = "MM-dd"
        utils.Format(format, _date); //将当前日期格式化
        var dateList = [];
        for (var i = 0; i < this.data.yyDay; i++) {
            var d = {};
            var day = utils.DateAdd('d', i).getDay();
            if (day == 1) {
                var w = "周一"
            }
            if (day == 2) {
                var w = "周二"
            }
            if (day == 3) {
                var w = "周三"
            }
            if (day == 4) {
                var w = "周四"
            }
            if (day == 5) {
                var w = "周五"
            }
            if (day == 6) {
                var w = "周六"
            }
            if (day == 0) {
                var w = "周日"
            }
            let _date1 = utils.DateAdd('d', i);
            d.name = w;
            d.date = utils.Format("MM-dd", _date1);
            dateList.push(d)
        }
        this.setData({
            timeList: dateList
        });
        //初始化判断
        //当前时间
        var hour = new Date().getHours();
        for (var i = 0; i < this.data.hourList.length; i++) {
            var list = this.data.hourList;
            //过时不可选
            if (this.data.hourList[i].n <= hour) {
                list[i].isShow = false;
                this.setData({
                    hourList: list,
                    hourIndex: i + 1
                })
            }
        }

        let time = this.data.hourList[this.data.hourIndex].hour;
        if (this.data.currentTab == 0) {
            this.setData({
                dayname: "今天",
                time: time
            })
        }

        this.defaultAddress();
        if (type == 1) {
            wx.request({
                url: app.ipAndPort + '/spOrder/getItemDetail',
                method: 'GET',
                data: {
                    itemId: options.itemId,
                    typeId: options.typeId,
                    type: type
                },
                header: {
                    "content-type": "application/json"
                },
                success: function (res) {
                    let itemMessage = res.data
                    console.log(itemMessage)
                    that.setData({
                        itemMessage: itemMessage,
                        total: options.number * options.money,
                        typeId: options.typeId,
                        itemId: options.itemId,
                        goods_count: options.number
                    })
                    // console.log(that.data.itemMessage)
                }
            })
        } else if (type == 2) {
            var cart_ids = JSON.parse(options.cartids);
            // console.log(cart_ids)
            var shop_ids = JSON.parse(options.shopIdList);
            var cartids = cart_ids.join(","); //数组转成字符串
            var shopids = shop_ids.join(",");
            wx.request({
                url: app.ipAndPort + '/spOrder/getItemDetail',
                method: 'GET',
                dataType: "json", //必须
                contentType: "application/json;charsetset=UTF-8", //必须
                data: {
                    cartids: cartids,
                    type: type,
                    shopids: shopids
                },
                header: {
                    "content-type": "application/json"
                },
                success: function (res) {
                    console.log(res);
                    let itemList = res.data;
                    let serrar1 = [];
                    for (var i = 0; i < shop_ids.length; i++) {
                        let serrar = {};
                        var name = "";
                        var id = "";
                        var shopImageUrl = "";
                        var list = [];
                        for (var j = 0; j < itemList.length; j++) {

                            if (shop_ids[i] == itemList[j].shop_id) {
                                name = itemList[j].shopName;
                                id = itemList[j].shop_id;
                                shopImageUrl = itemList[j].shopImageUrl;
                                list.push(itemList[j]);
                            }
                        }
                        serrar.shopName = name;
                        serrar.shopId = id;
                        serrar.itemData = list;
                        serrar.shopImageUrl = shopImageUrl;
                        serrar1.push(serrar);
                        console.log(serrar1);
                    }
                    that.setData({
                        itemMessage: serrar1,
                        total: options.total
                    })
                }

            })

            // //   购物车
            // MBC.Ajax({
            //   url: api.confirm,
            //   is_login: true,
            //   data: {
            //     cart_ids: that.data.cart_ids,
            //     type: type
            //   },
            //   success: function (res) {
            //     console.log(res);
            //     that.setData({
            //       address_info: res.result.address_info, //地址信息
            //       goods_info: res.result.goods_info, //商品信息
            //       goods_count: res.result.goods_count, //商品件数
            //       goods_freight: res.result.goods_freight, //运费
            //       goods_price: res.result.goods_price, //商品价格
            //       total_price: res.result.total_price, //合计价格
            //     })

            //   },
            //   fail: function (res) {
            //     console.log(res);
            //     //获取信息失败
            //   }
            // })
        }


        wx.showLoading({
            title: '加载中...',
            mask: true,
        });
        setTimeout(function () {
            wx.hideLoading()
        }, 8000)
        wx.getSystemInfo({
            success: function (res) {
                // console.log(res)
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        })
        that.setData({
            type: type
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    // /**
    //  * 生命周期函数--监听页面显示
    //  */
    onShow: function () {
        var that = this;
        //从上一页获取收货地址缓存数据
        wx.getStorage({
            key: 'addressId',
            success: function (res) {
                that.setData({
                    address_info: res.data
                })
            }
        })
        //获取优惠金额缓存数据
        wx.getStorage({
            key: 'preferential',
            success: function (res) {
                that.setData({
                    preferential_info: res.data
                })
            }
        })
        //   var that = this;
        //   var goods_id = that.data.goods_id;
        //   var goods_num = that.data.goods_num;
        //   var type = that.data.type;
        //   var cart_ids = that.data.cart_ids;
        //   console.log(that.data.address_id);
        //   // if (type == 1) {

        //   // } else if (type == 2) {

        //   // }
        //   if (that.data.address_id) {
        //     // 获取指定地址信息
        //     MBC.Ajax({
        //       url: api.getOne,
        //       is_login: true,
        //       data: {
        //         address_id: that.data.address_id
        //       },
        //       success: function (res) {
        //         that.setData({
        //           address_info: res.result.address_info
        //         })
        //       },
        //       fail: function (res) {

        //       }
        //     })
        //   }

    },

    // /**
    //  * 生命周期函数--监听页面隐藏
    //  */
    // onHide: function () {

    // },

    // /**
    //  * 生命周期函数--监听页面卸载
    //  */
    // onUnload: function () {

    // },

    // /**
    //  * 页面相关事件处理函数--监听用户下拉动作
    //  */
    // onPullDownRefresh: function () {

    // },

    // /**
    //  * 页面上拉触底事件的处理函数
    //  */
    // onReachBottom: function () {

    // },

    // /**
    //  * 用户点击右上角分享
    //  */
    // onShareAppMessage: function () {

    // }
    onReady() {
        wx.hideLoading()
    },
})