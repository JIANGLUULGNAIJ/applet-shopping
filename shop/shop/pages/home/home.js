import request from "../../utils/request/request"

// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comlist:[],
        goodslist:[]
    },

    current:1,
    total:0,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.renderSwiper(),
        this.renderGoods()
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
        setTimeout(() => {
            // 刷新数据
            wx.stopPullDownRefresh({
              success: (res) => {
                  console.log("success");
              },
              fail: (err) => {
                console.log("fail");
              },
              complete: (res) => {
                
              },
            })
        }, 1000);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        // 数据查询完毕，不用再发送请求，直接返回
        if(this.data.goodslist.length===this.total){
            return
        }
        // 到底页码加一，然后发送一次请求
        this.current++,
        this.renderGoods()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 轮播图方法
    renderSwiper(){
        request({
            url:"/recommends"
        }).then(res=>{
            this.setData({
                comlist:res
            })
        })
    },

    // 商品列表
    renderGoods(){
        request({
            url:`/goods?_page=${this.current}&_limit=5`,
        },true).then(res=>{
            // 将获取到的总数居条数赋值给total
            this.total=Number(res.total),
            this.setData({
                // 将新数据追加到老数据后面
                goodslist:[...this.data.goodslist,...res.list]
            })
        })
    },

    // 搜索框回调函数
    handleEvent(){
        wx.navigateTo({
            url:'/pages/search/search'
        })
    },

    // 点击商品，跳转详情页面
    handleChangePage(evt){
        var id =evt.currentTarget.dataset.id
        var title = evt.currentTarget.dataset.title
        // 跳转页面
        wx.navigateTo({
            // 跳转到详情页面并携带id
          url: `/pages/detail/detail?id=${id}&title=${title}`,
        })
    }
})