//获取应用实例
var app = getApp();
Page({
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        dynamics: [],
        nickName: '',
        bind: true,
        openid: null,
        app: getApp()
    },
    onLoad: function() {
        var that = this;
        wx.request({
            url: 'https://www.mapku.top/wxapp/moment',
            method: 'GET',
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "cookie": wx.getStorageSync('cookie')
            },
            success: function(res) {
                console.log(res)
                if (res.data.success) {
                    that.setData({
                        dynamics: res.data.data
                    })
                }
                else {
                    wx.showModal({
                        title: 'fail',
                        content: res.data.message
                    })
                }

            }
        })
    },
    gotomy: function(res) {
        wx.navigateTo({
            url: '../my/my'
        })

    },
    gotoupload: function() {
        wx.redirectTo({
            url: '../upload/upload'
        })
    },
    preImg: function(event) {
        var src = event.currentTarget.dataset.src;
        var imgList = event.currentTarget.dataset.src;
        wx.previewImage({
            current: src,
            urls: [imgList]
        })
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading()
        var that = this;
        wx.request({
            url: 'https://www.mapku.top/all_dynamic',
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "cookie": wx.getStorageSync('cookie')
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    dynamics: res.data
                })
            }
        })
    },
    givegood: function(e) {
        console.log(e)
        var that = this;
        var dyid = e.currentTarget.dataset.dyid;
        var index = e.currentTarget.dataset.index;
        if (this.data.dynamics[index].has_good) {
            wx.showToast({
                title: '您已经点过赞了'
            })
            return;
        }
        wx.request({
            url: 'https://www.mapku.top/good',
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "cookie": wx.getStorageSync('cookie')
            },
            data: {
                dyid: dyid
            },
            success: function(res) {
                console.log(res)
                if (res.data == "success") {
                    var d = that.data.dynamics;
                    d[index].has_good = true;
                    d[index].good = d[index].good + 1;
                    that.setData({
                        dynamics: d
                    })
                }


            }
        })
    },
    onShareAppMessage: function() {

    }
})