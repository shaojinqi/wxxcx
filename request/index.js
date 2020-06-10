export const request=(params)=>{
    wx.showLoading({
        title: '正在加载',
      });
    let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            // url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
            fail:(error)=>{
                reject(err)
            },
            success:(res)=>{
              
                resolve(res.data.message)
            },
            complete:()=>{       //不管成功还是失败都执行
                wx.hideLoading();
            }
          })
        
        

    })
}