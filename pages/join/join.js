// pages/join/join.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data:{
		items: [],
		openid:null,
		app:getApp()
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			openid:app.openid
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		var that = this;
		wx.request({
			url: app.url_pre + "/allCommunity.php",
			success: function(res) {
				that.setData({
					items: res.data
				})
			},
			fail: function() {
				console.log("some error")
			}
		})
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
	join: function(event) {
		console.log(event)
		wx.request({
			url: app.url_pre + '/join.php',
			data:{
				usrID:this.data.openid,
				communityID:event.target.id
			}
		})
		app.communityID = event.target.id;
		wx.navigateTo({
			url: "../join/join"
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
	}
})