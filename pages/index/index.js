//index.js
//获取应用实例
var app = getApp();
Page({
	data: {
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		dynamics: [],
		nickName:'',
		bind: true,
		openid:null,
		app:getApp()
	},
	onLoad: function () {
		var that = this;
		wx.request({
			url: 'https://www.mapku.top/all_dynamic',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function(res) {
				console.log(res)
				that.setData({
					dynamics: res.data
				})
			}
		})
	},
	gotomy: function(res) {
		wx.navigateTo({
			url: '../my/my'
		})
	},
	gotoupload: function() {
		wx.redirectTo({
			url: '../upload/upload'
		})
	},
	preImg: function (event) {
		var src = event.currentTarget.dataset.src;
		var imgList = event.currentTarget.dataset.src;
		wx.previewImage({
			current: src,
			urls: [imgList]
		})
	}
})
