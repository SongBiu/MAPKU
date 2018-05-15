//index.js
//获取应用实例
var app = getApp();
Page({
	data: {
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
		wx.request({
			url: 'http://39.106.71.227/all_dynamic',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"cookie": wx.getStorageSync('cookie')
			},
			success: function(res) {
				that.setData({
					dynamics: res.data
				})
			}
		})
	}
	// giveGood: function(event) {
		
	// 	var dynamicID = event.currentTarget.id;
	// 	wx.request({
	// 		url: app.url_pre + "/giveGood.php",
	// 		header: {
	// 			"Content-Type": "application/x-www-form-urlencoded"
	// 		},
	// 		method: 'POST',
	// 		data:{
	// 			openid:this.data.openid,
	// 			dynamicID:dynamicID
	// 		},
	// 		success:function(res) {
				
	// 		}
	// 	})
	// },
	// preImg: function(event) {
	// 	var src = event.currentTarget.dataset.src;
	// 	var imgList = event.currentTarget.dataset.src;
	// 	wx.previewImage({
	// 		current:src,
	// 		urls: [imgList]
	// 	})
	// },
	// cancelGood:function(event) {
	// 	var that = this;
	// 	var dynamicID = event.currentTarget.id;
	// 	wx.request({
	// 		url:app.url_pre + '/cancelGood.php',
	// 		header: {
	// 			"Content-Type": "application/x-www-form-urlencoded"
	// 		},
	// 		method: 'POST',
	// 		data:{
	// 			openid:this.data.openid,
	// 			dynamicID:dynamicID
	// 		},
	// 		success: function(res) {
	// 			that.data.dynamics[dynamicID].good -= 1;
	// 			that.data.dynamics[dynamicID].hasGood = false;
	// 		}
	// 	})
		
	// },
	// gotoreg: function() {
	// 	wx.redirectTo({
	// 		url: '../signup/signup'
	// 	})
	// },
	// selectImg: function() {
	// 	wx.chooseImage({
	// 		count: 1, // 最多可以选择的图片张数，默认9
	// 		sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
	// 		sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
	// 		success: function(res){
	// 			app.imgPath = res.tempFilePaths[0]
	// 			wx.navigateTo({
	// 				url: '../upload/upload'
	// 			})
	// 		}
	// 	})
	// },
	// gotomy: function() {
	// 	wx.redirectTo({
	// 		url: '../my/my'
	// 	})
	// }
})
