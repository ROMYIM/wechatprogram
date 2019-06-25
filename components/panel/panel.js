// components/panel/panel.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'xxx设备'
    },
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
    showPanel: function() {
      this.setData({
        hidden: false
      })
    },
    hiddePanel: function() {
      this.setData({
        hidden: true
      })
    }
  }
})
