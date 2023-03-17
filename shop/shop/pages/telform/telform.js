import request from "../../utils/request/request"

// pages/telform/telform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tel:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 输入框内容
    formInputChange(evt){
        // 同步手机号
        this.setData({
            tel:evt.detail.value
        })
    },

    // 点击确定
    submitForm(){
        // 将电话号码存入内存,此时已有token
        wx.setStorageSync('tel', this.data.tel)

        // 发送请求，进行登录验证
        request({  
            // 用电话号码和用户名进行验证
            url:`/users?tel=${this.data.tel}&nickName=${wx.getStorageSync('token').nickName}`
        }).then(res=>{
            if(res.length===0){
                // 登录失败
                // 没有此用户，自动注册
                request({
                    url:"/users",
                    method:"post",
                    data:{
                        ...wx.getStorageSync('token'),
                        tel:this.data.tel
                    }
                }).then(res=>{
                    // 注册成功
                    // 回退两页
                    wx.navigateBack({
                        delta:2
                    })
                })
            }else{
                // 登录成功，回退两页
                // 或者换手机号了，但是以前的登录信息还在
                wx.navigateBack({
                    delta:2
                })
            }
        })
    }
})