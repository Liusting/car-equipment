/**商品列表 */
const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        orderList: [{
            name: '综合',
            index: 0
        }, {
            name: '价格',
            index: 1
        }],
        // TabCur和scrollLeft是排序需要的数据
        TabCur: 0,
        scrollLeft: 0,
        deviceH: '',
        //currentInt 懒加载,初始为第1页
        currentInt: 1,
        //scrollIfSel 懒加载，是否继续去查询
        scrollIfSel: true,
        spList: [], //商品列表
        groupList: [], //商品筛选条件
        clickGroupObj: {},
        navshow: false,
        clearSearch: false,
        name: null,
        type: '',

        safeHeight:''

    },


    // search1: function () {
    //   var _this = this
    //   network.requestLoading('projectAppList', {
    //     projectName: this.data.inputValue
    //   }, '', function (res) {
    //     if (res.respState == 'S') {
    //       _this.setData({
    //         resultList: res.dtos
    //       })
    //     }

    //   }, function () {
    //     wx.showToast({
    //       title: '搜索失败',
    //       icon: 'none'
    //     })
    //   })
    // },
    //实时监听搜索框输入内容
    search: function (e) {
        var value = e.detail.value;
        if (value === null || value === undefined || value.length === 0) {
            this.setData({
                clearSearch: true
            });
        } else {
            this.setData({
                clearSearch: false,
                name: e.detail.value
            });
        }
    },
    //清除搜索框
    clearTap: function () {
        this.setData({
            clearSearch: true,
            name: ''
        });
    },

    //获取商品列表数据
    spGetList: function () {
        var that = this;
        wx.request({
            url: app.ipAndPort + '/spItem/getSpItem2',
            method: 'POST',
            data: {
                currentInt: that.data.currentInt,
                tabcur: that.data.TabCur,
                name: that.data.name
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(是不是这里, res);
                let data = res.data;
                if (data.length > 0) {
                    that.setData({
                        spList: data
                    });
                } else {
                    that.setData({
                        scrollIfSel: false,
                    });
                }
            }
        })
    },

    onLoad: function (options) {
        console.log(options)
        
        var that = this;
        if (options.type == 1) {
            that.setData({
                name: options.name,
                type: options.type
            });
            that.spGetList();
        } else if (options.type == 2) {
            that.setData({
                type: options.type,
                navshow: true
            })
        }

     
        wx.getSystemInfo({ //微信自身api
            success: function (res) {
                // console.log(res)
                let custom = wx.getMenuButtonBoundingClientRect();
                // console.log(custom)
                // console.log( res.windowHeight - (custom.bottom + custom.top - res.statusBarHeight))
                // console.log(custom.bottom + custom.top - res.statusBarHeight)
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight, //当前屏幕高度
                    safeHeight:res.windowHeight - (custom.bottom + custom.top - res.statusBarHeight)
                });
            }
        });
        // wx.request({
        //     url: app.ipAndPort + '/spItemTypeSpecs/spItemTypeSpecs',
        //     method: 'POST',
        //     data: {},
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     success: function (res) {
        //         // console.log(res.data)
        //         let data = res.data;

        //         that.setData({
        //             groupList: data
        //         })
        //     }
        // });

    },




    //滚动的时候显示数据
    scrollBottomEvent: function (e) {
        let that = this;
        console.log(this.data.currentInt)
        // if (this.data.scrollIfSel) {
        //     wx.request({
        //         url: app.ipAndPort + '/spItem/getSpItem2',
        //         method: 'POST',
        //         data: {
        //             currentInt: (that.data.currentInt + 1),
        //             tabcur: that.data.TabCur,
        //             name: this.data.name
        //         },
        //         header: {
        //             'content-type': 'application/x-www-form-urlencoded'
        //         },
        //         success: function (res) {

        //             let data = res.data;
        //             let list = that.data.spList;
        //             if (data.length > 0) {
        //                 that.setData({
        //                     currentInt: (that.data.currentInt + 1)
        //                 })
        //                 list.push.apply(list, data);
        //                 that.setData({
        //                     spList: list,
        //                 })
        //             } else {
        //                 that.setData({
        //                     scrollIfSel: false,
        //                 })
        //             }
        //         }
        //     })
        // }
    },

    // 搜索输入框回车事件
    searchOnclick: function (e) {
        // console.log(e);
        var that = this;
        if (this.data.radioType == 2) {
            wx.request({
                url: app.ipAndPort + '/spItem/getShopList',
                method: 'POST',
                data: {
                    currentInt: this.data.currentInt,
                    name: e.detail.value
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log(res)
                    // console.log(JSON.stringify(res));
                }
            })
        } else {
            wx.request({
                url: app.ipAndPort + '/spItem/getSpItem2',
                method: 'POST',
                data: {
                    currentInt: that.data.currentInt,
                    tabcur: that.data.TabCur,
                    name: e.detail.value
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    let data = res.data;
                    if (data.length > 0) {
                        that.setData({
                            spList: data
                        });
                    } else {
                        that.setData({
                            scrollIfSel: false,
                        });
                    }
                }
            })
        }
    },
    // 商品列表点击跳到商品详情
    spClick: function (e) {
        var that = this;

        var itemId = e.currentTarget.dataset.id; //获取商品的id值
        var shopId = e.currentTarget.dataset.shopid
        var shopname = e.currentTarget.dataset.shopname
        wx.navigateTo({
            url: '../sp_item/spItem?itemId=' + itemId + '&shopId=' + shopId + '&shopName=' + shopname
        });
    }
});