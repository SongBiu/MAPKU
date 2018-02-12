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
		wx.request({
			url: app.url_pre + '/all_dynamic.php',
			success: function (res) {
				console.log(res)
				that.setData({
					dynamics: res.data
				})
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
						app.openid = id;
						that.setData({
							openid:id
						})
					}
				})
			},
			complete: function (res) {
				wx.getUserInfo({	
					success: function (res) {
						var userInfo = res.userInfo;
						that.setData({
							nickName: userInfo.nickName
						})
						app.nickName = userInfo.nickName;
						wx.request({
							url: app.url_pre + '/userinfo.php',
							data:{
								usrID:that.data.openid
							},
							success:function(res) {
								if (res.data.length == 0) {
									console.log("bind error!")
									that.setData({
										bind:false
									})
								}
								console.log(res)
								app.PKU = res.data.PKU
							}
						})
					}
				})
			}
		})
	},
	giveGood: function(event) {
		
	}
})
