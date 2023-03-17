import request from "../../utils/request/request";

// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            // 修正this的指向问题
            search:this.search.bind(this)
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

    // 聚合接口的返回结果
    search:function(value){
        // 获取多个primise对象就可以有多个res
        return Promise.all([
            request({
                url:`/goods?title_like=${value}`
            }),
            request({
                url:`/categories?title_like=${value}`
            })
        ]).then(res=>{
            return [...res[0].map(item=>({
                ...item,
                text:item.title,
                type:1
            })),...res[1].map(item=>({
                ...item,
                text:item.title,
                type:2
            }))];
        })
        
    },

    // 点击搜索出来的列表的回调函数
    selectresult:function(e){
        if(e.detail.item.type===1){
            // 商品详情，点击进入详情界面
            wx.navigateTo({
              url: `/pages/detail/detail?id=${e.detail.item.id}&title=${e.detail.item.title}`,
            })
        }else{
            wx.navigateTo({
                url: `/pages/searchlist/searchlist?id=${e.detail.item.id}&title=${e.detail.item.title}`,
            })
        }
    }
})