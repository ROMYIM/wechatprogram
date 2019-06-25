// pages/book/book.js
import { formatTime } from '../../utils/util.js'

const app = getApp();
const defaultPicture = '/resources/mineorder_defaultdiagram.png'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		defaultPicture: defaultPicture,
		startDate: formatTime(new Date()),
		enterDate: formatTime(new Date()),
		leaveDate: formatTime(new Date()),
		year: new Date().getFullYear() + 1,
		list: [],
		personCount: 1,
		days: 1,
		calendarOpen: false,
		dateTarget: 'enter',
		date: formatTime(new Date()).fullDate.replace(/-/g, '/')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var url = 'appHotel/getHotelType.do';
		var method = 'POST';
		app.request(
			url,
			method,
			true,
			() => {
				var hotelID = wx.getStorageSync("hotel");
				var keyMap = app.createSecretKey(hotelID)
				var data = {
				HOTELID: hotelID,
				FKEY: keyMap.key,
				TIMESTAMP: keyMap.timeStamp,
				}
				return data;
			},
			res => {
				wx.hideLoading();
				if (res.data.code == 101) {
					let typeList = res.data.data;
					for (let i = 0; i < typeList.length; i++) {
						if (typeList[i].URLS && typeList[i].URLS.length > 0) {
							typeList[i].PICTURE = app.globalData.baseImageUrl + typeList[i].URLS[0].filePath;
						} else {
							typeList[i].PICTURE = defaultPicture
						}
						if (typeList[i].INFO && typeList[i].INFO.length > 30) {
							typeList[i].INFO = typeList[i].INFO.subString(0, 30) + '...';
						}
					}
					this.setData({
						list: typeList
					})
				} else {
					wx.showToast({
						title: '订房请求失败',
						icon: 'none'
					});
				}
			},
			res => {
				wx.showToast({
					title: '系统维护中',
					icon: 'none',
					duration: 1500
				})
			}
		)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		let leaveDate = new Date();
		leaveDate.setDate(leaveDate.getDate() + 1);
		this.setData({
		leaveDate: formatTime(leaveDate)
		})
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

	enterDateChange: function (event) {
		console.log(event);
		var date = new Date(event.detail.value.replace(/-/g, '/'));
		this.setData({
			enterDate: formatTime(date),
			leaveDate: formatTime(date),
			startDate: formatTime(date)
		})
	},
  
	leaveDateChange: function (event) {
		var enterDate = new Date(this.data.enterDate.fullDate.replace(/-/g, '/'));
		var date = new Date(event.detail.value.replace(/-/g, '/') + " 23:59:59");
		var days =  (date - enterDate) / (24 * 60 * 60 * 1000); 
		days = parseInt(days);
		this.setData({
			leaveDate: formatTime(date),
			days: days
		})
	},

	personCountChange: function (event) {
		var control = Number.parseInt(event.currentTarget.dataset.control);
		var personCount = this.data.personCount + control;
		if (personCount <= 1) {
			personCount = 1;
		}
		this.setData({
			personCount: personCount
		})
	},

	selectRoom: function (event) {
		var roomType = this.data.list[event.currentTarget.dataset.index];
		wx.navigateTo({
			url: '/pages/room/room?familyType=' + roomType.TYPEID,
		})
		var order = {
			PEOPLENUM: this.data.personCount,
			OPENID: wx.getStorageSync('sid'),
			STARTTIME: this.data.enterDate.dateTime,
			ENDTIME: this.data.leaveDate.dateTime,
			ROOMPRICE: roomType.PRICE,
			DEPOSITPRICE: roomType.DEPOSITPRICE,
			DAYS: this.data.days,
			TYPENAME: roomType.TYPENAME
		};
		wx.setStorageSync('order', order);
	},

	showPicture: function (event) {
		const pictureList = this.data.list[event.currentTarget.dataset.index].URLS;
		let list = [];
		pictureList.forEach(picture => {
			list.push(picture.filePath);
		});
		let listJson = JSON.stringify(list);
		wx.navigateTo({
			url: '/pages/picture/picture?pictureList=' + listJson,
		})
	},

	openCalendar: function (event) {
		let date = new Date();
		let selectedDateString = null;
		if (event.currentTarget.dataset.target == "leave") {
			date = new Date(this.data.enterDate.fullDate.replace(/-/g, '/'));
			date.setDate(date.getDate() + 1);
			selectedDateString = this.data.leaveDate.fullDate;
		} else {
			selectedDateString = this.data.enterDate.fullDate;
		}
		this.setData({
			dateTarget: event.currentTarget.dataset.target,
			calendarOpen: true,
			date: formatTime(date).fullDate.replace(/-/g, '/')
		})
		const calendar = this.selectComponent('#calendar');
		calendar._openEvent(this.data.date, selectedDateString);
	},

	getDate: function(event) {
		let date = event.detail.date;
		date = date.year + "/" + date.month + "/" +  date.date;
		if (event.detail.target == 'enter') {
			let dateTemp = new Date(date)
			date = formatTime(dateTemp);
			dateTemp.setDate(dateTemp.getDate() + 1);
			let leaveDate = formatTime(dateTemp)
			console.log(date);
			this.setData({
				enterDate: date,
				leaveDate: leaveDate,
				startDate: leaveDate,
				dateTarget: 'enter',
				date: leaveDate.fullDate.replace(/-/g, '/'),
				calendarOpen: false,
				days: 1
			});
			console.log(this.data.date);
		} else {
			let enterDate = new Date(this.data.enterDate.fullDate.replace(/-/g, '/'));
			date = new Date(date + " 23:59:59");
			let days = (date - enterDate) / (24 * 60 * 60 * 1000);
			days = parseInt(days);
			this.setData({
				leaveDate: formatTime(date),
				days: days,
				calendarOpen: false
			})
		}
  	},

	imageError: function (event) {
		if (event.type == 'error') {
			const index = event.currentTarget.dataset.index;
			this.data.list[index].PICTURE = defaultPicture;
			this.setData({
				list: this.data.list
			})
		}
	}
})