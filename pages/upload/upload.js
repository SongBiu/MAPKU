var app = getApp();
Page({
	data: {
		img_url: null,
		say: "",
		types: ["顺手一袋", "心情记录"],
		position: "",
		count_bag: 1,
		index: 0,
		say_length: 0
	},
	bind_input: function (e) {
		console.log(e)
		if (this.data.say.length < 140) {
			var say = e.detail.value;
			this.setData({
				say: say,
				say_length: say.length
			})
		}
	},
	bindPicker: function (e) {
		console.log(e)
		var index = parseInt(e.detail.value);
		this.setData({
			index: index
		})
	},
	choose_position: function (e) {
		var that = this;
		wx.chooseLocation({
			success: function (res) {
				console.log(res)
				if (res.name == null) {
					that.setData({
						position: res.address
					})
				} else if (res.address == null) {
					that.setData({
						position: res.name
					})
				} else if (res.name == null && res.address == null) {
					that.setData({
						position: "获取地址失败"
					})
				} else {
					that.setData({
						position: res.name + ', ' + res.address
					})
				}

			},
		})
	},
	hideLocal: function () {
		this.setData({
			position: ""
		})
	},
	choose_img: function () {
		var that = this;
		wx.chooseImage({
			count: 1,
			success: function (res) {
				that.setData({
					img_url: res.tempFilePaths[0]
				})
			},
		})
	},
	bind_slider: function (e) {
		var count_bag = e.detail.value;
		this.setData({
			count_bag: count_bag
		})
	},
	submit: function () {
		var that = this;
		if (this.data.img_url == null && this.data.say == "") {
			wx.showModal({
				title: '请输入内容',
				content: '内容不能为空'
			})
			return;
		}
		if (this.data.img_url == null) {
			if (this.data.index == 0) {
				wx.showModal({
					title: '上传照片',
					content: '顺手一袋活动必须上传照片作为凭证'
				})
				return;
			}
			wx.request({
				url: 'https://www.mapku.top/upload_none',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"cookie": wx.getStorageSync('cookie')
				},
				data: {
					say: that.data.say,
					position: that.data.position,
					count_bag: that.data.count_bag,
					index: that.data.index
				},
				success: function(res) {
					wx.redirectTo({
						url: '../index/index',
					})
				}
			})
		} else {
			wx.uploadFile({
				url: 'https://www.mapku.top/upload',
				header: {
					"Content-Type": "multipart/form-data",
					"cookie": wx.getStorageSync('cookie')
				},
				filePath: that.data.img_url,
				method: 'POST',
				name: 'image',
				formData: {
					say: that.data.say,
					position: that.data.position,
					count_bag: that.data.count_bag,
					index: that.data.index
				},
				success: function (res) {
					wx.redirectTo({
						url: '../index/index',
					})
				},
				fail: function (res) {
					console.log(res)
				}
			})
		}
		
	}
})