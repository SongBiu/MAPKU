// pages/myDynamic/myDynamic.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dynamics: [],
		avatarUrl: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.getStorage({
			key: 'avatarUrl',
			success: function(res) {
				that.setData({
					avatarUrl: res.data
				})
			}
		})
		wx.request({
			url: 'http://39.106.71.227/my_dynamic',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function(res) {
				that.setData({
					dynamics: res.data
				})
			}
		})
	},
	gotoindex:function() {
		wx.redirectTo({
			url: '../index/index'
		})
	},
	gotomy:function() {
		wx.redirectTo({
			url: '../my/my'
		})
	},
	selectImg: function () {
		wx.chooseImage({
			count: 1, // 最多可以选择的图片张数，默认9
			sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
			sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
			success: function (res) {
				app.imgPath = res.tempFilePaths[0]
				wx.navigateTo({
					url: '../upload/upload'
				})
			}
		})
	},
	preImg: function (event) {
		var src = event.currentTarget.dataset.src;
		var imgList = event.currentTarget.dataset.src;
		wx.previewImage({
			current: src,
			urls: [imgList]
		})
	},
	gotomy: function() {
		wx.redirectTo({
			url: '../my/my'
		})
	}
})