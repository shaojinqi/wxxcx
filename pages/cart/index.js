// pages/cart/index.js


/**
 * 一  添加用户收获地址 
 *   1 绑定方法 
 *   2 调用小程序内置api 添加收获地址  wx.chooseAddress()  有问题 
 *   3   弹出用户授权添加收地地址弹框    
 *      scope 属性 如果为true 表示授权  如果为undefined 表示重来都没有授权过
 *      如果为false 表示取消 
 *         authSetting scope.address
 *    3.1 假如 用户点击 确定(scope 为true) 那么可以直接调用   wx.chooseAddress
 *    3.2  假如用户之前重来都没有授权过(scope 为undefined) 那么也可以直接调用  wx.chooseAddress
 *    3.3  假如用户点击取消（scope 为false） 需要引导用户打开设置页面 然后再去打开授权
 
 * 
 */
import {
  showModal, showToast,
} from '../../utils/async.js'
import {request} from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
import {getSetting,openSetting,chooseAddress} from '../../request/cart.js'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    address:{},     //定义初始收货地址
    cart:[],         //定义初始购物车商品数据
    allChecked:false,  //
    totalPirce:0,  //初始价格
    totalNum:0,     //
    yincang:false  
  },

  //单选按钮
  radio(e){
    // console.log(e.currentTarget.dataset);
    let id = e.currentTarget.dataset.id    //添加了自定义data-id
    let cart = wx.getStorageSync('cart')  //本地存储的cart
    let allChecked = false
      this.data.cart.forEach((v,i)=>{
        if(id==v.cat_id){
          v.isCheck = !v.isCheck
        console.log(this.data.cart);
        this.data.cart.length>0?allChecked = this.data.cart.every(v=>v.isCheck):false
         this.setData({
          cart:this.data.cart,  //遍历的this.data.cart，不是本地存储的，是赋值后来的，要这样给到全局
          allChecked
       })
        }
      })
     


      let totalPirce = 0
      let totalNum = 0
      this.data.cart.forEach(v => {
        if(v.isCheck){     //单选被选上了的
          totalPirce+=v.goods_price*v.num
          totalNum += v.num
        }
      });
   this.setData({
     totalPirce,
     totalNum
   })
   wx.setStorageSync('cart', this.data.cart);//要将改变的数据，再存到本地做个更新，不然的话出去了回来就变了

  },

  //全选框
  allRadio(){
    let cart = wx.getStorageSync('cart')    //本地存储的cart
      this.allChecked=!this.allChecked
      if(this.allChecked){
        cart.forEach(v=>v.isCheck=this.allChecked)
      }else{
        cart.forEach(v=>v.isCheck=this.allChecked)
        // console.log(this.allChecked);
      }
       this.setData({
         cart, //遍历的cart，是本地存储的，相当于把本地的（this.cart=cart)给到全局
         allChecked: this.allChecked
       })

       let totalPirce = 0
       let totalNum = 0
       this.data.cart.forEach(v => {
         if(v.isCheck){
           totalPirce+=v.goods_price*v.num
           totalNum += v.num
         }
       });
    this.setData({
      totalPirce,
      totalNum
    })
       wx.setStorageSync('cart', cart);
         

       


  },

  // 加加加
  addCount(e){
    let id = e.currentTarget.dataset.id
    // console.log(id);
    let totalPirce = 0
    let totalNum = 0
    this.data.cart.forEach((v,i)=> {
      if(id==v.goods_id){
        v.num++
      }
         if(v.isCheck){
           totalNum += v.num
        totalPirce+=v.goods_price*v.num
      }
    });
 this.setData({
   cart:this.data.cart,
   totalPirce,
   totalNum
 })
    wx.setStorageSync('cart', this.data.cart);
  },
  //减减减
  minusCount(e){
    let id = e.currentTarget.dataset.id
    // console.log(id);
    let totalPirce = 0
    let totalNum = 0
    this.data.cart.forEach((v,i)=> {
      if(id==v.goods_id){
        v.num--
        if(v.num<1){
          // showModal({
          //   content: '是否要删除 确定不在考虑考虑'
          // })
          // this.data.cart.splice(i,1)
          v.num = 1
        }
      }
         if(v.isCheck){
           totalNum += v.num
        totalPirce+=v.goods_price*v.num
      }
    });
 this.setData({
   cart:this.data.cart,
   totalPirce,
   totalNum
 })
    wx.setStorageSync('cart', this.data.cart);
  },

//清空
  removeAll(){
    let totalPirce = 0
    let totalNum = 0
    let allChecked = false

   
    this.data.yincang = true
      this.setData({
        cart:[],
        totalPirce,
        totalNum,
        allChecked,
        yincang:this.data.yincang 
      })
      wx.setStorageSync('cart', '');
  },
   async handlePay(){
      let address = this.data.address
      let totalNum = this.data.totalNum
      if(!address.userName){
        showToast({title:"请填写收获地址"})
        return 
      }
      if(totalNum===0){
        showToast({title:"请添加商品"})
        return 
      }
      wx.navigateTo({
        url: '/pages/pay/index', //跳转到支付页面
      })
  },
  // 六  结算功能函数 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
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
    // let address = wx.getStorageSync('address')
    // this.setData({
    //   address
    // })
    let cart = wx.getStorageSync('cart')||[]
    console.log(cart);
    this.setData({
      // address,
      cart
    })

    //判断全选状态
    let allChecked = false
    cart.length>0?allChecked = cart.every(v=>v.isCheck):false
   this.setData({
     allChecked
   })

   //全部清空的显示与隐藏
   if(this.data.cart.length){
    this.data.yincang = false
  }else{
    this.data.yincang = true
  }

   //计算商品的总价格
   let totalPirce = 0
   let totalNum = 0
   cart.forEach(v => {
     if(v.isCheck){
       totalPirce+=v.goods_price*v.num
       totalNum += v.num
     }
   });
this.setData({
  yincang:this.data.yincang ,
  totalPirce,
  totalNum
})
  },

  
   async handlerAddress(){
try{
  let res = await getSetting()
//通过getSetting方法访问 authSetting
  let scope = res.authSetting['scope.address']
//赋值'scope.address' 并给到scope
  if(scope==false){       //判断是否给了权限
    await openSetting()       //没给就让他去设置权限
 }
 let address = await  chooseAddress()  //然后就可以调用内置api收获地址弹框
 address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
 
 this.setData({
  address
})  
 wx.getStorageSync('address',address)
}catch(error){
  console.log(error);
  
}
   
   /*  wx.getSetting({
      success: (result) => {
        console.log(result);
        let scope = result.authSetting['scope.address']
          if(scope===true||scope===undefined){
             wx.chooseAddress({
          success: (res) => {
            console.log(res);
            },
           });
          }else{
            wx.openSetting({
              success: (res2) => {
                console.log(res2);
              },
            });
            wx.chooseAddress({
              success: (res3) => {
                console.log(res3);
              },
            });
          }
      },
    }); */
   




  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})