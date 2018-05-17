// pages/shop/shop.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		PKU: false,
		score: null,
		postcard: 0,
		vouchers: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!wx.getStorageSync('cookie')) {
			wx.showToast({
				title: '请先登录',
				success: function() {
					wx.redirectTo({
						url: '../my/my'
					})
				}
			})
		}
		var that = this;
		this.setData({
			PKU: wx.getStorageSync('PKU')
		})
		wx.request({
			url: 'https://www.mapku.top/get_userinfo',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function(res) {
				console.log(res)
				that.setData({
					score: res.data.score,
					postcard: res.data.ownpostcard,
					vouchers: res.data.ownvouchers
				})
			}
		})
	},
	buy: function(e) {
		console.log(e)
		var shop = e.currentTarget.dataset.type;
		var that = this;
		wx.request({
			url: 'https://www.mapku.top/buy',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			data: {
				shop: shop
			},
			success: function(res) {
				console.log(res)
				if (res.data.res == "success") {
					that.setData({
						score: res.data.data.score,
						postcard: res.data.data.ownpostcard,
						vouchers: res.data.data.ownvouchers
					})
				} else {
					wx.showToast({
						title: '您的积分不足'
					})
				}
			}
		})
	},
	use: function(e) {
		console.log(e)
		var that = this;
		var name = e.currentTarget.dataset.name;
		if (name == "postcard" && that.data.postcard == 0) {
			wx.showToast({
				title: '明信片不足'
			})
			return
		}
		if (name == "vouchers" && that.data.vouchers == 0) {
			wx.showToast({
				title: '代金券不足'
			})
			return
		}
		wx.request({
			url: 'https://www.mapku.top/use',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			data: {
				name: name
			},
			success: function(res) {
				console.log(res)
				if (res.data.res == "success") {
					wx.showToast({
						title: '使用成功'
					})
					if (name == "postcard") {
						that.setData({
							postcard: that.data.postcard - 1
						})
					} else {
						that.setData({
							vouchers: that.data.vouchers - 1
						})
					}
				}
			}
		})
	},
	gotoleadboard: function () {
		wx.redirectTo({
			url: '../leadboard/leadboard'
		})
	},
	gotojoin: function () {
		wx.redirectTo({
			url: '../join/join'
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
	}
})