import request from "../../utils/request/request"

// pages/searchlist/searchlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodlist:[]
    },

    priceOrder:true,
    commentsOrder:true,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        // 设置标题
        wx.setNavigationBarTitle({
          title: options.title,
        }),

        //根据分类id获取数据
        this.getlist(options.id)
    },

    // 发送请求获取分类数据
    getlist(id){
        // 根据id发送请求，过滤
        request({
            url:`/categories/${id}?_embed=goods`
        }).then(res=>{
            this.setData({
                goodlist:res.goods
            })
        })
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

    // 点击列表中的商品，跳转至详情页面
    handleTap(evt){
        wx.navigateTo({
          url: `/pages/detail/detail?id=${evt.currentTarget.dataset.id}&title=${evt.currentTarget.dataset.title}`,
        })
    },

    // 对价格排序
    handlePrice(){
        // 点击取反
        this.priceOrder=!this.priceOrder,
        this.setData({
            // 返回值为真正序，为假倒序
            goodlist:this.priceOrder?
            this.data.goodlist.sort((item1,item2)=>item2.price-item1.price):
            this.data.goodlist.sort((item1,item2)=>item1.price-item2.price)
        })
    },

    // 对好评排序
    handleComments(){
        // 点击取反
        this.commentsOrder=!this.commentsOrder,
        this.setData({
            // 返回值为真正序，为假倒序
            goodlist:this.commentsOrder?
            this.data.goodlist.sort((item1,item2)=>parseInt(item2.goodcomment)-parseInt(item1.goodcomment)):
            this.data.goodlist.sort((item1,item2)=>parseInt(item1.goodcomment)-parseInt(item2.goodcomment))
        })
    }
})