// pages/shopcar/shopcar.js
import CheckAuth from "../../utils/auth/auth"
import request from "../../utils/request/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shoplist:[],
        slideButtons:[{
            type:'warn',
            text:'删除'
        }]
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
        CheckAuth(()=>{
            // 从token中获取用户名和电话号码
            let {nickName} = wx.getStorageSync('token')
            let tel = wx.getStorageSync('tel')
            // 连表查询
            request({
                url:`/carts?_expand=good&username=${nickName}&tel=${tel}`
            }).then(res =>{
                this.setData({
                    shoplist:res
                })
            })
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

    // 勾选商品
    handletap(evt){
        // 获取商品
        var item = evt.currentTarget.dataset.item
        // 商品属性取反(这个只对页面里的属性生效，还需要同步数据库，不然一刷新又回去了）
        item.checked = !item.checked
        // 这里写一个方法同步数据库的数据
        this.handleUpdate(item)
    },

    // 更新
    handleUpdate(item){
        // 本地更新
        this.setData({
            // 遍历购物车，替换发生改变的那个商品
            shoplist:this.data.shoplist.map(data =>{
                if(data.id === item.id){
                    return item
                }
                return data
            })
        }),

        // 远端更新
        request({
            url:`/carts/${item.id}`,
            method:"put",
            data:{
                "username": item.username,
                "tel": item.tel,
                "goodId": item.goodId,
                "number": item.number,
                "checked": item.checked,
            }
        })
    },


    // 购物车商品减一
    handleMinus(evt){
        var item = evt.currentTarget.dataset.item
        if(item.number===0){
            return
        }
        item.number--
        this.handleUpdate(item)
    },

    // 购物车商品加一
    handleAdd(evt){
        var item = evt.currentTarget.dataset.item
        if(item.number===5){
            return
        }
        item.number++
        this.handleUpdate(item)
    },

    // 删除购物车中选中的商品
    slideButtonTap(evt){
        this.setData({
            // 通过过滤的方式，不等于该id的留下，等于选中id的过滤掉
            shoplist:this.data.shoplist.filter(item=>item.id!=evt.currentTarget.dataset.id)
        })

        // 远端同步
        request({
            url:`/carts/${evt.currentTarget.dataset.id}`,
            method:"delete"
        })
    },

    // 购物车全选
    handleAllChecked(evt){
        if(evt.detail.value.length===0){
            // 全不选
            this.setData({
                shoplist:this.data.shoplist.map(item=>({
                    ...item,    
                    checked:false
                }))
            })
        }else{
            // 全选
            this.setData({
                shoplist:this.data.shoplist.map(item=>({
                    ...item,
                    checked:true
                }))
            })
        }

        // 按理说还要同步后端，但是jsonserver没有一个可以全部修改局部字段的接口，所以这个就不同步了
    }

})