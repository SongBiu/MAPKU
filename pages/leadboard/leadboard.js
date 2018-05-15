// pages/leadboard/leadboard.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		the_first:null,
		others:null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.request({
			url: 'http://39.106.71.227/this_community',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			data: {
				community_id: wx.getStorageSync('community_id')
			},
			success: function(res) {
				that.setData({
					the_first: res.data.the_first,
					others: res.data.others
				})
			}
		})
	}
})