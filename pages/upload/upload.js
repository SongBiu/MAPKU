const app = getApp();
Page({
	data: {
		imgPath:"x.png"
	},
	formSubmit: function(event) {
		var img = this.data.imgPath[0];
		console.log(img)
		wx.uploadFile({
			url: app.url_pre + '/uploadImage.php',
			filePath: img,
			name: 'image',
			complete: function(res) {
				console.log(res)
			}
		})
		wx.request({
			url: app.url_pre + '/upload.php',
			data: {
				countBag: event.detail.number,
				say: event.detail.talk
			}
		})
	},
	loadImage: function() {
		var that = this;
		console.log("This is load")
		wx.chooseImage({
			count: 1,
			sizeType:['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				that.setData({
					imgPath:res.tempFilePaths
				})
			},
			complete: function() {
				console.log("about over")
				console.log(that.data.imgPath)
			}
		})
		console.log("you upload a image")
		
	}
})