import request from "../../utils/request/request"
import CheckAuth from "../../utils/auth/auth"
// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:null,
        current:0,
        commentList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 设置顶部标签动态变化为title
        wx.setNavigationBarTitle({
          title: `${options.title}`,
        })
        // 将id传入自定义方法，发送请求
        this.getDetailInfo(options.id),
        // 页面加载，就会获取评论数据
        this.getCommentsInfo()
    },

    // 根据传入的id获取对应的数据
    getDetailInfo(id){
        request({
            url:`/goods/${id}`,
        }).then(res=>{
            this.setData({
                info:res
            })
        })
    },

    // 获取评论数据
    getCommentsInfo(){
        request({
            url:"/comments"
        }).then(res=>{
            this.setData({
                commentList:res
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

    // 全屏预览图片，可以进行保存图片、发送给朋友
    handleTap(evt){
        // 预览图片
        wx.previewImage({
            // 当前显示图片的 http 链接
            current: evt.currentTarget.dataset.current, 
            // 需要预览的图片 http 链接列表
            // 这个图片地址需要拼接http://localhost:3000
            urls: this.data.info.slides.map(item=>`http://localhost:3000${item}`) 
          })
    },

    // 点击高亮
    handleActive(evt){
        this.setData({
            current:evt.currentTarget.dataset.index
        })
    },

    // 加入购物车
    handleAdd(){
        CheckAuth(()=>{
            // 在carts表中查询当前用户的购物车信息，如果已有该订单，直接数量加一，没有则直接创建
            let nickname = wx.getStorageSync('token')["nickName"]
            let tel = wx.getStorageSync('tel')
            var goodId = this.data.info.id
            
            // 查询该用户购物车是否含有该商品
            request({
                url:"/carts",
                data:{
                    tel,
                    goodId,
                    nickname
                }
            }).then(res =>{

                // 购物车没有此商品，新增
                if(res.length===0){
                    request({
                        url:"/carts",
                        method:"post",
                        data:{
                            "username": nickname,
                            "tel": tel,
                            "goodId": goodId,
                            "number": 1,
                            "checked": false,
                        }
                    })
                }else{
                    // 购物车有这个商品，数量加一
                    request({
                        url:`/carts/${res[0].id}`,
                        method:"put",
                        data:{
                           ...res[0],
                           number:res[0].number+1
                        }
                    })
                }
            }).then(res=>{
                // 加入购物车成功
                wx.showToast({
                  title: '加入购物车成功',
                })
            })


        })
    },

    // 跳转购物车
    handleChange(){
        wx.switchTab({
          url: '/pages/shopcar/shopcar',
        })
    }
})