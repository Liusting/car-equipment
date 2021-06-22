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
		db.collection('todos').get().then(res =>{
			console.log(res)
		}).catch(function (err) {
			console.log(err);
		})

	},
	addDbRecord(){
		const db = wx.cloud.database();
		db.collection('todos').add({
			// data 字段表示需新增的 JSON 数据
			data: {
				// _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
				description: "learn cloud database",
				due: new Date("2018-09-01"),
				tags: [
					"cloud",
					"database"
				],
				// 为待办事项添加一个地理位置（113°E，23°N）
				location: new db.Geo.Point(113, 23),
				done: false
			},
			success: function(res) {
				// res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
				console.log(res)
			}
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