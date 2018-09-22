
App({
	onLaunch: function () {
		wx.login ({
			success: function (res) {
				wx.request({
          url: 'https://www.mapku.top/get_openid',
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "cookie": wx.getStorageSync('cookie')
          },
          data: {
            json_code: res.code
          },
          success: function (res) {
            console.log(res)
            wx.setStorageSync('cookie', 'user_id='+res.data.openid)
          }
				})
			}
		})
	}
})
