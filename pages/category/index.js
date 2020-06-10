// pages/category/index.js
import {request} from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

// const order = ['demo1', 'demo2', 'demo3']
Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      // path: 'page/component/pages/scroll-view/scroll-view'
     }
    },
  data: {
    currentIndex:0,  //初始索引
    toView: 'green',
    leftMenuList:[],
    rightMenuList:[],     
    scrollTop:0   //滚动初始位置
  },
  cates:[],

  async getflRight(){
   let res = await request({url:'/categories'})
   console.log(res);
      this.cates = res
      wx.setStorageSync('cates',{item:Date.now(),data:this.cates})
      let leftMenuList = this.cates.map(v=>v.cat_name)
      let rightMenuList = this.cates[0].children   //初始页面数据为index0 的数据项 想办法将项变成动态的
      this.setData({                              //在项上面绑定事件，事件上带 data-index="{{index}}" 就能在e.中去找这个index项
        leftMenuList,
        rightMenuList
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync('cates')
    if(!cates){
      this.getflRight()
    }else{
      if(Date.now()-cates.time>1000*60*5){
        this.getflRight()
      }else{
         this.cates = cates.data
        let leftMenuList = this.cates.map(v=>v.cat_name)
        let rightMenuList =this.cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
   
  handlerChangeItem(e){
  //  console.log('aaa');
  //  console.log(e);
    // let index = e.currentTarget.dataset.index
    let {index}=e.currentTarget.dataset    //在项上面定义一个事件和index 找到点击项中的index
    console.log(index);
    let rightMenuList =this.cates[index].children     //让右边的数据随索引值变化
//一个大项数据中有小项（多个数组数据）我们先只遍历一个（默认第一）项，然后根据点击
//的index（自定义data-index）变化，将其拿到，作为下标。

      this.setData({
        scrollTop:0,    
        rightMenuList,    //重新构造右边的数据
        currentIndex:index  //重新构造高亮索引
      })
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