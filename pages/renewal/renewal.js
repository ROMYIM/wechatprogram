// pages/renewal/renewal.js
import { formatTime } from '../../utils/util.js'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        calendarOpen: false,
        dateTarget: 'leave',
        days: 1,
        endTime: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.orderID) {
            app.request(
                'appHotel/getHotelOrderDetail.do',
                'POST',
                true,
                () => {
                    let hotel = wx.getStorageSync('hotel');
                    let orderID = options.orderID.toString() + hotel.toString();
                    let keyMap = app.createSecretKey(hotel);
                    let data = {
                        FKEY: keyMap.key,
                        TIMESTAMP: keyMap.timeStamp,
                        HOTELID: hotel,
                        ORDERNUM: orderID
                    }
                    return data;
                },
                res => {
                    wx.hideLoading();
                    if (res.data.code == 101) {
                        let order = res.data.pageData;
                        let startDate = new Date(order.STARTTIME.replace(/-/g, '/'));
                        let endDate = new Date(order.ENDTIME.replace(/-/g, '/'));
                        let days = (endDate - startDate) / (24 * 60 * 60 * 1000);
                        order.DAYS = parseInt(days);
                        if (order.ORDERNUM) {
                            order.ORDERNUM = order.ORDERNUM.substring(0, 13);
                        }
                        let date = new Date(order.ENDTIME.replace(/-/g, '/'));
                        date.setDate(date.getDate() + 1)
                        this.setData({
                            order: order,
                            endTime: formatTime(date).fullDate
                        })
                    } else {
                        wx.showToast({
                            title: '信息查询错误',
                            icon: 'none'
                        })
                    }
                }
            )
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

    openCalendar: function (event) {
        let date = new Date(this.data.order.ENDTIME.replace(/-/g, '/'));
        if (event.currentTarget.dataset.target == "leave") {
            date.setDate(date.getDate() + 1)
        } 
        this.setData({
            dateTarget: event.currentTarget.dataset.target,
            calendarOpen: true,
            date: formatTime(date).fullDate.replace(/-/g, '/')
        })
        const calendar = this.selectComponent('#calendar');
        calendar._openEvent(this.data.date, this.data.endTime);
    },

    getDate: function(event) {
        let date = event.detail.date;
        let enterDate = new Date(this.data.order.ENDTIME.replace(/-/g, '/'))
        date = date.year + "/" + date.month + "/" +  date.date;
        date = new Date(date + " 23:59:59");
        let days = (date - enterDate) / (24 * 60 * 60 * 1000);
        days = parseInt(days);
        this.setData({
            endTime: formatTime(date).fullDate,
            days: days,
            calendarOpen: false
        })
    },

    renewalFamily: function (event) {
        const order = this.data.order
        app.request(
            'appHotel/continueFamily.do?',
            'POST',
            true,
            () => {
                const hotel = wx.getStorageSync("hotel");
                const keyMap = app.createSecretKey(hotel);
                const data = {
                    ORDERNUM: order.ORDERNUM.toString() + hotel,
                    ROOMPRICE: order.DPRICE * this.data.days,
                    ENDTIME: this.data.endTime,
                    HOTELID: hotel,
                    TIMESTAMP: keyMap.timeStamp,
                    FKEY: keyMap.key
                }
                return data;
            },
            res => {
                wx.hideLoading();
                const code = res.data.code;
                let message = '';
                if (res.data.code == 101) {
                    message = '已成功续房，请到前台缴纳续房金额'
                } else {
                    message = '操作失败，前联系工作人员'
                }
                wx.redirectTo({
                    url: '/pages/result/result?code=' + code + '&message=' + message,
                })
            },
            res => {
                wx.hideLoading();
                console.log(res.data)
            }
        )
    }
})