// pages/join/join.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data:{
		items: [],
		openid:null
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
		wx.request({
			url: app.url_pre + '/join.php',
			data:{
				usrID:this.data.openid,
				communityID:event.target.id
			}
		})
	}
})