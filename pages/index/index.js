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
    },
    onShow: function (options) {
        // console.log(options);
    },
    onShareAppMessage() {
        return {
            title: '普斯汽保-您身边值得信赖汽保设备商',
            path: '/pages/index/index'
        }
    },
})