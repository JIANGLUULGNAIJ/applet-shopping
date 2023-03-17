// pages/center/center.js
import CheckAuth from "../../utils/auth/auth"
import request from "../../utils/request/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null
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
        // 每次显示页面都要进行登录逻辑判断
        CheckAuth(()=>{})

        // 将个人信息存入字段
        this.setData({
            userInfo:wx.getStorageSync('token')
        })
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

    // 更换头像
    changeimage(){
        wx.chooseMedia({
            count: 9,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            camera: 'back',
            // 获取图片成功，将图片路径存入userInfo中
            success:(res)=> {
                this.setData({
                    userInfo:{
                        ...this.userInfo,
                        avatarUrl:res.tempFiles[0].tempFilePath
                    }
                }),

                // 同步token,jsonserver不能上传图片，所以就不用更新头像图片
                wx.setStorageSync('token', {
                        ...this.userInfo,
                        avatarUrl:res.tempFiles[0].tempFilePath
                })
            }
          })
    }
})