// components/service/service.js
const util = require('../../utils/util.js')
const app = getApp();
const panelAnimation = wx.createAnimation({
  duration: 500,
  timingFunction: 'liner',
  delay: 500,
  transformOrigin: '50% 50% 0',
})
const iconAnimation = wx.createAnimation({
  duration: 500,
  timingFunction: 'liner',
  delay: 500,
  transformOrigin: '50% 50% 0',
});
const textAnimation = wx.createAnimation({
  duration: 500,
  timingFunction: 'liner',
  delay: 500,
  transformOrigin: '50% 50% 0',
});

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
    hidden: true,
    time: '',
    panelAnimationData: [null, null, null],
    iconAnimationData: [null, null, null],
    textAnimationData: [null, null, null],
    openState: [false, false, false]
  },

  lifetimes: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setClock: function (event) {
      console.log("set clock")
      this.setData({
        time: event.detail.value
      })
    },

    serviceAnimation: function (event) {
      var index = event.currentTarget.dataset.id;
      if (!this.data.openState[index]) {
        this.restore();
        var animationDataKey = 'iconAnimationData[' + index + ']'
        iconAnimation.translate(-40, 0).step({});
        this.setData({
          [animationDataKey]: iconAnimation.export()
        });
        textAnimation.translate(20, -30).step({});
        animationDataKey = 'textAnimationData[' + index + ']'
        this.setData({
          [animationDataKey]: textAnimation.export()
        });
        var openStateKey = 'openState[' + index + ']';
        this.setData({
          [openStateKey]: true
        })
      } else {
        this.restore();
      }
    },

    restore: function () {
      let iconAnimationData = this.data.iconAnimationData;
      let textAnimationData = this.data.textAnimationData;
      for (let i = 0; i < this.data.iconAnimationData.length; i++) {
        iconAnimationData[i] = iconAnimation.translate(0, 0).step({ duration: 500 }).export();
        textAnimationData[i] = textAnimation.translate(0, 0).step({ duration: 500 }).export();
        var openStateKey = 'openState[' + i + ']';
        this.setData({
          [openStateKey]: false
        })
      }
      this.setData({
        iconAnimationData: iconAnimationData,
        textAnimationData: textAnimationData
      })
    },

    showPage: function () {
      this.setData({
        hidden: false
      })
    },

    hidePage: function () {
      this.setData({
        hidden: true
      })
    },

    serviceButtonClick: function (event) {
      app.unOpenTips();
    }
  }
})
