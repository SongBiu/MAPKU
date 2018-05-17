// pages/verify/verify.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
	},
	eMailSubmit(e) {
		console.log(e)
		var name = e.detail.value.ID;
		wx.request({
			url: 'https://www.mapku.top/verify_push',
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
			}
		})
	},
	verifyCodeSubmit: function(e) {
		console.log(e)
		var code = e.detail.value.verify;
		wx.request({
			url: 'https://www.mapku.top/verify_submit',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			data: {
				code: code
			},
			success: function(res) {
				console.log(res)
				if (res.data.content == "success") {
					wx.setStorageSync('PKU', 1)
					wx.showToast({
						title: '认证成功',
						success: function() {
							wx.redirectTo({
								url: '../shop/shop'
							})
						}
					})
				} else {
					wx.showToast({
						title: '验证码错误'
					})
				}
			}
		})
	}
})