const app = getApp();
 
Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,

	},
	onLoad: function (option) {
 
	},
	getDbRecord(){
		//初始化数据库
		const db = wx.cloud.database();
		db.collection('todos').doc('28ee4e3e60d1f84a24504f4669f446ca').get().then(res =>{
			console.log(res)
		}).catch(function (err) {
			console.log(err);
		})

	},
	uploadImage(){
		wx.chooseImage({
			success: chooseResult => {
				// 将图片上传至云存储空间
				wx.cloud.uploadFile({
					// 指定上传到的云路径
					cloudPath: 'my-photo.png',
					// 指定要上传的文件的小程序临时文件路径
					filePath: chooseResult.tempFilePaths[0],
					// 成功回调
					success: res => {
						console.log('上传成功', res)
					},
				})
			}
		})
	}
	
});