//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperPictures: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getSwiperPictures()
  },
  getSwiperPictures: function() {
    var _this = this;
    wx.request({
      url: app.globalData.baseUrl + 'SmartHotel/SwiperPictures',
      method: 'GET',
      success: function (res) {
        var imgData = res.data;
        for(let i = 0; i < imgData.length; i++){
          imgData[i] = app.globalData.baseUrl + imgData[i]
        }
        console.log(imgData)
        _this.setData({
          swiperPictures: imgData
        })
      }, 
      fail: function (res) {
        console.log(res)
      }
    })
  },

  changeSwiperPicture: function(e) {
    var _this = this;
    console.log(e);
    wx.request({
      url: app.globalData.baseUrl + 'SmartHotel/SwiperPictures/' + e.currentTarget.id,
      method: 'GET',
      success: function(res) {
        var imgData = res.data;
        for (let i = 0; i < imgData.length; i++) {
          imgData[i] = app.globalData.baseUrl + imgData[i]
        }
        _this.setData({
          swiperPictures: imgData
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getAccessToken: function(e) {
    wx.request({
      url: 'http://localhost:5000/SmartHotel/Token',
      data: {
        appID: app.globalData.appID,
        appSecret: app.globalData.secret
      },
      dataType: 'json',
      method: 'POST',
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console(res);
      }
    })
  }
})
