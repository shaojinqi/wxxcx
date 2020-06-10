// pages/search/index.js
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';

/**
 * 1  输入框输入内容的时候进行商品搜索 
 * 2  校验输入框的输入的值   
 * 3  判断输入框的值有没有值 如果没有值  那么隐藏取消按钮  并且下面搜索的内容也清空  
 * 4  点击取消按钮可以清空输入框的内容以及下面搜索后的内容 
 * 
 * 
 * 节流与防抖
 * 节流   一般是指我们循环  减少循环的次数 最大提高性能  
 * 防抖   一般减少请求    主要针对定时器 
 * 
 */
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    searchList:[],
    isShow:true,     //初始按钮 hidden状态
    inputVal:'',    //初始input value值
  },
  countTimeId:-1,   //初始定时器标识符
  async getSearchData(query){
    // let query = this.data.query
    let res = await request({url:'/goods/qsearch',data:{query}})
    console.log(res);
    this.setData({
          searchList:res,
           isShow:false
    })
  },
handlerInput(e){
  console.log(e.detail.value);
  let query = e.detail.value
  // this.setData({
  //   query
  // })
  // this.getSearchData(query)
  if(!query.trim()){
          this.setData({
            isShow:true,
            searchList:[]
          })
          return
  }
  clearTimeout(this.countTimeId)
  this.countTimeId=setTimeout(() => {
    this.getSearchData(query)
  }, 10);




},
handlerTap() {
  this.setData({
    searchList:[],
    inputVal:'',
    isShow:true
  })
    
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // this.getSearchData()
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