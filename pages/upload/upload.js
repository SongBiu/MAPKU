var app = getApp();
Page({
	data: {
		imgPath:null,
		openid:null,
		app:getApp()
	},
	
	formSubmit: function(event) {
		var img = app.imgPath;
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
				console.log(res)
				wx.uploadFile({
					url: app.url_pre + '/uploadImage.php',
					filePath: img,
					name: 'image',
					formData: {
						usrID: that.data.openid,
						dynamicID:res.data.dynamicID
					},
					complete: function (res) {
						
					}
				})
			}
		})
		wx.navigateTo({
			url:"../index/index"
		})
	},
	onLoad:function() {
		this.setData({
			openid:app.openid
		})
	}
})