import http from '../../utils/api'
Page({
  data: {
    PageCur: 'HomePage',
    cartTotal:''
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur,
    });
  },
  onLoad: function () {
  },
  onShareAppMessage() {
    return {
      title: '普斯汽保-您身边值得信赖汽保设备',
      path: '/pages/index/index'
    }
  },
})