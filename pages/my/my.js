// pages/my/my.js
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */

	data: {
		info: [],
		login: true
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		var that = this;
		if (wx.getStorageSync('cookie')) {
			wx.request({
				url: 'https://www.mapku.top/get_userinfo',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"cookie": wx.getStorageSync('cookie')
				},
				success: function (res) {
					console.log(res)
					if (res.data.name == undefined) {
						that.setData({
							login: false
						})
					}
					that.setData({
						info: res.data
					})
				}
			})
		} else {
			this.setData({
				login: false
			})
		}
	},
	bindGetUserInfo(res) {
		var that = this;
		if (!wx.getStorageSync('cookie')) {
			wx.login({
				success: function (res) {
					wx.request({
						url: 'https://www.mapku.top/get_openid',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						data: {
							json_code: res.code
						},
						success: function (res) {
							var openid = res.data.openid;
							var cookie = "openid=" + openid;
							wx.setStorageSync('cookie', cookie)
						}
					})
				}
			})
		} else {
			wx.request({
				url: 'https://www.mapku.top/get_userinfo',
				method: 'POST',
				header: {
					"Content-Type": "application/x-www-form-urlencoded",
					"cookie": wx.getStorageSync('cookie')
				},
				success: function (res) {
					var PKU = res.data.PKU;
					var community_id = res.data.community_id;
					wx.setStorageSync('PKU', PKU)
					wx.setStorageSync('community_id', community_id)
				}
			})
		}
		console.log(res)
		var data = res.detail.userInfo;
		wx.setStorageSync('avatarUrl', data.avatarUrl)
		wx.request({
			url: 'https://www.mapku.top/push_userinfo',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			data: {
				user_name: data.nickName,
				avatarUrl: data.avatarUrl
			},
			success: function (res) {
				console.log(res)
				wx.request({
					url: 'https://www.mapku.top/get_userinfo',
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"cookie": wx.getStorageSync('cookie')
					},
					success: function (res) {
						that.setData({
							info: res.data,
							login: true
						})
					}
				})
			}
		})
	},
	gotoupload: function () {
		wx.navigateTo({
			url: '../upload/upload'
		})
	},
	gotoindex: function() {
		wx.redirectTo({
			url: '../index/index'
		})
	},
	gotocommunity: function() {
		if (!wx.getStorageSync('cookie')) {
			wx.showToast({
				title: '请先登录'
			})
			return;
		}
		wx.navigateTo({
			url: '../leadboard/leadboard'
		})
	},
	gotomydynamic: function() {
		if (!wx.getStorageSync('cookie')) {
			wx.showToast({
				title: '请先登录'
			})
			return;
		}
		wx.navigateTo({
			url: '../myDynamic/myDynamic'
		})
	},
	gotoInvitate: function() {
		if (!wx.getStorageSync('cookie')) {
			wx.showToast({
				title: '请先登录'
			})
			return;
		}
		wx.navigateTo({
			url: '../invitate_code/invitate_code'
		})
	},
	contact: function() {
		wx.navigateTo({
			url: '../contact/contact'
		})
	}
})