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
    let that = this;
    http.getCartTotal({
      data:{
        userId:3
      },
      success(res){
        that.setData({
          cartTotal:res.cartTotal
        })
      }
    })
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})