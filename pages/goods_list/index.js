// pages/goods_list/index.js
import {request} from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';



/**
 * 用户实现上拉加载/ 下拉刷新 
 * 1 配置上拉加载 
 * 2 监听（找到）上拉加载事件 
 * 3  判断当前页面是第几页 
 *   3.1 如果当前页面是最后一页或者说大于等于最后一页 给用户提示是最后一页没有更多数据了
 *    如何求数据的总页数？
 *     求出总页面数    Math.ceil (总数据/每一页加载的数据量)
 *       total  
 *      let totalPage=Math.ceil(total/pagesize )  ==3    
 *   3.2 如果是小于最后一页 那么需要加载下一页数据 并且 还需要把之前页面的数据跟当前页面的数据进行组合

 * 下拉刷新
 * 
 * 1 配置下拉刷新 
 * 2 找到监听下拉刷新的函数/方法 
 * 3  清空 之前的所有的数据  goodsList变成空数组  pagenum 重新置为1 
 * 3  重新加载最新的数据 
 */



Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
    value:'综合',
    isActive:true,
    },
    {
      id:1,
    value:'销量',
    isActive:false,
    },
    {
      id:2,
    value:'价格',
    isActive:false,
    },
  ],
    shoplist:[],
  },
  params:{
    cid:'',
    url:'/goods/search',
    query:'',
    pagesize:10,      
    pagenum:1        //页码
  },
  totalPage:0,     //初始总也面数
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.params.query = options.query ||""
    this.params.pagenum = options.pagenum ||""
    // this.params.pagesize = options.pagesize||10
    this.params.cid = options.cid
  this.getGoodsListData()
  },
changeSelected(e){
    console.log(e.detail); //id
    let myid = e.detail
    let mytabs = this.data.tabs   //自己定义值给直接取
    mytabs.forEach((v,i)=>{
      v.isActive=false   //干掉所有人
      if(v.id==myid){     //自己定义值中的当前项id和头部方法中的e.detail判断
        v.isActive=true    //留下自己
      }
    })
    this.setData({
      tabs:mytabs     //设置值
    })
     
},

//定义获取数据的方法
async getGoodsListData(){
    // let params = {
    //   url:'',
    //   cid:""
    // };
    let myparams =this.params     //传递参数对象   data为固定
   

  let res = await  request({url:myparams.url,data:{cid:myparams.cid,query:myparams.query,pagesize:myparams.pagesize,pagenum:myparams.pagenum}})
     console.log(res)
    //  console.log(myparams.pagesize);
     this.totalPage = Math.ceil(res.total/myparams.pagesize)
     //向上取整，总数据项除单页数据项  为3
    //  console.log(this.totalPage);
     this.setData({   
       shoplist:res    //...this.data.shoplist之前的数据   ...res.goods //当前获取到的数据
       //shoplist:[...this.data.shoplist,...res.goods]
     })
     wx.stopPullDownRefresh()  //数据回来之后关闭下拉刷新样式
},


onReachBottom(){
    if(this.params.pagenum-this.totalPage>=0){
      wx.showToast({
        title:'最后一页了'
      })
    }else{
      this.params.pagenum++  //去请求下一页数据
      wx.showToast({
        title:'第'+this.params.pagenum+'页'
      })
      this.getGoodsListData()    //重新获取数据
    }
},
onPullDownRefresh(){
      // wx.showToast({
      //   title:'sx',
      // })
      // setTimeout(() => {
      //   wx.hideLoading();
      // }, 1000);
this.params.pagenum=1;    //刷新页面后页面为第一页
this.setData({
  shoplist:[]
})
this.getGoodsListData()   //重新获取数据



},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})