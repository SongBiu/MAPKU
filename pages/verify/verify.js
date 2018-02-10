// pages/verify/verify.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		code:null,
		emailError:false,
		inputWrong:false
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
	eMailSubmit: function (event) {
		var that = this;
		console.log(event)
		var id = event.detail.value.ID;
		console.log(id == "")
		if (id == "") {
			this.setData({
				eMailError:true
			})
		} else {
			this.setData({
				eMailError: false
			})
		}
		wx.request({
			url: app.url_pre + '/PKUverify.php',
			data: {
				pkuID:id
			},
			success:function(res) {
				var send = res.data;
				that.setData({
					code:send
				})
			}
		})
	},
	verifyCodeSubmit: function(event) {
		var input = event.detail.value.verify;
		if (input == this.data.code) {
			wx.request({
				url: app.url_pre + 'verifySuccess.php',
				data:{
					usr_id: '5'
				},
				success:function(){
					console.log("认证完成")
				}
			})
		}
	}
})