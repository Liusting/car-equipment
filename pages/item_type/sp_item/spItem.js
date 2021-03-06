/**商品详情页 */
var app = getApp();
Page({
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://img.alicdn.com/imgextra/i3/2397812748/O1CN01JswdmF1WAd02QMdEE_!!2397812748.png_430x430q90.jpg'
        }, {

            url: 'https://img.alicdn.com/imgextra/i3/2397812748/O1CN01JswdmF1WAd02QMdEE_!!2397812748.png_430x430q90.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://img.alicdn.com/imgextra/i2/2397812748/O1CN01Wz7eg01WAd03AUd2y_!!2397812748.png_430x430q90.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://img.alicdn.com/imgextra/i2/2397812748/O1CN01z17EwX1WAczqJ2vQo_!!2397812748.png_430x430q90.jpg'
        }],
        deviceW: '', //屏幕宽度
        deviceH: '', //屏幕高度
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        card_view_height: 100,
        // bottom_view_height1和bottom_view_height2是初始化高度用到的
        bottom_view_height1: 50,
        bottom_view_height2: 100,
        cartslength: [],
        currtab: 0,
        swipertab: [{
                name: '宝贝详情',
                index: 0
            },
            {
                name: '产品参数',
                index: 1
            },
            {
                name: '商品评价',
                index: 2
            }
        ],
        params:[
            {
                id:1,
                name:'品牌',
                des:'科林起重机'
            }, {
                id:2,
                name:'起重',
                des:'100kg'
            }, {
                id:3,
                name:'生产地',
                des:'山东莱芜'
            }, {
                id:4,
                name:'质保',
                des:'一年'
            }
        ],
        itemDetail:{},
        // GMSL 购买数量，初始化为1
        GMSL: 1,
        // money 价格，初始化为0
        money: 0,
        // 商品类型和属性值list（js备份固定不变）
        spTypeObjList: [],
        // 商品类型和属性值list（显示用，点击会改变）
        spTypeObjListLet: [{}],
        //商品的名称货发货地
        goodsDetailList: [{}],
        // 商品点击选中的值
        spClickMap: {},
        spObjectList: [{}],
        selectList:[],
    spTypeList: [{}],
        itemId: 0,
        shopId: '',
        shopName: '',
        str: [],
        // 参数view打开还是关闭状态
        groupViewOpen: false,
        // 要显示的参数的list
        groupValList: [],
        collect: false,
        // 提示选中什么或者要用户要选择什么
        tipsTitle: "",
        modalType: "",
        menuTop: ""
    },
    /**
     * @Explain：选项卡点击切换
     */
    tabSwitch: function (e) {
        var that = this
        if (this.data.currtab === e.target.dataset.current) {
            return false
        } else {
            that.setData({
                currtab: e.target.dataset.current
            })
        }
        console.log(e.target.dataset.current)
    },

    onShareAppMessage() {
        return {
            title: '普斯汽保-您身边值得信赖汽保设备商',
        }
    },
    sssss:function(e){
        console.log(e.detail.scrollTop)
        if (this.data.menuFixed === (e.detail.scrollTop > this.data.menuTop)) return;
        // 当页面滚动距离scrollTop > menuTop菜单栏距离顶部的距离时，菜单栏固定定位
        this.setData({
            menuFixed: (e.detail.scrollTop > this.data.menuTop)
        })

        
    },
    // 监听页面滚动距离
    onPageScroll:function (e) {
        var scrollTop = e.scrollTop;
        var isSatisfy = scrollTop >= this.data.navbarInitTop;
        this.setData({
          isFixed: isSatisfy
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function (e) {
        var _this = this;
        var query = wx.createSelectorQuery()
        query.select('#affix').boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
            // console.log(res)
            _this.setData({
                menuTop: res[0].top
            })
        })
        // console.log(e);
        var that = this;
        let itemId = e.itemId;
        let shopId = e.shopId;
        let shopName = e.shopName;

        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    deviceW: res.windowWidth, //当前屏幕宽度
                    deviceH: res.windowHeight //当前屏幕高度
                })
            }
        });

        this.setData({
            // shopId: e.shopId,
            // shopName: e.shopName
            shopId: '2',
            shopName: '壹品印象旗舰店'
        })


        wx.request({
          url: 'http://localhost:8022/spProductAttribute/selectOneDetail?id=1',
          method:'GET',
          success(res){
            
            that.setData({
                spTypeObjList:res.data.data,

            })
              console.log(res.data.data)
          }
        })

        wx.request({
                url: 'http://localhost:8022/spProduct/selectOne?id=1',
                method: 'GET',
                data: {},
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log( res.data.data)
                    let resData = res.data;
                    let cartslength = resData.CartDetailList;
                    that.setData({
                        itemDetail:res.data.data,
                        cartslength: cartslength,
                        itemId: e.itemId
                    })
                }
            }),
            //根据商品的id值获取商品信息
            wx.request({
                // url: app.ipAndPort + '/spObject/getSpObject',
                // method: 'POST',
                // data: {
                //     // itemId: itemId
                //     itemId: '10'
                // },
                // header: {
                //     'content-type': 'application/x-www-form-urlencoded'
                // },
                // success: function (res) {
                    // let resData = res.data;
                    // //将商品详情赋值给goodsDetailList数组
                    // that.setData({
                    //     goodsDetailList: resData.getGoodsDetail,
                    //     money: resData.getGoodsDetail[0].minPrice
                    // })
                    // let spObjectList = resData.spObjectList;

                    // that.data.spObjectList = resData.spObjectList;
                    // let spObjectTypeList = resData.spObjectTypeList;
                    // let getSpObjectToStartList = resData.getSpObjectToStartList;
                    // let typeMap = resData.typeMap;
                    // console.log(getSpObjectToStartList);
                    // let spTypeList = resData.spObjectTypeList;
                    // that.setData({
                    //     spTypeList: spTypeList,
                    // })
                    // let spTypeObjList = [];
                    // for (let i = 0; i < getSpObjectToStartList.length; i++) {
                    //     let list = [];
                    //     let obj = {};
                    //     obj.objId = getSpObjectToStartList[i].id;
                    //     obj.objName = getSpObjectToStartList[i].name;
                    //     obj.objMoney = getSpObjectToStartList[i].money;
                    //     obj.typeId = getSpObjectToStartList[i].typeId;
                    //     obj.objspecsId = getSpObjectToStartList[i].specsId;
                    //     obj.typeName = typeMap[getSpObjectToStartList[i].typeId];
                    //     list.push(obj);

                    //     let letId = getSpObjectToStartList[i].id;
                    //     for (let j = 0; j < spObjectList.length; j++) {
                    //         if (letId == spObjectList[j].upperId) {
                    //             let obj = {};
                    //             obj.objId = spObjectList[j].id;
                    //             obj.objName = spObjectList[j].name;
                    //             obj.objMoney = spObjectList[j].money;
                    //             obj.objspecsId = spObjectList[j].specsId;
                    //             obj.typeId = spObjectList[j].typeId;
                    //             obj.typeName = typeMap[spObjectList[j].typeId];
                    //             list.push(obj);

                    //             letId = spObjectList[j].id;
                    //         }
                    //     }
                    //     spTypeObjList.push(list);
                    // }

                    // that.setData({
                    //     spTypeObjList: spTypeObjList
                    // })


                    // let spTypeObjListLet = that.data.spTypeObjListLet;

                    // let typeObj = {};

                    // for (let i = 0; i < spTypeList.length; i++) {
                    //     typeObj[spTypeList[i].id] = [];
                    // }
                    // for (let i = 0; i < spTypeObjList.length; i++) {
                    //     let dataList = spTypeObjList[i];
                    //     for (let j = 0; j < dataList.length; j++) {
                    //         let valueList = typeObj[dataList[j].typeId];
                    //         if (that.containsJs(dataList[j].objName, valueList, "name")) {

                    //         } else {
                    //             let map = {};
                    //             map.name = dataList[j].objName;
                    //             map.state = true;
                    //             valueList.push(map);
                    //             typeObj[dataList[j].typeId] = valueList;
                    //         }
                    //     }
                    // }

                    // for (let i = 0; i < spTypeList.length; i++) {
                    //     let map = {};
                    //     map["typeId"] = spTypeList[i].id;
                    //     map["typeName"] = spTypeList[i].name;
                    //     map["list"] = typeObj[spTypeList[i].id];
                    //     spTypeObjListLet.push(map);
                    // }
                    // that.setData({
                    //     spTypeObjListLet: spTypeObjListLet
                    // });
                    // that.showTipsTitle();

                // }
            });

    },

    // 判断值在list中是否存在的方法
    containsJs(value, list, key) {
        let isTF = false;
        if (key != null) {
            for (let i = 0; i < list.length; i++) {
                if (list[i][key] == value) {
                    isTF = true;
                }
            }
        } else {
            for (let i = 0; i < list.length; i++) {
                if (list[i] == value) {
                    isTF = true;
                }
            }
        }
        return isTF;
    },

    // 类型全部选中后页面显示已选什么，或者未选什么，提示用户选择
    showTipsTitle() {
        let spTypeList = this.data.spTypeList;
        let spClickMap = this.data.spClickMap;

        let list = [];
        let panDuan = true;
        for (let i = 0; i < spTypeList.length; i++) {
            if (spClickMap[spTypeList[i].id] == null) {
                panDuan = false;
                list.push(spTypeList[i].name);
            }
        }
        if (!panDuan) {
            let str = "";
            for (let i = 0; i < list.length; i++) {
                str += (list[i] + ",")
            }
            str = str.substr(0, str.length - 1);
            this.setData({
                tipsTitle: "请选择:" + str
            });
        } else {
            let str = "";
            for (let i in spClickMap) {
                str += (spClickMap[i] + ",")
            }
            str = str.substr(0, str.length - 1);
            this.setData({
                tipsTitle: "已选:" + str,
                str: str
            });
        }

    },

    // 类型选择点击事件
    objClick: function (e) {
        console.log(this.data.spTypeObjList)
        // console.log(e)
        // let selectList = this.data.spTypeObjList;
        
        // let clickMap = e.currentTarget.dataset;
        // let selectList = this.data.selectList;
        // if(selectList.length==0){
        //     selectList.push(clickMap);
        // }else{

        //     for(let i=0;i<selectList.length;i++){
        //         console.log(clickMap.id != selectList[i].id )
        //         if(clickMap.id != selectList[i].id ){
        //             selectList.push(clickMap);
        //        }
        //     }
        // }
        // console.log(selectList.length)
        // this.setData({
        //     selectList:selectList
        // })
      
        // console.log(selectList)
        // console.log(e.currentTarget.dataset)


        // let objname = e.currentTarget.dataset.objname;
        // let typeid = e.currentTarget.dataset.typeid;
        // let state = e.currentTarget.dataset.state;
        // let clickMap = this.data.spClickMap;
        // let spTypeObjList = this.data.spTypeObjList;
        // let spTypeObjListLet = this.data.spTypeObjListLet;
        // if (!state) {
        //     return;
        // }

        // // 改变点击获取的类型参数
        // if (clickMap[typeid] == objname) {
        //     delete clickMap[typeid];
        // } else {
        //     clickMap[typeid] = objname;
        // }
        // this.setData({
        //     clickMap: clickMap
        // });

        // // 先全部弄成不能点击，可以点击的下面在处理
        // for (let i = 0; i < spTypeObjListLet.length; i++) {
        //     let dataList = spTypeObjListLet[i].list;
        //     for (let j = 0; j < dataList.length; j++) {
        //         dataList[j].state = false;
        //     }
        //     spTypeObjListLet[i].list = dataList;
        // }

        // // 处理可以显示点击的选项
        // for (let i = 0; i < spTypeObjList.length; i++) {
        //     let dataList = spTypeObjList[i];
        //     let pangDuan = true;
        //     for (let j = 0; j < dataList.length; j++) {
        //         if (clickMap[dataList[j].typeId] != null) {
        //             if (clickMap[dataList[j].typeId] != dataList[j].objName) {
        //                 pangDuan = false;
        //             }
        //         }
        //     }
        //     if (pangDuan) {
        //         for (let j = 0; j < spTypeObjListLet.length; j++) {
        //             for (let z = 0; z < dataList.length; z++) {
        //                 if (spTypeObjListLet[j].typeId == dataList[z].typeId) {
        //                     let objList = spTypeObjListLet[j].list;
        //                     for (let y = 0; y < objList.length; y++) {
        //                         if (objList[y].name == dataList[z].objName) {
        //                             objList[y].state = true;
        //                         }
        //                     }
        //                     spTypeObjListLet[j].list = objList;
        //                     this.setData({
        //                         spTypeObjListLet: spTypeObjListLet
        //                     });
        //                 }
        //             }
        //         }
        //     }
        // }

        // // 如果是只选中一类，那这一类其他都可以设置成可选中
        // if (Object.keys(clickMap).length == 1) {
        //     for (let i = 0; i < spTypeObjListLet.length; i++) {
        //         if (clickMap[spTypeObjListLet[i].typeId] != null) {
        //             let dataList = spTypeObjListLet[i].list;
        //             for (let j = 0; j < dataList.length; j++) {
        //                 dataList[j].state = true;
        //             }
        //             spTypeObjListLet[i].list = dataList;
        //             this.setData({
        //                 spTypeObjListLet: spTypeObjListLet
        //             });
        //         }
        //     }
        // }
        // this.showMoney();
        // // 刷新提示显示
        // this.showTipsTitle();
    },
    //领券
    coupon: function () {
        let shopId = this.data.shopId;
        let shopName = this.data.shopName;
        wx.navigateTo({
            url: '../../home/couponCenter/coupon',
        })
    },
    // showModal和hideModal 是显示和隐藏的方法
    showModal(e) {
        console.log(e)
        this.setData({
            modalName: e.currentTarget.dataset.target,
            modalType: e.currentTarget.dataset.type
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    // 购买数量加减
    GMSLMoveOrAdd(e) {
        let type = e.currentTarget.dataset.target;
        let num = this.data.GMSL;

        if (type == "add") {
            this.setData({
                GMSL: num + 1
            })
        } else {
            this.setData({
                GMSL: (num - 1) > 1 ? (num - 1) : 1
            })
        }
    },
    // 显示价格
    showMoney: function () {
        let spTypeList = this.data.spTypeList;
        let spTypeObjList = this.data.spTypeObjList;
        let spClickMap = this.data.spClickMap;
        for (let i = 0; i < spTypeList.length; i++) {
            if (spClickMap[spTypeList[i].id] == null) {}
            let selectedList = [];
            for (let i = 0; i < spTypeObjList.length; i++) {
                let dataList = spTypeObjList[i];
                let panDuan = true;
                for (let j = 0; j < dataList.length; j++) {
                    for (let z in spClickMap) {
                        if (dataList[j].typeId == z && dataList[j].objName != spClickMap[z]) {
                            panDuan = false;
                        }
                    }
                }
                if (panDuan) {
                    selectedList = spTypeObjList[i];
                }
            }
            if (selectedList != null) {
                this.setData({

                    money: selectedList[0].objMoney
                })
            }
        }
    },

    //立即购买
    buy: function () {
        wx.navigateTo({
            url: '../../me/order/confirmOrder/order',
        });
        // let spTypeList = this.data.spTypeList;
        // let spTypeObjList = this.data.spTypeObjList;
        // let spClickMap = this.data.spClickMap;

        // for (let i = 0; i < spTypeList.length; i++) {
        //   if (spClickMap[spTypeList[i].id] == null) {
        //     wx.showToast({
        //       title: '请选择属性',
        //       icon: 'none',
        //       duration: 2000
        //     })
        //     return;
        //   }
        // }
        // let selectedList = [];

        // for (let i = 0; i < spTypeObjList.length; i++) {
        //   let dataList = spTypeObjList[i];
        //   let panDuan = true;
        //   for (let j = 0; j < dataList.length; j++) {
        //     for (let z in spClickMap) {
        //       if (dataList[j].typeId == z && dataList[j].objName != spClickMap[z]) {
        //         panDuan = false;
        //       }
        //     }
        //   }
        //   if (panDuan) {
        //     selectedList = spTypeObjList[i]
        //   }
        // }
        // if (selectedList != null) {
        //   let typeId = selectedList[0].objspecsId;
        //   let url = '../order/order?number=' + this.data.GMSL + '&itemId=' + this.data.itemId + '&typeId=' + typeId + '&type=' + 1 + '&money=' + this.data.money
        //   wx.navigateTo({
        //     url: url,
        //   });
        // }

    },
    //点击图片预览
    previewImg: function (e) {
        var index = e.currentTarget.dataset.index;
        var list = this.data.itemDetail.ablums;
        var listNew = [];
        for(let i in list){
            listNew.push(list[i])
        }
        wx.previewImage({
            current: list[index], //必须是http图片，本地图片无效
            urls: listNew, //必须是http图片，本地图片无效
        })
    },
    //点击购物车
    cart: function () {
        wx.reLaunch({
            url: '/pages/index/index',
        })
        // wx.navigateTo({
        //   url: '../index/index?name=' + 'MyCart'
        // })
    },
    // 加入购物车点击方法
    jrgwcClick: function () {

        let spTypeList = this.data.spTypeList;
        let spTypeObjList = this.data.spTypeObjList;
        let spClickMap = this.data.spClickMap;
        for (let i = 0; i < spTypeList.length; i++) {
            if (spClickMap[spTypeList[i].id] == null) {
                wx.showToast({
                    title: '请选择属性',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
        }

        let selectedList = [];
        for (let i = 0; i < spTypeObjList.length; i++) {
            let dataList = spTypeObjList[i];
            let panDuan = true;
            for (let j = 0; j < dataList.length; j++) {
                for (let z in spClickMap) {
                    if (dataList[j].typeId == z && dataList[j].objName != spClickMap[z]) {
                        panDuan = false;
                    }
                }
            }
            if (panDuan) {
                selectedList = spTypeObjList[i]
            }
        }

        if (selectedList != null) {
            var number = this.data.GMSL;
            var itemId = this.data.itemId;
            wx.request({
                url: app.ipAndPort + '/spCart/insertCart',
                method: 'POST',
                data: {
                    number: number,
                    itemId: itemId,
                    userId: 3,
                    typeId: selectedList[0].objspecsId
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    let resData = res.data;
                    if (resData.code == '200') {
                        wx.showToast({
                            title: '添加成功，在购物车等亲~',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.showToast({
                            title: '该商品已存在购物车，快去下单吧~',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        }
    }
})