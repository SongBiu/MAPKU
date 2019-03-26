// pages/my/my.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */

    data: {
        userDetail: [],
        login: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        var that = this;
        if (wx.getStorageSync('cookie')) {
            wx.request({
                url: 'https://www.mapku.top/wxapp/user',
                method: 'GET',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "cookie": wx.getStorageSync('cookie')
                },
                success: function(res) {
                    if (res.data.success) {
                        console.log(res)
                        wx.setStorageSync('userDetail', res.data.data);
                        that.setData({
                            userDetail: res.data.data
                        })
                    } else {
                        this.setData({
                            login: false
                        })
                    }

                }
            })
        } else {
            this.setData({
                login: false
            })
        }
    },
    bindGetUserInfo(res) {
        var that = this;
        var userInfo = res.detail.userInfo;
        if (!wx.getStorageSync('cookie')) {
            wx.login({
                success: function(res) {
                    wx.request({
                        url: 'https://www.mapku.top/wxapp/user/' + res.code,
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'PUT',
                        data: {
                            name: userInfo.nickName,
                            avatarUrl: userInfo.avatarUrl
                        },
                        success: function(res) {
                            console.log(res);
                            wx.setStorageSync('userDetail', res.data.data);
                            that.setData({
                                userDetail: res.data.data
                            })
                        }
                    })
                }
            })
        } else {
            wx.request({
                url: 'https://www.mapku.top/wxapp/user',
                method: 'GET',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "cookie": wx.getStorageSync('cookie')
                },
                success: function(res) {
                    console.log(res);
                    wx.setStorageSync('userDetail', res.data.data);
                    that.setData({
                        userDetail: res.data.data
                    })
                }
            })
        }



    },
    gotoupload: function() {
        wx.navigateTo({
            url: '../upload/upload'
        })
    },
    gotoindex: function() {
        wx.redirectTo({
            url: '../index/index'
        })
    },
    gotocommunity: function() {
        if (!wx.getStorageSync('cookie')) {
            wx.showToast({
                title: '请先登录'
            })
            return;
        }
        wx.navigateTo({
            url: '../leadboard/leadboard'
        })
    },
    gotomydynamic: function() {
        if (!wx.getStorageSync('cookie')) {
            wx.showToast({
                title: '请先登录'
            })
            return;
        }
        wx.navigateTo({
            url: '../myDynamic/myDynamic'
        })
    },
    gotoInvitate: function() {
        if (!wx.getStorageSync('cookie')) {
            wx.showToast({
                title: '请先登录'
            })
            return;
        }
        wx.navigateTo({
            url: '../invitate_code/invitate_code'
        })
    },
    contact: function() {
        wx.navigateTo({
            url: '../contact/contact'
        })
    }
})