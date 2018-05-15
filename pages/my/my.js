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
				url: 'http://39.106.71.227/get_userinfo',
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
	invitate_code: function () {
		console.log("hi")
		if (app.invitate_code != '') {
			wx.navigateTo({
				url: '../invitate_code/invitate_code'
			})
		} else {
			wx.request({
				url: app.url_pre + '/invitate.php',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: 'POST',
				data: {
					invitater: this.data.openid
				},
				success: function (res) {
					app.invitate_code = res.data;
					wx.navigateTo({
						url: '../invitate_code/invitate_code'
					})
				},
			})
		}
	},
	myDynamic: function () {
		wx.navigateTo({
			url: '../myDynamic/myDynamic'
		})
	},
	myCommunity: function () {
		if (this.data.communityName == null) {
			wx.redirectTo({
				url: '../join/join'
			})
		}
		else {
			wx.redirectTo({
				url: '../leadboard/leadboard'
			})
		}
	},
	gotoindex: function () {
		wx.redirectTo({
			url: '../index/index'
		})
	},
	contact: function () {
		wx.navigateTo({
			url: '../contact/contact'
		})
	},
	selectImg: function () {
		wx.chooseImage({
			count: 1, // 最多可以选择的图片张数，默认9
			sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
			sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
			success: function (res) {
				app.imgPath = res.tempFilePaths[0]
				wx.navigateTo({
					url: '../upload/upload'
				})
			}
		})
	},
	gotomy: function () {
		wx.redirectTo({
			url: '../my/my'
		})
	},
	bindGetUserInfo(res) {
		var that = this;
		console.log(res)
		var data = res.detail.userInfo;
		wx.request({
			url: 'http://39.106.71.227/push_userinfo',
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
					url: 'http://39.106.71.227/get_userinfo',
					method: 'POST',
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						"cookie": wx.getStorageSync('cookie')
					},
					success: function (res) {
						that.setData({
							info: res.data
						})
					}
				})
			}
		})

	}
})