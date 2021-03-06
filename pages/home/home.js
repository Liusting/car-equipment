const app = getApp();
const formatTime = date => {

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
import http from '../../utils/api'
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
    imgList: [{
        url: 'http://img5.imgtn.bdimg.com/it/u=1581224632,3970953275&fm=26&gp=0.jpg'
      },
      {
        url: 'http://img5.imgtn.bdimg.com/it/u=1706412859,1235793814&fm=26&gp=0.jpg'
      },
      {
        url:'http://img1.imgtn.bdimg.com/it/u=4222416775,91990084&fm=15&gp=0.jpg'
      },
      {
        url:'http://img0.imgtn.bdimg.com/it/u=728360357,3786529661&fm=26&gp=0.jpg'
      },
      {
        url:'http://img3.imgtn.bdimg.com/it/u=2754312086,2251373705&fm=26&gp=0.jpg'
      },
      {
        url:'http://img2.imgtn.bdimg.com/it/u=3835153038,3414811458&fm=15&gp=0.jpg'
      }
    ],
    newList: [],
    iconList: [{
      id:1,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2470902194,3289836216&fm=26&gp=0.jpg',
      color: 'red',
      name: '必备工具'
    }, {
      id:2,
      imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3487926815,4223804875&fm=26&gp=0.jpg',
      color: 'orange',
      name: '轮胎选购'
    }, {
      id:3,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=227787745,548542539&fm=26&gp=0.jpg',
      color: 'yellow',
      name: '美容用品'
    }, {
      id:4,
      imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1172761241,1558344466&fm=26&gp=0.jpg',
      color: 'olive',
      name: '汽车坐垫'
    },
     {
       id:5,
      imageUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=18018628,2092471010&fm=26&gp=0.jpg',
      color: 'cyan',
      name: '常规保养'
    }, {
      id:6,
      imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3380929416,626499548&fm=26&gp=0.jpg',
      color: 'blue',
      name: '专用耗材'
    }, {
      id:7,
      imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3380929416,626499548&fm=26&gp=0.jpg',
      color: 'blue',
      name: '年审必备'
    }, {
      id:8,
      imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3380929416,626499548&fm=26&gp=0.jpg',
      color: 'blue',
      name: '车上必备'
    }, {
      id:9,
      imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3053357756,1218486966&fm=26&gp=0.jpg',
      color: 'purple',
      name: '领券中心'
    }, {
      id:10,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2494090163,1357672127&fm=26&gp=0.jpg',
      color: 'mauve',
      name: '限时折扣'
    }
  ],
  isLoad:false
  },

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
  onLoad: function () {

  },
  methods: {
    //领券中心
    couponCenter:function(){
      wx.navigateTo({
        url: '../couponCenter/coupon',
      })
    },
    goto(){
      wx.navigateTo({
        url: '../me/order/confirmOrder/order',
      })
    },
    //点击去查看商品详情
    itemDetail:function(e){
      wx.navigateTo({
        url: '../item_type/sp_item/spItem'
      });
    },
    //点击搜索商品
    searchGood: function () {
      wx.navigateTo({
        url: '../home/goodSearch/goodSearch',
      })
    },
    // 点击分类
    gotoClassify: function (e) {
      wx.navigateTo({
        url: '../item_type/sp_item_list/spItemList',
      })
      console.log(e.currentTarget.dataset.id)
    },
    //更多疯抢
    moreDiscount: function (e) {
      wx.navigateTo({
        url: '../home/moreDiscount/moreDiscount',
      })
    },
    customMethod: function () {},
  }
})