// pages/myDynamic/myDynamic.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dynamics: [],
		avatarUrl: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.getStorage({
			key: 'avatarUrl',
			success: function (res) {
				that.setData({
					avatarUrl: res.data
				})
			}
		})
		wx.request({
			url: 'https://www.mapku.top/my_dynamic',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function (res) {
				that.setData({
					dynamics: res.data
				})
			}
		})
	},
	gotoindex: function () {
		wx.redirectTo({
			url: '../index/index'
		})
	},
	gotomy: function () {
		wx.redirectTo({
			url: '../my/my'
		})
	},
	preImg: function (event) {
		var src = event.currentTarget.dataset.src;
		var imgList = event.currentTarget.dataset.src;
		wx.previewImage({
			current: src,
			urls: [imgList]
		})
	},
	gotomy: function () {
		wx.redirectTo({
			url: '../my/my'
		})
	},
	delete_dyna: function (e) {
		console.log(e)
		var that = this;
		var dyid = e.currentTarget.dataset.dyid;
		wx.showModal({
			title: '删除确认',
			content: '您确认要删除这条动态吗？',
			success: function (res) {
				console.log(res)
				if (res.confirm) {
					wx.request({
						url: 'https://www.mapku.top/delete_dynamic',
						method: 'POST',
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"cookie": wx.getStorageSync('cookie')
						},
						data: {
							dyid: dyid
						},
						success: function(res) {
							console.log(res)
							that.setData({
								dynamics: res.data
							})
						}
					})
				}
			}
		})
	}
})