// pages/order/create.js
import { formatTime } from '../../utils/util.js'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        canISubmit: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.detail) {
            let order = JSON.parse(options.detail);
            order.STARTDATE = order.STARTTIME.replace(/-/g, '/');
            let startDate = new Date(order.STARTDATE);
            order.ENDDATE = order.ENDTIME.replace(/-/g, '/');
            let endDate = new Date(order.ENDDATE);
            let days = (endDate - startDate) / (24 * 60 * 60 * 1000);
            order.DAYS = parseInt(days);
            if (order.ORDERNUM) {
                order.ORDERNUM = order.ORDERNUM.substring(0, 13);
            }
            if (options.canISubmit !== '0') {
                this.data.canISubmit = options.canISubmit
            }
            order.STARTTIME = formatTime(startDate).fullDate;
            order.ENDTIME = formatTime(endDate).fullDate;
            this.data.order = order;
            this.setData({
                order: order,
                canISubmit: this.data.canISubmit
            })
        }
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

    createOrder: function (event) {
        let order = this.data.order;
        if (!order || order == undefined) {
            wx.navigateBack({
                delta: 1,
                success: res => {
                    wx.showToast({
                        title: '程序错误,请重新选房',
                        icon: 'none',
                        duration: 1500
                    })
                }
            })
            try {
                wx.removeStorageSync('order');
            } catch (e) {
                console.log(e)
            }
        } else {
            var url = 'appHotel/addWXHotelOrder.do';
            app.request(
                url,
                'POST',
                true,
                () => {
                    order.HOTELID = wx.getStorageSync('hotel');
                    var keyMap = app.createSecretKey(order.HOTELID);
                    order.FKEY = keyMap.key;
                    order.TIMESTAMP = keyMap.timeStamp;
                    return order;
                },
                res => {
                    wx.hideLoading();
                    let code = res.data.code;
                    let message = '';
                    if (res.data.code == 101) {
                        message = '已成功创建订单，请到前台缴纳订金';
                        wx.removeStorageSync('order');
                    } else {
                        message = '订单创建失败，请联系前台工作人员';
                    }
                    wx.redirectTo({
                        url: '/pages/result/result?code=' + code + '&message=' + message,
                    })
                },
                res => {
                    console.log(res.data)
                }
            )
        }
    },
})