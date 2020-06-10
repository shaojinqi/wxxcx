// pages/goods_detail/index.js
import {request} from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
 
Page({

  // 渲染商品详情数据
// 点击图⽚，调出图⽚画廊，进⾏预览
// 点击收藏
// 联系客服
// 分享功能


// 加⼊购物⻋   重复商品加1 没有就添加进
//把购物里面的数据一起带到购物车页面，进行数据渲染

  /**
   * 页面的初始数据
   */
  data: {
    detailData:[], 
    goods_id:'',
    isCollect:false,
   },
   goodsDetial:{},
async getGoodsDetailData(){
let res = await  request({url:'/goods/detail',data:{goods_id:this.goods_id}})
   console.log(res)
   this.goodsDetial=res
    this.setData({ 
      detailData:res
    })

    //进来不点击的判断图标状态
    let collect = wx.getStorageSync('collect')||[]
    let isCollect = false
   let index =  collect.findIndex(v=>v.goods_id==this.goodsDetial.goods_id)
    //  console.log(index);
    if(index===-1){  //表示之前没有收藏该商品 
      isCollect = false
      this.goodsDetial.isCollect = isCollect
        //没有就将goodsDetial数据项里的isCollect变为false,然后push进去
      collect.push(this.goodsDetial)  
    }else{
      isCollect = collect[index].isCollect
      //有的话，下面的方法已经把isCollect取反了为true
      //这里给到外面定义的isCollect
    }
    this.setData({
      isCollect:isCollect
    })
  wx.setStorageSync('collect',collect)//更新


},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.goods_id);
        this.goods_id = options.goods_id
        //把当前项goodsid给到我们定义的this.data.goods_id。作为请求参数
        // console.log(this.goods_id);
        this.getGoodsDetailData()
  },


  //实现图片全屏预览功能 
  previewImg(e){
    //获取是当前图片
  let current = e.currentTarget.dataset.img
    //遍历每个数据项中的url大图
let urls = this.goodsDetial.pics.map(v=>v.pics_big_url)
console.log(urls);
// console.log(current) 
    wx.previewImage({
      current: current,  // 当前显示图片的http链接
      urls:urls   //需要预览的图片http链接列表
    });
       
},
  
//数据添加到购物车
handleCartAdd(){
    wx.showToast({
      title: '加入购物车',
      icon:"success",
      mask:true
    })
    //加入购物车之前需要判断该商品在不在购物车里面,有就讲本地缓存给到cart没有就为空
    let cart = wx.getStorageSync('cart')||[]
    console.log(cart); 
    let index = cart.findIndex(v=>v.goods_id===this.goodsDetial.goods_id)
    console.log(index);
    if(index===-1){     //如果没有
      //标记当前商品第一次添加
      this.goodsDetial.num = 1;
      this.goodsDetial.isCheck = true
      //2.把该商品加入购物车
      cart.push(this.goodsDetial)
    }else{
      cart[index].num++
    }
      wx.setStorageSync('cart',cart)
      //把添加后的商品重新放人缓存里面（更新）
},

//商品收藏

collectGoods(e){
    let collect = wx.getStorageSync('collect')
    console.log(collect);
    // console.log(e);
    let goods_id = e.currentTarget.dataset.id
    //goods_id 在view里面自定义的data-id 再这里用e.xxx找到
    // console.log(goods_id);
      let index = collect.findIndex(v=>v.goods_id==goods_id)
     
      let isCollect = collect[index].isCollect
      console.log(isCollect);
      
      //将数据里的isCollect（最开始是false）给到定义的变量isCollect
      this.setData({
        isCollect:!isCollect
       //这里取反的是上面最外面定义的isCollect，改变收藏图标
      })
      let isShow = this.data.isCollect
      if(!isShow){
        wx.showToast({
          title:"取消收藏成功"
        })
      }else{
        wx.showToast({
          title:"加入收藏成功"
        })
      }
      collect[index].isCollect = !collect[index].isCollect
       //将数据里的isCollect取反
      wx.setStorageSync('collect',collect) //更新数据

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})