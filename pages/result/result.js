// pages/result/result.js
const app = getApp();
const successIcon = '/resources/result/success_icon.png';
const failedIcon = '/resources/result/failed_icon.png'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: successIcon,
    message: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.code == 101) {
      this.data.icon = successIcon;
    } else {
      this.data.icon = failedIcon;
    }
    this.setData({
      icon: this.data.icon,
      message: options.message
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

  },

  buttonClick: function (event) {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
})
