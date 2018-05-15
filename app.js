
App({
	globalData: {
		userInfo: {},
		openid:null,
		nickName:null,
		communityName: null,
		invitateCode: null,
		PKU: false,
	},
	url_pre: "http://39.106.71.227",
	communityID:null,
	imgPath: null,
	onLaunch: function () {
		if (!wx.getStorageSync('cookie')) {
			wx.login({
				success:function(res) {
					wx.request({
						url: 'http://39.106.71.227/get_openid',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						data:{
							json_code: res.code
						},
						success: function(res) {
							var openid = res.data.openid;
							var cookie = "openid="+openid;
							wx.setStorageSync('cookie', cookie)
							wx.request({
								url: 'http://39.106.71.227/get_userinfo',
								method: 'POST',
								header: {
									"Content-Type": "application/x-www-form-urlencoded",
									"cookie": wx.getStorageSync('cookie')
								},
								success: function (res) {
									var PKU = res.data.PKU;
									var communityId = res.data.communityId;
									wx.setStorageSync('PKU', PKU)
									wx.setStorageSync('communityId', communityId)
								}
							})
						}
					})
				}
			})
		} else {
			wx.request({
				url: 'http://39.106.71.227/get_userinfo',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"cookie": wx.getStorageSync('cookie')
				},
				success: function(res) {
					var PKU = res.data.PKU;
					var communityId = res.data.communityId;
					wx.setStorageSync('PKU', PKU)
					wx.setStorageSync('communityId', communityId)
				}
			})
		}
		var that = this;
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		//获取用户信息
		wx.getSetting({
			success: res => {	
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// this.getUsetInfo(res)
							
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo
							
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
							
						 }
					})
				} else {
					wx.getUserInfo({
						success: res => {

							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}

						}
					})
				}
			},
			fail: function(res) {
				console.log("Fail")
			}
		})
	},
	getUserInfo: function (cb) {
		var that = this;
		if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo)
		} else {
			//调用登录接口  
			wx.login({
				success: function () {
					wx.getUserInfo({
						success: function (res) {
							that.globalData.userInfo = res.userInfo;
							typeof cb == "function" && cb(that.globalData.userInfo)
						}
					})
				}
			});
		}
	}
})
