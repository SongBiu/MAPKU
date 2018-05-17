// pages/invitate_code/invitate_code.js
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		invitate_code:""
	},
	onLoad: function() {
		var that = this;
		wx.request({
			url: 'https://www.mapku.top/invitate_code',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function(res){
				that.setData({
					invitate_code: res.data.code
				})
			}
		})
	},
	copy: function() {
		var that = this;
		wx.setClipboardData({
			data:that.data.invitate_code
		})
	}
})
