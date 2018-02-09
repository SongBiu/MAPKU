// pages/build/build.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		app:getApp()
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
	formSubmit: function (event) {
		console.log(event)
		var value = event.detail.value;
		wx.request({
			url: app.url_pre + '/build.php',
			data: {
				name:value.communityName,
				desc:value.desc,
				person:value.name,
				phone:value.phone,
				mail:value.mail
			},
			success: function (res) { 
				console.log("OK");
			},
			fail: function (res) {
				console.log('sorry, error');
			},
			complete: function (res) { 
				console.log("That's all");
			}
		})
	}
})