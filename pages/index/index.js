//index.js
//获取应用实例
var app = getApp();
Page({
	data: {
		motto: '环保推广小程序',
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		dynamics: [],
		nickName:'',
		bind: true,
		openid:null,
		app:getApp()
	},
	onLoad: function () {
		console.log("onLoad")
		var that = this;
		wx.login({
			success: function (res) {
				var jsonCode = res.code
				wx.request({
					url: app.url_pre + "/getOpenid.php",
					data:{
						jsonCode:jsonCode,
						appID:app.data.appID,
						secret: app.data.secret
					},
					success(res) {
						var id = res.data.openid;
						that.setData({
							openid:id
						})
						app.openid = id;
					},
					complete: function(res) {
						var id = res.data.openid;
						wx.request({
							url: app.url_pre + '/userinfo.php',
							data: {
								usrID: id
							},
							success: function (res) {
								that.setData({
									bind: true
								})
								app.bind = true;
								if (res.data.length == 0) {
									console.log("LOAD bind error!")
									that.setData({
										bind: false
									})
									app.bind = false
								}
								else {
									console.log(res)
									app.PKU = res.data.PKU
									app.nickName = res.data.name
									that.setData({
										nickName: res.data.name
									})
									app.communityID = res.data.communityID;
								}
							},
							complete: function(res) {
								var openid = app.openid;
								var imgUrl = app.globalData.userInfo.avatarUrl;
								wx.request({
									url: app.url_pre + "/uploadAvar.php",
									data: {
										usrID:openid,
										avatarUrl:imgUrl
									},
									method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
									// header: {}, // 设置请求的 header
									success: function(res){
										// success
									},
									fail: function() {
										// fail
									},
									complete: function() {
										// complete
									}
								})
							}
						})
					}
				})
			}
		})
		
	},
	// getUserInfo: function (e) {
	// 	app.globalData.userInfo = e.detail.userInfo
	// 	this.setData({
	// 		userInfo: e.detail.userInfo,
	// 		hasUserInfo: true
	// 	})
	
	// },
	onShow: function() {
		var that = this;
		this.getUserInfo
		console.log("SHOW")
		wx.login({
			success: function (res) {
				var jsonCode = res.code
				wx.request({
					url: app.url_pre + "/getOpenid.php",
					data: {
						jsonCode: jsonCode,
						appID: app.data.appID,
						secret: app.data.secret
					},
					success: function (res) {
						console.log(res)
						var id = res.data.openid
						wx.request({
							url: app.url_pre + '/userinfo.php',
							data:{
								usrID:id
							},
							success:function(res) {
								if (res.data.length != 0) {
									that.setData({
										bind:true
									})
									app.bind = true;
									app.communityID = res.data.communityID;
								}
								else {
									that.setData({
										bind:false
									})
									app.bind = false;
								}
							}
						})
					},
					complete: function(res) {
						wx.request({
							url: app.url_pre + '/all_dynamic.php',
							data:{
								openid: res.data.openid
							},
							success: function (res) {
								console.log(res)
								that.setData({
									dynamics: res.data
								})
							}
						})
					}
				})
			},
			fail: function(res) {
				console.log(res)
			}
		})
		
		
	},
	onReady: function() {
		
	},
	giveGood: function(event) {
		console.log(event)
		var dynamicID = event.currentTarget.id;
		wx.request({
			url: app.url_pre + "/giveGood.php",
			data:{
				openid:this.data.openid,
				dynamicID:dynamicID
			},
			success:function(res) {
				console.log(res)
			}
		})
	},
	preImg: function(event) {
		console.log(event)
		var src = event.currentTarget.dataset.src;
		var imgList = event.currentTarget.dataset.src;
		wx.previewImage({
			current:src,
			urls: [imgList]
		})
	},
	cancelGood:function(event) {
		console.log(event)
		var that = this;
		var dynamicID = event.currentTarget.id;
		wx.request({
			url:app.url_pre + '/cancelGood.php',
			data:{
				openid:this.data.openid,
				dynamicID:dynamicID
			},
			success: function(res) {
				that.data.dynamics[dynamicID].good -= 1;
				that.data.dynamics[dynamicID].hasGood = false;
			}
		})
		
	},
	gotoreg: function() {
		wx.navigateTo({
			url: '../signup/signup'
		})
	}
})
