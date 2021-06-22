
Page({
    data: {
        PageCur: 'HomePage',
        cartTotal: ''
    },
    NavChange(e) {

        this.setData({
            PageCur: e.currentTarget.dataset.cur,
        });
    },
    onLoad: function () {
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