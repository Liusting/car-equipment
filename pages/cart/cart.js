var app = getApp();
import http from '../../utils/api'

Component({
    data: {
        hfShow: false, //头部底部显示
        adminShow: false, //管理
        total: 0, //总金额
        shopsel: false,
        allsel: false, //全选
        selarr: [], //选择的货物
        shopIdList: [], //选择商品的所属店铺
        hintText: '', //提示的内容
        hintShow: false, //是否显示提示
        cartNumber: '', //商品数量
        cartId: '', //购物车id
        itemId: '', //商品id
        itemNumber: 0,
        pageBackgroundColor: 'gray',
        shopcarData: [{
            "itemdata": [{
                "number": 99,
                "typeList": "大方体方形四档套装-旗舰款;10寸",
                "money": 100,
                "item_id": "10",
                "user_id": "3",
                "type_id": "1",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "name": "ANISUN/艾尼森30S地藏小剪式举升机汽车维修举升机升降机厂家",
                "id": "88156285615944f491b0a2f90bba5d74",
                "check": false
            }, {
                "number": 99,
                "typeList": "大方体方形四档套装-旗舰款;10寸",
                "money": 100,
                "item_id": "10",
                "user_id": "3",
                "type_id": "1",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "name": "ANISUN/艾尼森30S地藏小剪式举升机汽车维修举升机升降机厂家",
                "id": "88156285615944f491b0a2f90bba5d75",
                "check": false
            }, {
                "number": 99,
                "typeList": "大方体方形四档套装-旗舰款;10寸",
                "money": 100,
                "item_id": "10",
                "user_id": "3",
                "type_id": "1",
                "imageUrl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
                "name": "ANISUN/艾尼森30S地藏小剪式举升机汽车维修举升机升降机厂家",
                "id": "88156285615944f491b0a2f90bba5d73",
                "check": false
            }, {
                "number": 10,
                "typeList": "经典圆形三档套装;8寸",
                "money": 110,
                "item_id": "10",
                "user_id": "3",
                "type_id": "3",
                "imageUrl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=244947859,3502261540&fm=26&gp=0.jpg",
                "name": "道达尔红运TIR7400通用CI级柴油车发动机润滑油15W-40重卡20W-50",
                "id": "c21d63af1b784f278d32c547283b1821",
                "check": false
            }, {
                "number": 10,
                "typeList": "经典圆形三档套装;8寸",
                "money": 110,
                "item_id": "10",
                "user_id": "3",
                "type_id": "3",
                "imageUrl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=244947859,3502261540&fm=26&gp=0.jpg",
                "name": "道达尔红运TIR7400通用CI级柴油车发动机润滑油15W-40重卡20W-50",
                "id": "c21d63af1b784f278d32c547283b1822",
                "check": false
            }, {
                "number": 10,
                "typeList": "经典圆形三档套装;8寸",
                "money": 110,
                "item_id": "10",
                "user_id": "3",
                "type_id": "3",
                "imageUrl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=244947859,3502261540&fm=26&gp=0.jpg",
                "name": "道达尔红运TIR7400通用CI级柴油车发动机润滑油15W-40重卡20W-50",
                "id": "c21d63af1b784f278d32c547283b1823",
                "check": false
            }, {
                "number": 10,
                "typeList": "经典圆形三档套装;8寸",
                "money": 110,
                "item_id": "10",
                "user_id": "3",
                "type_id": "3",
                "imageUrl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=244947859,3502261540&fm=26&gp=0.jpg",
                "name": "道达尔红运TIR7400通用CI级柴油车发动机润滑油15W-40重卡20W-50",
                "id": "c21d63af1b784f278d32c547283b1824",
                "check": false
            }]
        }], //购物车商品列表
        changeNumber: '',
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        totalNumber: 0
    },
    // tab切换的时候马上响应数据
    ready: function () {
        // console.log(app.globalData.deviceH)
        // wx.showLoading({
        //   title:'加载中'
        // })
        // setTimeout(function(){
        //     wx.hideLoading()
        // },1000)
        var that = this;
        // wx.request({
        //   url: app.ipAndPort + '/spCart/getCartDetail',
        //   method: 'POST',
        //   data: {

        //   },
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded'
        //   },
        //   success: function (res) {
        //     console.log(res.data)
        //     if (res.data.length == 0) {
        //       that.setData({
        //         hfShow: true,
        //       })
        //     } else {
        //       wx.hideLoading({

        //       })
        //       that.setData({
        //         shopcarData: res.data,
        //         hfShow: false
        //       })
        //     }

        //   }
        // });
      
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        })
    },
    methods: {
        //判断是否为全选
        judgmentAll: function () {
            let shopcarDataLet = this.data.shopcarData,
                shoplen = shopcarDataLet.length,
                lenIndex = 0;
            for (let i = 0; i < shoplen; i++) {
                shopcarDataLet[i].check && lenIndex++;
                let itemdataList = shopcarDataLet[i].itemdata;
                for (let j = 0; j < itemdataList.length; j++) {

                }
            }
            this.setData({
                allsel: lenIndex == shoplen
            });
        },
        //计算金额
        countTotal: function () {
            let number = 0;
            this.data.pageBackgroundColor = "gray"
            let shopcarDataLet = this.data.shopcarData;
            let total = 0;
            for (let i = 0; i < shopcarDataLet.length; i++) {
                let itemdataList = shopcarDataLet[i].itemdata;
                for (let j = 0; j < itemdataList.length; j++) {
                    if (itemdataList[j].check) {
                        number += itemdataList[j].number;
                        total += itemdataList[j].money * itemdataList[j].number;
                        this.data.pageBackgroundColor = "red";
                    }
                }
            }
            this.setData({
                total: total,
                totalNumber: number,
                pageBackgroundColor: this.data.pageBackgroundColor,
            });

        },
        //点击查看商品详情
        spItem: function (e) {
            var that = this;
            var itemId = e.currentTarget.dataset.itemid; //获取商品的id值
            var shopId = e.currentTarget.dataset.shopid
            var shopname = e.currentTarget.dataset.shopname
            wx.navigateTo({
                url: '../item_type/sp_item/spItem'
            });
        },
        // 自定义页面刷新
        refresh: function () {
            var that = this;
            wx.request({
                url: app.ipAndPort + '/spCart/getCartDetail',
                method: 'POST',
                data: {},
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    if (res.data.length == 0) {
                        that.setData({
                            shopcarData: [],
                            hfShow: true,
                        })
                    } else {
                        that.setData({
                            shopcarData: res.data,
                            hfShow: false
                        })
                    }
                }
            })
        },
        //自定义删除方法
        del: function (e) {
            var that = this;
            if (e == null) {

            } else {
                wx.request({
                    url: app.ipAndPort + '/spCart/deleteCart',
                    method: 'POST',
                    data: {
                        itemId: e
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                        that.refresh();
                    }
                })
            }
        },
        // 长按删除
        delete: function (e) {
            let that = this;
            wx.showModal({
                title: '温馨提示',
                content: '确定把该商品移除购物车吗？',
                success: function (res) {
                    if (res.confirm) {
                        that.del(e.currentTarget.dataset.id);
                    } else if (res.cancel) {
                        return false;
                    }
                }
            })
        },
        //点击删除
        deleteshopTap: function () {
            var that = this;
            let shopcarDataLet = this.data.shopcarData,
                allsel = this.data.allsel;
            for (let i = 0; i < shopcarDataLet.length; i++) {
                let itemdataList = shopcarDataLet[i].itemdata;
                for (let j = 0; j < itemdataList.length; j++) {
                    if (itemdataList[j].check) {
                        that.del(itemdataList[j].id);
                    }
                }
            }
            this.refresh();
        },
        //点击全选
        allcheckTap: function () {
            let number = 0;
            let shopcarDataLet = this.data.shopcarData,
                allsel = !this.data.allsel; //点击全选后allsel变化
            for (let i = 0, len = shopcarDataLet.length; i < len; i++) {
                shopcarDataLet[i].check = !this.data.allsel; //所有商品的选中状态和allsel值一样
                let itemdataList = shopcarDataLet[i].itemdata;
                for (let j = 0; j < itemdataList.length; j++) {
                    number += itemdataList[j].number

                    if (allsel) {
                        itemdataList[j].check = shopcarDataLet[i].check;
                    } else {
                        itemdataList[j].check = false;
                        // total = 0
                    }
                }
            }
            if (allsel) {
                this.data.pageBackgroundColor = 'red';

            } else {
                this.data.pageBackgroundColor = 'gray';
                number = 0
            }
            this.setData({
                totalNumber: number,
                allsel: allsel,
                shopcarData: shopcarDataLet,
                pageBackgroundColor: this.data.pageBackgroundColor,
            });
            this.countTotal();
            this.countSelect();
            // console.log(this.data.totalNumber)
        },
        //点击编辑按钮，是否完成的选项
        adminTap: function () {
            this.setData({
                adminShow: !this.data.adminShow
            });
        },
        //点击数量修改
        showModal(e) {
            this.refresh();
            this.setData({
                modalName: e.currentTarget.dataset.target,
                cartNumber: e.currentTarget.dataset.number,
                cartId: e.currentTarget.dataset.id,
                allsel: false,
                totalNumber: 0,
                total: 0 //总金额
            })
        },
        hideModal(e) {
            this.setData({
                modalName: null
            })
        },
        onPullDownRefresh: function () {

            wx.showNavigationBarLoading() //在标题栏中显示加载

            //模拟加载

            setTimeout(function () {

                // complete

                wx.hideNavigationBarLoading() //完成停止加载

                wx.stopPullDownRefresh() //停止下拉刷新

            }, 1500);

        },
        //提交修改数量
        formSubmit: function (e) {

            if (e.detail.value.cartNumber == 0) {
                wx.showToast({
                    title: '数量不能为0',
                    icon: 'none'
                })
            } else {
                this.setData({
                    cartNumber: e.detail.value.cartNumber
                })
                this.updateNumber();
                this.refresh();
            }
        },

        //更改购物车数量
        updateNumber: function (e) {

            var that = this;
            wx.request({
                url: app.ipAndPort + '/spCart/updateCartNumber',
                method: 'POST',
                data: {
                    cartId: this.data.cartId, //购物车id
                    cartNumber: this.data.cartNumber
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {}
            })
        },
        //点击单个选择按钮
        checkTap: function (e) {
            let number = 0;
            let id = e.currentTarget.dataset.id;
            let index = e.currentTarget.dataset.index;
            let shopcarDataLet = this.data.shopcarData;
            let selarr = [];
            let allsel = this.data.allsel;
            for (let i = 0; i < shopcarDataLet.length; i++) {
                if (shopcarDataLet[i].shopId == index) {
                    let letBool = true;
                    let allsel = false;
                    let itemdataList = shopcarDataLet[i].itemdata;
                    for (let j = 0; j < itemdataList.length; j++) {
                        if (itemdataList[j].id == id) {
                            // number += itemdataList[j].number
                            selarr.push(itemdataList[j].id);
                            itemdataList[j].check = !itemdataList[j].check;
                        }
                        if (!itemdataList[j].check) {
                            letBool = false;
                            this.data.pageBackgroundColor = "gray";
                        } else {
                            this.data.pageBackgroundColor = "red";
                        }
                    }
                    shopcarDataLet[i].check = letBool;
                }
            }
            this.setData({
                selarr: selarr,
                cartId: id,
                shopcarData: shopcarDataLet,
                allsel: allsel,
                pageBackgroundColor: this.data.pageBackgroundColor
            });
            this.judgmentAll(); //每次按钮点击后都判断是否满足全选的条件
            this.countTotal(); //每次按钮点击后都计算总价格
            this.countSelect();
            // console.log(number);
        },
        //点击加减按钮
        numchangeTap: function (e) {
            let that = this;
            let id = e.currentTarget.dataset.id, //商品id
                cartNumber = this.data.cartNumber,
                index = e.currentTarget.dataset.index, //店铺id
                shopcarDataLet = this.data.shopcarData,
                shopcar = this.data.shopcarData,
                types = e.currentTarget.dataset.types; //是加号还是减号
            switch (types) {
                case 'add':
                    for (let i = 0; i < shopcarDataLet.length; i++) {
                        if (shopcarDataLet[i].shopId == index) {
                            let itemdataList = shopcarDataLet[i].itemdata;
                            for (let j = 0; j < itemdataList.length; j++) {
                                if (itemdataList[j].id == id) {
                                    itemdataList[j].number++;
                                    cartNumber = itemdataList[j].number;
                                    this.countTotal();
                                }
                            }
                        }
                    }
                    break;

                case 'minus':
                    for (let i = 0; i < shopcarDataLet.length; i++) {
                        if (shopcarDataLet[i].shopId == index) {
                            let itemdataList = shopcarDataLet[i].itemdata;
                            for (let j = 0; j < itemdataList.length; j++) {
                                if (itemdataList[j].id == id) {
                                    if (itemdataList[j].number < 2) {

                                    } else {
                                        itemdataList[j].number--;
                                        cartNumber = itemdataList[j].number;
                                        this.countTotal();
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
            this.setData({
                shopcarData: shopcar,
                cartNumber: cartNumber,
                cartId: e.currentTarget.dataset.id, //购物车id
                shopId: e.currentTarget.dataset.index, //店铺id
            });
            this.updateNumber();
        },
        //判断选择的
        countSelect: function (e) {
            let selarr = [];
            let shopIdList = [];
            let shopcarDataLet = this.data.shopcarData;
            for (let i = 0; i < shopcarDataLet.length; i++) {
                let itemdataList = shopcarDataLet[i].itemdata;
                for (let j = 0; j < itemdataList.length; j++) {
                    if (itemdataList[j].check) {
                        selarr.push(itemdataList[j].id)
                        shopIdList.push(shopcarDataLet[i].shopId)
                    }
                }
            }
            this.setData({
                selarr: selarr,
                itemNumber: selarr.length,
                shopIdList: shopIdList
            })
        },

        //点击结算
        goclearingTap: function (e) {
            var that = this;
            if (this.data.selarr.length == 0) {
                wx.showToast({
                    title: '还没选择商品呢亲~',
                    icon: 'none',
                    duration: 2000
                })
                return;
            } else {
                //查重
                var hash = [];
                for (var i = 0; i < that.data.shopIdList.length; i++) {
                    if (hash.indexOf(that.data.shopIdList[i]) === -1) {
                        hash.push(that.data.shopIdList[i]);
                    }
                }
                var selarr = JSON.stringify(this.data.selarr);
                var shopId = JSON.stringify(hash);
                wx.navigateTo({
                    url: '../me/order/confirmOrder/order'
                })
            }
        },

        onLoad: function () {
            var that = this;
            wx.request({
                url: app.ipAndPort + '/spCart/getCartDetail',
                method: 'POST',
                data: {},
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    let resData = res.data;
                    that.setData({
                        shopcarData: resData.CartDetailList,
                    })
                }
            })
        }
    }

})