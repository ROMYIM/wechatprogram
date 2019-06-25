// pages/order/orderList.js
const app = getApp();
const defaultPicture = '/resources/mineorder_defaultdiagram.png'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		canISubmit: 0,
		defaultPicture: defaultPicture
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.checkOutDialog = this.selectComponent('#checkOutDialog');
		this.getOrderList(options.canISubmit);
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

	getOrderDetail: function (event) {
		let orderID = this.data.list[event.currentTarget.dataset.index].ORDERNUM;
		wx.navigateTo({
			url: '/pages/order/order?canISubmit=' + this.data.canISubmit + '&orderID=' + orderID,
		})
		// if (this.data.canISubmit == 3) {
		// 	wx.navigateTo({
		// 		url: '/pages/renewal/renewal?orderID=' + orderID
		// 	})
		// } else {
		// 	wx.navigateTo({
		// 		url: '/pages/order/order?canISubmit=' + this.data.canISubmit + '&orderID=' + orderID,
		// 	})
		// }
	},

	getOrderList: function (canISubmit) {
		app.request(
			'appHotel/getHotelOrderByMobile.do',
			'POST',
			true,
			() => {
				let orderState = '';
				if (canISubmit >= 1) {
					orderState = canISubmit.toString();
				} 
				let hotel = wx.getStorageSync('hotel');
				let keyMap = app.createSecretKey(hotel);
				let data = {
					FKEY: keyMap.key,
					TIMESTAMP: keyMap.timeStamp,
					MOBILE: wx.getStorageSync('phone'),
					HOTELID: hotel,
					ORDERSTATE: orderState
				}
				return data;
			},
			res => {
				let list = [];
				wx.hideLoading();
				if (res.data.code == 101) {
					list = res.data.data;
					for (let i = 0; i < list.length; i++) {
						let startDate = new Date(list[i].STARTTIME.replace(/-/g, '/'));
                        let endDate = new Date(list[i].ENDTIME.replace(/-/g, '/'));
                        let days = (endDate - startDate) / (24 * 60 * 60 * 1000);
                        const picture = 
                            (list[i].URLOBJ == null ? defaultPicture : app.globalData.baseImageUrl + list[i].URLOBJ.filePath);
						list[i].PICTURE = picture;
                        list[i].DAYS = parseInt(days);
                        if (list[i].ORDERNUM) {
                            list[i].ORDERNUM = list[i].ORDERNUM.substring(0, 13);
                        }
					}
				}
				if (!canISubmit) {
					canISubmit = 0;
				}
				this.setData({
					canISubmit: canISubmit,
					list: list
				})
			},
			res => {
				wx.hideLoading();
			}
		)
	},

	changeOrderType: function (event) {
		let orderType = event.currentTarget.dataset.type;
		this.getOrderList(orderType);
	},

	imageError: function (event) {
		if (event.type == 'error') {
			const index = event.currentTarget.dataset.index;
			this.data.list[index].PICTURE = defaultPicture;
			this.setData({
				list: this.data.list
			})
		}
	},

	showDialog: function (event) {
		const order = this.data.list[event.currentTarget.dataset.index];
        if (this.checkOutDialog && order) {
            this.checkOutDialog.showDialog(order)
        }
    },

	renewalRoom: function (event) {
		const order = this.data.list[event.currentTarget.dataset.index];
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