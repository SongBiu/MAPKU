//index.js
//获取应用实例
var app = getApp();
Page({
	data: {
		motto: '环保推广小程序',
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		dynamics: [],
		nickName:'',
		bind: true,
		openid:null,
		app:getApp()
	},
	onLoad: function () {
		console.log("onLoad")
		var that = this;
		wx.login({
			success: function (res) {
				var jsonCode = res.code
				wx.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.data.appID + '&secret=' + app.data.secret + '&js_code=' + jsonCode + '&grant_type=authorization_code',
					success: function (res) {
						var id = res.data.openid
						that.setData({
							openid:id
						})
						app.openid = id;
					},
					complete: function(res) {
						var id = res.data.openid
						wx.request({
							url: app.url_pre + '/userinfo.php',
							data:{
								usrID:id
							},
							success:function(res) {
								that.setData({
									bind:true
								})
								app.bind = true;
								if (res.data.length == 0) {
									console.log("LOAD bind error!")
									that.setData({
										bind:false
									})
									app.bind = false
								}
								else {
									console.log(res)
									app.PKU = res.data.PKU
									app.nickName = res.data.name
									that.setData({
										nickName:res.data.name
									})
								}
							}
						})
					}
				})
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
	onShow: function() {
		var that = this;
		this.getUserInfo
		console.log("SHOW")
		wx.login({
			success: function (res) {
				var jsonCode = res.code
				wx.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.data.appID + '&secret=' + app.data.secret + '&js_code=' + jsonCode + '&grant_type=authorization_code',
					success: function (res) {
						var id = res.data.openid
						wx.request({
							url: app.url_pre + '/userinfo.php',
							data:{
								usrID:id
							},
							success:function(res) {
								if (res.data.length != 0) {
									that.setData({
										bind:true
									})
									app.bind = true;
								}
								else {
									that.setData({
										bind:false
									})
									app.bind = false;
								}
							}
						})
					},
					complete: function(res) {
						wx.request({
							url: app.url_pre + '/all_dynamic.php',
							success: function (res) {
								console.log(res)
								that.setData({
									dynamics: res.data
								})
							}
						})
					}
				})
			}
		})
		
		
	},
	onReady: function() {
		
	},
	giveGood: function(event) {
		
	}
})
