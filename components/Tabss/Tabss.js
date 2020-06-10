// components/Tabss/Tabss.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabss:{
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
      this.triggerEvent('faEvents',flag)   
    }
  }
})
