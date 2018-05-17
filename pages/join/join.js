// pages/join/join.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [],
		community_id: ""
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		that.setData({
			community_id: wx.getStorageSync('community_id')
		})

		wx.request({
			url: 'https://www.mapku.top/all_community',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function (res) {
				that.setData({
					communitys: res.data
				})
			}
		})
	},
	join: function (e) {
		var community_id = e.currentTarget.dataset.community_id;
		var that = this;
		wx.request({
			url: 'https://www.mapku.top/join',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			data: {
				community_id: community_id
			},
			success: function (res) {
				that.setData({
					community_id: community_id
				})
				wx.setStorageSync('community_id', community_id);
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
	gotoshop: function () {
		wx.redirectTo({
			url: '../shop/shop'
		})
	},
	gotoleadboard: function() {
		wx.redirectTo({
			url: '../leadboard/leadboard'
		})
	}
})