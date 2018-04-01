
App({
	globalData: {
		userInfo: {},
		openid:null,
		nickName:null,
		communityName: null,
		invitateCode: null,
		PKU: false,
	},
	data:{
		jsonCode:''
	},
	nickName: '',
	openid: '',
	invitate_code: '',
	community_name: '',
	json_code:'',
	PKU: false,
	bind:null,
	url_pre: "https://www.mapku.top",
	communityID:null,
	imgPath: null,
	onLaunch: function () {
		var that = this;
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
		
		// wx.clearStorage();
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
	},  
	// wx.uploadFile({
	// 	url: 'https://String',
	// 	filePath:'filePath',
	// 	name:'name',
	// 	// header: {}, // 设置请求的 header
	// 	// formData: {}, // HTTP 请求中其他额外的 form data
	// 	success: function(res){
	// 		// success
	// 	},
	// 	fail: function() {
	// 		// fail
	// 	},
	// 	complete: function() {
	// 		// complete
	// 	}
	// })
})
