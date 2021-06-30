const app = getApp();
import category from '../../../utils/api'
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
    category.category.category.categoryTree({
      data: {}
    }).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        list[i] = {};
        list[i].name = res.data[i].name;
        list[i].children = res.data[i].children;
        list[i].id = i;
      }
      that.setData({
        list: list,
        listCur: res.data[0]
      })
    })
  },

  // 方法
  methods: {
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
          // console.log(list[i].id)
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

    checkAll: function () {
      wx.navigateTo({
        url: '../item_type/sp_item_list/spItemList',
      });
    },
    // 页面点处理事件
    typeClick: function (e) {
      let query = e.currentTarget.dataset['index'];
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../item_type/sp_item_list/spItemList?id='+e.currentTarget.dataset.id,
      });
    }
  }
})