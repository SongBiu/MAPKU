var app = getApp();
Page({
	data: {
		members:[]
	},
	onShow: function() {
		var that = this;
		wx.request({
			url: app.url_pre + '/thisCommunity.php',
			data:{
				usrID:'5'
			},
			success:function(res) {

				that.setData({
					members: res.data
				})
			}
		})
	}
})