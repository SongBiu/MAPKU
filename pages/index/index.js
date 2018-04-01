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
		var that = this;
		wx.login({
			success: function (res) {
				var jsonCode = res.code
				wx.request({
					url: app.url_pre + "/getOpenid.php",
					header:{
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					data:{
						jsonCode:jsonCode
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
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							method: 'POST',
							data: {
								usrID: id
							},
							success: function (res) {
								that.setData({
									bind: true
								})
								app.bind = true;
								if (res.data.length == 0) {
									that.setData({
										bind: false
									})
									app.bind = false
								}
								else {
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
									header: {
										"Content-Type": "application/x-www-form-urlencoded"
									},
									method: 'POST',
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
	onReady: function() {
		// wx.getUserInfo({
		// 	success: res => {
		// 		// this.data.app.globalData.userInfo = res.userInfo
		// 		this.setData({
		// 			userInfo: res.userInfo,
		// 			// app.globalData.userInfo: res.userInfo,
		// 			hasUserInfo: true
		// 		})
		// 	}
		// })
	},
	onShow: function() {
		var that = this;
		this.getUserInfo
		wx.login({
			success: function (res) {
				var jsonCode = res.code
				wx.request({
					url: app.url_pre + "/getOpenid.php",
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: 'POST',
					data: {
						jsonCode: jsonCode
					},
					success: function (res) {
						var id = res.data.openid
						wx.request({
							url: app.url_pre + '/userinfo.php',
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							method: 'POST',
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
							header: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							method: 'POST',
							data:{
								openid: res.data.openid
							},
							success: function (res) {
								
								that.setData({
									dynamics: res.data
								})
							}
						})
					}
				})
			},
			fail: function(res) {
				
			}
		})
		
		
	},
	giveGood: function(event) {
		
		var dynamicID = event.currentTarget.id;
		wx.request({
			url: app.url_pre + "/giveGood.php",
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			data:{
				openid:this.data.openid,
				dynamicID:dynamicID
			},
			success:function(res) {
				
			}
		})
	},
	preImg: function(event) {
		var src = event.currentTarget.dataset.src;
		var imgList = event.currentTarget.dataset.src;
		wx.previewImage({
			current:src,
			urls: [imgList]
		})
	},
	cancelGood:function(event) {
		var that = this;
		var dynamicID = event.currentTarget.id;
		wx.request({
			url:app.url_pre + '/cancelGood.php',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
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
		wx.redirectTo({
			url: '../signup/signup'
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
	gotomy: function() {
		wx.redirectTo({
			url: '../my/my'
		})
	}
})
