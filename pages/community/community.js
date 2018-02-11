var app = getApp();
Page({
	data: {
		members:[],
		openid:null
	},
	onShow: function() {
		var that = this;
		wx.request({
			url: app.url_pre + '/thisCommunity.php',
			data:{
				usrID:this.data.openid
			},
			success:function(res) {

				that.setData({
					members: res.data
				})
			}
		})
	},
	onLoad: function() {
		this.setData({
			openid:app.openid
		})
	}
})