var app = getApp();
Page({
	data: {
		members:[],
		openid:''
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
	onReady:function() {
		this.setData({
			openid: app.globalData.openid
		})
	}
})