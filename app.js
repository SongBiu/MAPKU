App({
    onLaunch: function() {
        // wx.login({
        //     success: function(res) {
        //         wx.request({
        //             url: 'https://www.mapku.top/wxapp/user/' + res.code,
        //             method: 'PUT',
        //             header: {
        //                 "Content-Type": "application/x-www-form-urlencoded",
        //                 "cookie": wx.getStorageSync('cookie')
        //             },
        //             success: function(res) {
        //                 console.log(res)
        //                 wx.setStorageSync('cookie', 'user_id=' + res.data.openid)
        //             }
        //         })
        //     }
        // })
    }
})