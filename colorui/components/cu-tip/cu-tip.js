// components/tip/cu-tip.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgImageUrl: {
      type: String,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})