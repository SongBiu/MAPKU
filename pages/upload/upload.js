var app = getApp();
Page({
	data: {
		imgPath:null,
		openid:null
	},
	
	formSubmit: function(event) {
		var img = this.data.imgPath[0];
		var value = event.detail.value;
		var that = this;
		wx.request({
			url: app.url_pre + '/upload.php',
			data: {
				countBag: event.detail.value.number,
				say: event.detail.value.talk,
				usrID:this.data.openid
			},
			success: function(res) {
				wx.uploadFile({
					url: app.url_pre + '/uploadImage.php',
					filePath: img,
					name: 'image',
					formData: {
						usrID: that.data.openid,
						dynamicID:res.data.dynamicID
					},
					complete: function (res) {
						console.log(res)
					}
				})
			}
		})
	},
	loadImage: function() {
		var that = this;

		wx.chooseImage({
			count: 1,
			sizeType:['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				console.log(res)
				that.setData({
					imgPath:res.tempFilePaths
				})
			},
			complete: function(res) {
				wx.uploadFile({
					url: app.url_pre + '/uploadImage.php',
					filePath: res.tempFilePaths[0],
					name: 'image',
					formData: {
						usrID: that.data.openid
					},
					complete: function (res) {
						console.log(res)
					}
				})
			}
		})
	},
	onLoad:function() {
		this.setData({
			openid:app.openid
		})
	}
})