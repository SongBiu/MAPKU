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
			url: 'https://www.mapku.top/this_community',
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
	},
	gotomy: function (res) {
		wx.navigateTo({
			url: '../my/my'
		})
	},
	gotoupload: function () {
		wx.navigateTo({
			url: '../upload/upload'
		})
	},
	gotoindex: function () {
		wx.redirectTo({
			url: '../index/index'
		})
	},
	gotojoin:function() {
		wx.redirectTo({
			url: '../join/join'
		})
	},
	gotoshop: function() {
		wx.redirectTo({
			url: '../shop/shop'
		})
	},
	onShareAppMessage: function () {

	}
})