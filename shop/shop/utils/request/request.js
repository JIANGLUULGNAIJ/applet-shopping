// 封装request方法
function request(params,isheader=false){
    return new Promise((resolve,reject)=>{
        wx.showLoading({
          title: '正在加载中...',
        })
        wx.request({
          ...params,
          url:'http://localhost:3000'+params.url,
          success:(res)=>{
            //  true返回一个对象，包含数据和数据的长度
              if(isheader){
                resolve({
                    list:res.data,
                    total:res.header["X-Total-Count"]
                })
                // false默认返回数据
              }else{
                resolve(res.data)
              }
              
          },
          fail:(err)=>{
            reject(err)
          },
          complete:()=>{
            wx.hideLoading({
                success:(res)=>{}
            })
          }
        })
    })
}

export default request