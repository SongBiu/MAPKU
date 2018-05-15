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
			url: 'http://39.106.71.227/all_dynamic',
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
	gotomy: function(res) {
		wx.navigateTo({
			url: '../my/my'
		})
	}
})
