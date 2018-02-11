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
		openid:null
	},
	//事件处理函数
	bindViewTap: function () {
	},
	onLoad: function () {
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
						
					}
				})
			},
			complete: function (res) {
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
		app.globalData.openid = this.data.openid;
		wx.request({
			url: app.globalData.urlPre + '/userinfo.php',
			data:{
				usrID:this.data.openid
			},
			success:function(res) {
				if (res.data.length != 0) {
					that.setData({
						bind:false
					})
				}
				app.PKU = res.data.PKU
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
<<<<<<< HEAD
		this.setData({
			bind:app.bind
		})
		// wx.request({
		// 	url: app.globalData.urlPre + '/allDynamic.php',
		// 	success: function (res) {
		// 		console.log(res)
		// 		that.setData({
		// 			dynamics: res.data
		// 		})
		// 	}
		// })
		// wx.login({
		// 	success:function(res) {
=======
		
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
		wx.request({
			url: app.url_pre + '/all_dynamic.php',
			success: function (res) {
				that.setData({
					dynamics: res.data
				})
			}
		})
		wx.login({
			success:function(res) {
>>>>>>> parent of df52954... bugKill
				
		// 	}
		// })
	}
})
