//index.js
//获取应用实例
var app = getApp()

Page({
	data: {
		motto: '环保推广小程序',
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		dynamics: [],
		nickName:'',
		bind: true
	},
	//事件处理函数
	bindViewTap: function () {
	},
	onLoad: function () {
		var that = this;
		wx.request({
			url: app.url_pre + '/userinfo.php',
			success:function(res) {
				if (res.data.length != 0) {
					that.setData({
						bind:false
					})
				}
			}
		})
		var that = this;
		wx.getUserInfo({
			success: function (res) {
				var userInfo = res.userInfo;
				that.setData({
					nickName: userInfo.nickName
				})
				app.nickName = userInfo.nickName;
			}
		})
		
	},
	getUserInfo: function (e) {
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	button: function () {

	},
	onShow: function() {
		wx.request({
			url: app.url_pre + '/img/x.jpg',
			success: function(res) {
				console.log(res)
			}
		})
		var that = this;
		wx.request({
			url: app.url_pre + '/all_dynamic.php',
			success: function (res) {
				that.setData({
					dynamics: res.data
				})
			}
		})
		wx.downloadFile({
			url:app.url_pre + 'x.jpg',
			success:function(res) {
				console.log(res)
			}
		})
	}
})
