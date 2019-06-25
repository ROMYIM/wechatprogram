// components/page/page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPage: function() {
      this.setData({
        hidden: false
      })
    },

    hidePage: function() {
      this.setData({
        hidden: true
      })
    }
  }
})
