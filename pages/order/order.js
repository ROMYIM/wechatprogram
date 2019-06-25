// pages/order/order.js
import { formatTime } from '../../utils/util.js'

const app = getApp();
const defaultPicture = '/resources/mineorder_defaultdiagram.png'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        canISubmit: 0,
        calendarOpen: false,
        dateTarget: 'leave',
        defaultPicture: defaultPicture,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.checkOutDialog = this.selectComponent('#checkOutDialog');
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
                        if (options.canISubmit !== '0') {
                            this.data.canISubmit = options.canISubmit;
                        }
                        const picture = app.globalData.baseImageUrl + order.URLOBJ.filePath;
                        order.ROOMPICTURE = picture;
                        order.STARTTIME = formatTime(startDate).fullDate;
                        order.ENDTIME = formatTime(endDate).fullDate;
                        switch (order.ORDERSTATE) {
                            case 1: order.ORDERSTATE = '已预订';
                                order.INTRODUCTION = '一切已准备到位，等待你的入住'
                                order.PICTURE = "/resources/order/mine_order_stayin.png"
                                break;
                            case 2: order.ORDERSTATE = '已入住'
                                order.INTRODUCTION = '请尽情享受你的度假之旅'
                                order.PICTURE = "/resources/order/mine_order_refunding.png"
                                break;
                            case 3: order.ORDERSTATE = '已退房'
                                order.INTRODUCTION = '欢迎下次光临'
                                order.PICTURE = "/resources/order/mine_order_donotpayment.png"
                                break;
                            case 4: order.ORDERSTATE = '已过期'
                                order.INTRODUCTION = '欢迎下次光临'
                                order.PICTURE = '/resources/order/5c75fa78ea3b4a65692eafa1_origin.png'
                                break;
                        }
                        this.data.order = order;
                        this.setData({
                            phone: wx.getStorageSync('phone'),
                            // nickName: app.globalData.userInfo.nickName,
                            order: order,
                            canISubmit: this.data.canISubmit
                        })
                        console.log(order.ORDERSTATE)
                    } else {
                        wx.showToast({
                            title: '订单查询错误',
                            icon: 'none'
                        })
                    }
                },
                res => {
                    wx.hideLoading();
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

    imageError: function (event) {
		if (event.type == 'error') {
			this.setData({
                'order.PICTURE': defaultPicture
            })
		}
	},

    showDialog: function (event) {
        if (this.checkOutDialog && this.data.order) {
            this.checkOutDialog.showDialog(this.data.order)
        }
    },

    renewalRoom: function (event) {
		const order = this.data.order
		if (order) {
			wx.navigateTo({
				url: '/pages/renewal/renewal?orderID=' + order.ORDERNUM
			})
		}
	},

    bookRoom: function (event) {
		wx.navigateTo({
			url: '/pages/book/book',
		})
	}
})