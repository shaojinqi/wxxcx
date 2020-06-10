//index.js
//获取应用实例
import {request} from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

const app = getApp()

Page({
  data: {
    // pagePath:{},
    swiperList:[],
    navList:[],
    floorList:[],
    
  },

  //获取轮播图
  async getSwiperData(){
      let result = await request({url:'/home/swiperdata'})
     this.setData({
        swiperList:result
      })
  },

 async getNavData(){
   let res = await request({url:'/home/catitems'})
    this.setData({
      navList:res
    })
  },

  // 楼层
async getFloorData(){
 let res = await request({url:'/home/floordata'})
  this.setData({
    floorList:res
  })
},












  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
   this.getSwiperData()
   this.getNavData() //调用导航
   this.getFloorData()  
  },
  // getUserInfo: function(e) {
   
  
  // }
})
