// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    itemChangeSecletced(e){
      console.log(e.currentTarget.dataset);
      let flag =  e.currentTarget.dataset.flag
      this.triggerEvent('faEvent',flag)   
      //在对组件进行封装时 在当前页面想要获取组件中的某一状态，
      //需要用到this.triggerEvent(' ',{},{}),第一个参数是自定义事件名称，
      //这个名称是在页面调用组件时bind的名称，第二个对象就可以将想要的属性拿到
    }
  }
})
 