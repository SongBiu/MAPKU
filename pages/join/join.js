// pages/join/join.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data:{
		items: [],
		community_id: wx.getStorageSync('community_id')
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.request({
			url: 'http://39.106.71.227/all_community',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function(res) {
				that.setData({
					communitys: res.data
				})
			}
		})
	},
	join: function(event) {
		console.log(event)
		wx.request({
			url: app.url_pre + '/join.php',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			data:{
				usrID:this.data.openid,
				communityID:event.target.id
			}
		})
		app.communityID = event.target.id;
		wx.redirectTo({
			url: '../join/join'
		})
	},
	selectImg: function() {
		wx.chooseImage({
			count: 1, // 最多可以选择的图片张数，默认9
			sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
			sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
			success: function(res){
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
	gotoindex: function () {
		wx.redirectTo({
			url: '../index/index'
		})
	},
	gotoleadboard: function() {
		wx.redirectTo({
			url: '../leadboard/leadboard'
		})
	},
	gotoshop:function() {
		wx.redirectTo({
			url: '../shop/shop'
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
	}
})