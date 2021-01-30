const app = getApp();
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    deviceW: '', //屏幕宽度
    deviceH: '', //屏幕高度
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true
  },

  ready: function () {
    var that = this;
    let list = [{}];
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth, //当前屏幕宽度
          deviceH: res.windowHeight //当前屏幕高度
        })
      }
    });
    // wx.request({
    //   url: app.ipAndPort+'/spItemType/getSpItemType',
    //   method: 'POST',
    //   data: {

    //   },
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   success: function (res) {
    //     console.log(res.data)
    let data = [{
      "name": "诊断设备",
      "listType2": [{
        "name": "汽车诊断设备",
        "listType3": [{
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2428300266,2207173336&fm=26&gp=0.jpg",
          "name": "汽车故障电脑诊断设备"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=13705780,849573927&fm=26&gp=0.jpg",
          "name": "汽车解码器"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=151830751,411842834&fm=15&gp=0.jpg",
          "name": "读码卡"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=184876341,3011171662&fm=26&gp=0.jpg",
          "name": "数据流分析"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3265335678,683974687&fm=26&gp=0.jpg",
          "name": "专用电脑"
        }],
        "upperId": "1"
      }]
    }, {
      "name": "检测分析",
      "listType2": [{
        "name": "检测线",
        "listType3": [{
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2082113752,3626054622&fm=26&gp=0.jpg",
          "name": "检漏仪"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4016030548,1495069425&fm=26&gp=0.jpg",
          "name": "分析仪"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2553943888,2027692581&fm=26&gp=0.jpg",
          "name": "传感器"
        }, {
          "imageurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2097900403,3071024861&fm=26&gp=0.jpg",
          "name": "示波器"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2567886813,873672542&fm=26&gp=0.jpg",
          "name": "内窥镜"
        }],
        "upperId": "2"
      }]
    }, {
      "name": "养护清洗",
      "listType2": [{
        "name": "养护清洗设备",
        "listType3": [{
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1944983186,3455994494&fm=26&gp=0.jpg",
          "name": "自动变速箱清洗换油机"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=921688977,2633531419&fm=26&gp=0.jpg",
          "name": "动力转向换油机"
        }, {
          "imageurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4124305805,2999604751&fm=26&gp=0.jpg",
          "name": "黄油加注机"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2029065512,1147375675&fm=26&gp=0.jpg",
          "name": "冷媒回收加注机"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2180119103,4001382146&fm=26&gp=0.jpg",
          "name": "喷油嘴清洗检测设备"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2440138037,838870666&fm=26&gp=0.jpg",
          "name": "抛光机"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4158816740,306918752&fm=26&gp=0.jpg",
          "name": "打蜡机"
        }],
        "upperId": "3"
      }]
    }, {
      "name": "钣金烤漆",
      "listType2": [{
        "name": "钣金烤漆设备",
        "listType3": [{
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=480910475,139327237&fm=26&gp=0.jpg",
          "name": "烤漆房"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1129559088,1896871770&fm=26&gp=0.jpg",
          "name": "烤漆灯"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1871720050,1741963053&fm=15&gp=0.jpg",
          "name": "调漆房"
        }, {
          "imageurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=905812830,3888399552&fm=26&gp=0.jpg",
          "name": "大梁校正"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=726703127,1291885254&fm=26&gp=0.jpg",
          "name": "地八卦"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=259630597,1943474464&fm=26&gp=0.jpg",
          "name": "喷枪"
        }],
        "upperId": "4"
      }]
    }, {
      "name": "轮胎设备",
      "listType2": [{
        "name": "轮胎设备",
        "listType3": [{
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=139548479,3941493702&fm=26&gp=0.jpg",
          "name": "平衡机"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3725817686,3549935947&fm=26&gp=0.jpg",
          "name": "拆胎机"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1316164946,1143714560&fm=26&gp=0.jpg",
          "name": "充氮机"
        }, {
          "imageurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3782426376,3350565900&fm=26&gp=0.jpg",
          "name": "补胎机"
        }],
        "upperId": "5"
      }]
    }, {
      "name": "保养用品",
      "listType2": [{
        "name": "保养用品",
        "listType3": [{
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4181826970,4078097526&fm=26&gp=0.jpg",
          "name": "汽摩用清洗剂"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4050377107,1375309598&fm=15&gp=0.jpg",
          "name": "修复剂"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1226509974,1565087597&fm=26&gp=0.jpg",
          "name": "防冻液"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=879598519,4124378058&fm=11&gp=0.jpg",
          "name": "润滑油"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=101008451,3504571564&fm=26&gp=0.jpg",
          "name": "制动液"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1230286838,3156579864&fm=26&gp=0.jpg",
          "name": "制冷剂"
        }],
        "upperId": "6"
      }]
    }, {
      "name": "维修工具",
      "listType2": [{
        "name": "维修工具",
        "listType3": [{
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3529492550,2333755609&fm=26&gp=0.jpg",
          "name": "扳手"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2941552676,2232675690&fm=26&gp=0.jpg",
          "name": "螺丝批"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1190508392,2367207931&fm=26&gp=0.jpg",
          "name": "组套"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4241223619,4065124995&fm=26&gp=0.jpg",
          "name": "工具车"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1907804909,1450984156&fm=26&gp=0.jpg",
          "name": "工具箱"
        }, {
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2182419298,2218906110&fm=26&gp=0.jpg",
          "name": "工作台"
        }],
        "upperId": "7"
      }]
    }, {
      "name": "机械设备",
      "listType2": [{
        "name": "机械设备",
        "listType3": [{
          "imageurl": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=179584017,3580078821&fm=26&gp=0.jpg",
          "name": "举升机"
        }, {
          "imageurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2640398970,170349914&fm=26&gp=0.jpg",
          "name": "千斤顶"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1895684837,3053393318&fm=26&gp=0.jpg",
          "name": "吊机"
        }, {
          "imageurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1861396669,2062882213&fm=15&gp=0.jpg",
          "name": "吊车"
        }],
        "upperId": "8"
      }]
    }, {
      "name": "其他",
      "listType2": [{
        "name": "其他汽保设备",
        "listType3": [{
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1740871382,4036066157&fm=26&gp=0.jpg",
          "name": "四轮定位"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3480562979,3131206648&fm=26&gp=0.jpg",
          "name": "卡尺"
        }, {
          "imageurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3890718112,4189466743&fm=26&gp=0.jpg",
          "name": "测电笔"
        }, {
          "imageurl": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1205162817,3274498360&fm=26&gp=0.jpg",
          "name": "电焊机"
        }],
        "upperId": "9"
      }]
    }];
    for (let i = 0; i < data.length; i++) {
      list[i] = {};
      list[i].name = data[i].name;
      list[i].listType2 = data[i].listType2;
      list[i].id = i;
    }
    that.setData({
      list: list,
      listCur: list[0]
    })
    // }
    // })
  },

  methods: {

    // 这里是一个自定义方法
    tabSelect: function (e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    VerticalMain: function (e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = this.createSelectorQuery().select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          })
          return false
        }
      }
    },

    checkAll:function(){
      wx.navigateTo({
        url: '../item_type/sp_item_list/spItemList',
      });
    },
    // 页面点处理事件
    typeClick: function (e) {
      
      console.log(e.currentTarget.dataset.name);
      let query = e.currentTarget.dataset['index'];
      wx.navigateTo({
        url: '../item_type/sp_item_list/spItemList',
      });
    }
  }
})