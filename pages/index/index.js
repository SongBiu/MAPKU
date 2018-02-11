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
		bind: true,
		openid:''
	},
	//事件处理函数
	bindViewTap: function () {
	},
	onLoad: function () {
		var that = this;
		this.setData({
			openid:app.globalData.openid
		})
		wx.request({
			url: app.url_pre + '/userinfo.php',
			data:{
				usr_id:this.data.openid
			},
			success:function(res) {
				console.log(res)
				if (res.data.length != 0) {
					that.setData({
						bind:false
					})
					app.bind = false
				}
				else {
					app.bind = true;
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
		this.setData({
			bind:app.bind
		})
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
				
			}
		})
	},
	onReady: function() {
		var that = this;
		wx.login({
			success: function (res) {
				var json_code = res.code
				wx.request({
					url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.data.appID + '&secret=' + app.data.secret + '&js_code=' + json_code + '&grant_type=authorization_code',
					success: function (res) {
						var id = res.data.openid;
						app.globalData.openid = id;
						that.setData({
							openid:id
						})
					}
				})
			},
			complete: function (res) {
			}
		})
	}
})
