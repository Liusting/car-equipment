Page({
    data: {
        PageCur: 'HomePage',
        cartTotal: '9'
    },
    NavChange(e) {

        this.setData({
            PageCur: e.currentTarget.dataset.cur,
        });
    },
    onLoad: function () {
        // wx.cloud.callFunction({
        //     name:'test',

        // }).then(res =>{
        //     console.log(res)
        // })

        wx.checkSession({
            success (res) {
                 //session_key 未过期，并且在本生命周期一直有效
                console.log(res)
             
            },
            fail () {
              // session_key 已经失效，需要重新执行登录流程
              wx.login() //重新登录
            }
          })
    },
    onShow: function (options) {
        // console.log(options);
    },
    onShareAppMessage() {
        return {
            title: '鑫弘誉-您身边值得信赖汽配设备商',
            path: '/pages/index/index'
        }
    },
})