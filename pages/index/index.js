//index.js
//获取应用实例
var app = getApp()

Page({
	globalData: {
		appid: 'wxf75f308cbcc043f1',
		secret: '91b08bb2c99810aa3808c9a283e59178'
	},
	data: {
		motto: '环保推广小程序',
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		dynamics: []
	},
	//事件处理函数
	bindViewTap: function () {
	},
	onLoad: function () {
		wx.getUserInfo({
			success: function (res) {
				var userInfo = res.userInfo;
				app.nickName = userInfo.nickName;
			}
		})
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	button: function () {
		console.log("you button me!")
	}
})
