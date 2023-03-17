// 登录逻辑判断
function CheckAuth(callback){
    if(wx.getStorageSync('tel')){
        // 判断是否有手机号
        // 已登录，绑定了手机号
        callback()
    }else if(wx.getStorageSync('token')){
        // 判断是否有token
        // 已登录，需要绑定手机号
        wx.navigateTo({
          url: '/pages/telform/telform',
        })
    }else{
        // 都没有，跳转授权页面
        // 未登录，先登录
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
    }
}


export default CheckAuth