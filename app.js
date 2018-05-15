
App({
	onLaunch: function () {
		if (!wx.getStorageSync('cookie')) {
			wx.login({
				success: function (res) {
					wx.request({
						url: 'http://39.106.71.227/get_openid',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						data: {
							json_code: res.code
						},
						success: function (res) {
							var openid = res.data.openid;
							var cookie = "openid=" + openid;
							wx.setStorageSync('cookie', cookie)
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
				success: function (res) {
					var PKU = res.data.PKU;
					var community_id = res.data.community_id;
					wx.setStorageSync('PKU', PKU)
					wx.setStorageSync('community_id', community_id)
				}
			})
		}
	}
})
