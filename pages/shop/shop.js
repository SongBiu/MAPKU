// pages/shop/shop.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		PKU: false,
		app: getApp(),
		score: null,
		postcard: 0,
		vouchers: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		this.setData({
			PKU: app.PKU
		})
		wx.request({
			url: app.url_pre + "/goshopping.php",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			data: {
				usrID: app.openid
			},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				var score = parseInt(res.data.score);
				var postcard = parseInt(res.data.postcard);
				var vouchers = parseInt(res.data.vouchers);
				that.setData({
					score: score,
					postcard: postcard,
					vouchers: vouchers
				})
				// success
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	gotover: function () {
		wx.navigateTo({
			url: "../verify/verify"
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
	buy: function (event) {
		var score = event.target.dataset.score;
		if (score > this.data.score) {
			wx.showModal({
				title: "购买失败",
				content: "您的积分不足"
			})
			return;
		}
		wx.request({
			url: app.url_pre + "/buy.php",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			data: {
				usrID: app.openid,
				score: score
			},
			method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
			// header: {}, // 设置请求的 header
			success: function (res) {
				wx.showModal({
					title: '购买成功',
					content: '购买成功，请及时使用'
				})
				wx.redirectTo({
					url: '../shop/shop'
				})
			}
		})
	},
	use: function (event) {
		console.log(event)
		var name = event.target.dataset.name;
		if (name == "postcard") {
			if (this.data.postcard == 0) {
				wx.showModal({
					title: "使用失败",
					content: "您没有可以使用的明信片"
				})
				return;
			} else {
				wx.request({
					url: app.url_pre + "/use.php",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					data: {
						usrID: app.openid,
						useType: name
					},
					success: function () {
						wx.showToast({
							title: '使用成功',
							duration:6000
						})
						wx.redirectTo({
							url: '../shop/shop'
						})
					}
				})
			}
		} else {
			if (this.data.vouchers == 0) {
				wx.showModal({
					title: "使用失败",
					content: "您没有可以使用的装备租赁抵扣券"
				})
				return;
			} else {
				wx.request({
					url: app.url_pre + "/use.php",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					data: {
						usrID: app.openid,
						useType: name
					},
					success: function () {
						wx.showToast({
							title: '使用成功',
							duration:6000
						})
						wx.redirectTo({
							url: '../shop/shop'
						})
					}
				})
			}
		}
		console.log(event)
	}
})